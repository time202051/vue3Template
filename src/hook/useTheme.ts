import { onMounted } from "vue";
import type { Ref } from "vue";
import { useCssVar } from "@vueuse/core";
import { useGlobalStore } from "@/stores/modules/global";
import type { Theme } from "@/hook/interface";

const themes: Record<
  Theme.ThemeType,
  {
    [key: string]: string;
  }
> = {
  light: {
    "--el-menu-bg-color": "#ffffff",
    "--el-menu-hover-bg-color": "#cccccc",
    "--el-menu-active-bg-color": "var(--el-color-primary-light-9)",
    "--el-menu-text-color": "#333333",
    "--el-menu-active-color": "var(--el-color-primary)",
    "--el-menu-hover-text-color": "#333333",
    "--el-menu-horizontal-sub-item-height": "50px"
  },
  inverted: {
    "--el-menu-bg-color": "#191a20",
    "--el-menu-hover-bg-color": "#000000",
    "--el-menu-active-bg-color": "#000000",
    "--el-menu-text-color": "#bdbdc0",
    "--el-menu-active-color": "#ffffff",
    "--el-menu-hover-text-color": "#ffffff",
    "--el-menu-horizontal-sub-item-height": "50px"
  },
  dark: {
    "--el-menu-bg-color": "#141414",
    "--el-menu-hover-bg-color": "#000000",
    "--el-menu-active-bg-color": "#000000",
    "--el-menu-text-color": "#bdbdc0",
    "--el-menu-active-color": "#ffffff",
    "--el-menu-hover-text-color": "#ffffff",
    "--el-menu-horizontal-sub-item-height": "50px"
  }
};

export const useTheme = (
  el: HTMLElement | Ref<HTMLElement> | null | undefined,
  type: Theme.ThemeType
) => {
  const colors: Record<string, Ref<any>> = {};
  const globalStore = useGlobalStore();

  const themesChange = () => {
    Object.keys(themes[type]).forEach((key: string) => {
      colors[key].value = themes[type][key];
    });
  };

  onMounted(() => {
    Object.keys(themes.light).forEach((key: string) => {
      colors[key] = useCssVar(key, el);
    });
    console.log("99999999colors", colors);
  });
};
