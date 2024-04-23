import { instance } from "@/api";

// 获取菜单列表
export const getAuthMenuListApi = (params?: any) => {
  // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 authMenuList.json 数据
  instance.get("/menu/list", { params });
};
