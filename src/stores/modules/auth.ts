import { defineStore } from "pinia";
// import { AuthState } from "@/stores/interface";
import { getAuthMenuListApi } from "@/api/modules/login";

export const useAuthStore = defineStore({
  id: "geeker-auth",
  state: () => ({
    // 按钮权限
    authButtonList: {},
    // 菜单权限
    authMenuList: [],
    // 当前页面的router name，用来做按钮权限筛选
    routeName: ""
  }),
  actions: {
    // Get AuthButtonList
    // async getAuthButtonList() {
    //   const { data } = await getAuthButtonListApi();
    //   this.authButtonList = data;
    // },
    // Get AuthMenuList
    async getAuthMenuList() {
      const res: any = await getAuthMenuListApi();
      console.log("接口数据", res);
      this.authMenuList = res.data;
    },
    // Set RouteName
    async setRouteName(name: string) {
      this.routeName = name;
    }
  },
  getters: {
    // 按钮权限列表
    authButtonListGet: (state) => state.authButtonList,
    // 菜单权限列表 ==> 这里的菜单没有经过任何处理
    authMenuListGet: (state) => state.authMenuList
    // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
    // showMenuListGet: (state) => getShowMenuList(state.authMenuList),
    // // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
    // flatMenuListGet: (state) => getFlatMenuList(state.authMenuList),
    // // 递归处理后的所有面包屑导航列表
    // breadcrumbListGet: (state) => getAllBreadcrumbList(state.authMenuList)
  }
});