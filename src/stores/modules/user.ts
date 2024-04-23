import { defineStore } from "pinia";
import type { UserState } from "@/stores/interface";

export const useUserStore = defineStore({
  id: "geeker-user",
  state: () => ({
    token: "",
    userInfo: { name: "" }
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    }
  },
  getters: {},
  persist: {
    key: "geeker-user"
  }
});
