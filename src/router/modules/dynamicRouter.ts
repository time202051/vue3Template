import { useAuthStore } from "@/stores/modules/auth";

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob("@/views/**/*.vue");

export const initDynamicRouter = async () => {
  const authStore = useAuthStore();
  await authStore.getAuthMenuList();

  //   try {
  //     await authStore.getAuthMenuList();
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
};
