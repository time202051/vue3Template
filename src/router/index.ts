import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { initDynamicRouter } from "@/router/modules/dynamicRouter";
import { staticRouter, errorRouter } from "@/router/modules/staticRouter";
import NProgress from "@/config/nprogress";
import { LOGIN_URL, ROUTER_WHITE_LIST } from "@/config";
import { useUserStore } from "@/stores/modules/user";
import { useAuthStore } from "@/stores/modules/auth";

/**
 * @description 📚 路由参数配置简介
 * @param path ==> 路由菜单访问路径
 * @param name ==> 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选)
 * @param redirect ==> 路由重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 路由菜单元信息
 * @param meta.icon ==> 菜单和面包屑对应的图标
 * @param meta.title ==> 路由标题 (用作 document.title || 菜单的名称)
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 路由外链时填写的访问地址
 * @param meta.isHide ==> 是否在菜单中隐藏 (通常列表详情页需要隐藏)
 * @param meta.isFull ==> 菜单是否全屏 (示例：数据大屏页面)
 * @param meta.isAffix ==> 菜单是否固定在标签页中 (首页通常是固定项)
 * @param meta.isKeepAlive ==> 当前路由是否缓存
 * */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * @description  路由拦截
 */
router.beforeEach(async (to, from, next) => {
  console.log("33333", to, from);
  const userStore = useUserStore();
  const authStore = useAuthStore();

  // 1.NProgress开始
  NProgress.start();
  console.log(to);

  // 2.动态设置标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE;
  window.document.title = to.meta?.title ? `${to.meta?.title} - ${title}` : title;

  // 3.是否访问登陆页面（有无token）
  if (to.path.toLocaleLowerCase() == LOGIN_URL) {
    if (userStore.token) return next(from.fullPath); //有token不可以跳登陆页面，除非之前移出token
    // 重置路由相关内容
    resetRouter();
    return next();
  }

  // 4.是否属于白名单
  if (ROUTER_WHITE_LIST.includes(to.path)) return next();

  // 5.是否有token（只有登陆时候设置token）
  if (!userStore.token) return next({ path: LOGIN_URL, replace: true });

  // 6.如果没有菜单列表，重新请求菜单接口
  if (!authStore.authMenuListGet.length) {
    await initDynamicRouter();
    return next({ ...to, replace: true });
  }

  // 7.存储routerName做按钮权限筛选
  authStore.setRouteName(to.name as string);

  // 8.正常访问页面
  next();
});

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
  const authStore = useAuthStore();
  // 去除已注册在路由上的页面
  authStore.flatMenuListGet.forEach((route: any) => {
    const { name } = route;
    if (name && router.hasRoute(name)) router.removeRoute(name);
  });
};

router.onError((error) => {
  NProgress.done();
  console.warn("路由错误", error.message);
});

/**
 * 路由跳转结束
 */
router.afterEach(() => {
  NProgress.done();
});

export default router;
