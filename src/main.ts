import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "@/stores";
import errorHandler from "@/utils/errorHandler";
import * as Icons from "@element-plus/icons-vue";

// element css
import "element-plus/dist/index.css";
// element dark css
import "element-plus/theme-chalk/dark/css-vars.css";

const app = createApp(App);
app.config.errorHandler = errorHandler; //报错提示

Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(router).use(pinia).mount("#app");
