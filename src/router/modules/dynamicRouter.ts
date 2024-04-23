import router from "@/router/index";
import { LOGIN_URL } from "@/config";
import { useAuthStore } from "@/stores/modules/auth";
import { ElNotification } from "element-plus";
import { useUserStore } from "@/stores/modules/user";

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob("@/views/**/*.vue");

export const initDynamicRouter = async () => {
  const userStore = useUserStore();
  const authStore = useAuthStore();
  try {
    // 1.菜单列表 && 按钮权限列表
    await authStore.getAuthMenuList();

    // 2、用户是否有菜单权限
    if (!authStore.authMenuListGet.length) {
      ElNotification({
        title: "无权限访问",
        message: "当前账号无任何菜单权限，请联系系统管理员！",
        type: "warning",
        duration: 3000
      });
      userStore.setToken("");
      router.replace(LOGIN_URL);
    }

    // 3.添加动态路由
    console.log("modules", modules, authStore.flatMenuListGet);

    authStore.flatMenuListGet.forEach((item: any) => {
      if (item.component && typeof item.component == "string") {
        item.component = modules["/src/views" + item.component + ".vue"];
      }
      if (item.meta.isFull) {
        router.addRoute(item);
      } else {
        router.addRoute("layout", item);
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
