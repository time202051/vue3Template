import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "@/stores";
import errorHandler from "@/utils/errorHandler";
// element css
import "element-plus/dist/index.css";
// element dark css
import "element-plus/theme-chalk/dark/css-vars.css";

const app = createApp(App);
app.config.errorHandler = errorHandler; //报错提示

app.use(router).use(pinia).mount("#app");
