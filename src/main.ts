import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "@/stores";
import errorHandler from "@/utils/errorHandler";
import * as Icons from "@element-plus/icons-vue";
import { setupPlugins } from "@/plugins";
import vueDirective from "@/directive";

// element css
import "element-plus/dist/index.css";

// element dark css
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/assets/style/customElementStyle.css";
import "@/assets/style/index.scss";

const app = createApp(App);
setupPlugins(app);
vueDirective(app);
app.config.errorHandler = errorHandler; //报错提示

Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(router).use(pinia).mount("#app");
