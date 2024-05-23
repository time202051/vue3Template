import * as ElIconModules from "@element-plus/icons-vue";

export const setupElementPlugin = (app: any) => {
  //统一注册el-icon图标  直接使用官网的icon别名即可
  // for (const iconName in ElIconModules) {
  //   if (Reflect.has(ElIconModules, iconName)) {
  //     const item = ElIconModules[iconName];
  //     app.component(iconName, item);
  //   }
  // }
};
