// 全局指令
import styles from "./styles";

const vueDirective = (Vue: any) => {
  console.log("VueVue", Vue);

  // 样式指令
  Object.keys(styles).forEach((key: any) => {
    if (key) Vue.directive(key, styles[key]);
  });
};
export default vueDirective;
