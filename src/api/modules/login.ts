import { instance } from "@/api";
// import { Login } from "@/api/interface/index";

// 用户登录
export const loginApi = (params: any) => {
  return instance.post("/login", params);
};

// 获取菜单列表
export const getAuthMenuListApi = (params?: any) => {
  // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 authMenuList.json 数据
  return instance.get("/menu/list", { params });
};
