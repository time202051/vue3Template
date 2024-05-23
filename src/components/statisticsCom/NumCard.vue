<!-- 
 * @fileName: NumCard.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-03-19 14:56:59
 * @description: 
 * @remark: 矩形svg带底色，文本   右侧数值
!-->
<!-- <NumCard
 svg="numCard_video"
 label="摄像机"
 :count="100"
 :iconSize="48"
 :svgSize="22"
 color: "#006fff",
> -->
<template>
  <div :class="[ns.b(), ns.bm('type', type + '')]">
    <div :class="ns.b('svg')">
      <svg-icon :iconClass="svg" :color="svgColor"></svg-icon>
    </div>
    <div :class="ns.b('content')">
      <div :class="ns.e('label')">{{ label }}</div>
      <div :class="ns.e('number')">{{ count }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useNamespace } from "@/hook/useNamespace";
import { changeToRgb } from "@/utils/transition";

const ns = useNamespace("numCard");

const props = withDefaults(
  defineProps<{
    svg: string;
    iconSize?: string | number;
    svgSize?: string | number;
    color?: string;
    label: string;
    count: number | string;
    type?: 1 | 2 | 3 | 4 | 5;
    svgColor?: string;
  }>(),
  {
    svg: "",
    label: "",
    count: "",
    iconSize: 48,
    svgSize: 23,
    color: "#006fff",
    svgColor: "#ffffff",
    type: 1
  }
);

const iconSizeV = computed(() =>
  typeof props.iconSize == "string" ? props.iconSize : `${props.iconSize}px`
);

const svgSizeV = computed(() =>
  typeof props.svgSize == "string" ? props.svgSize : `${props.svgSize}px`
);
const colorV = computed(() => props.color);
const colorShadow = computed(() => changeToRgb(props.color, 0.3));
</script>

<style lang="less" scoped>
.sc-numCard {
  background: #ffffff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 36px 24px;
  box-sizing: border-box;
  .sc-numCard-svg {
    width: v-bind(iconSizeV) !important;
    height: v-bind(iconSizeV) !important;
    background-color: v-bind(colorV);
    border-radius: 8px;
    box-shadow: 0px 8px 16px 0px v-bind(colorShadow);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    .svg-icon {
      margin: 0;
      font-size: v-bind(svgSizeV);
    }
  }
  .sc-numCard-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    .sc-numCard__label {
      height: 14px;
      line-height: 14px;
      font-weight: 400;
      font-size: 14px;
      color: #333333;
    }
    .sc-numCard__number {
      height: 23px;
      line-height: 23px;
      font-weight: 500;
      font-size: 30px;
      color: #333333;
    }
  }
}

// 文本数字一列，数字在上，文字在下
.sc-numCard-type--2 {
  .sc-numCard-content {
    flex-direction: column;
    flex-flow: column-reverse;
    align-items: flex-start;
    height: v-bind(iconSizeV);
  }
}
// 文本数字一列，数字在下的，文字在上

.sc-numCard-type--3 {
  .sc-numCard-content {
    flex-direction: column;
    align-items: flex-start;
    height: v-bind(iconSizeV);
  }
}

// svg 文本 数字 垂直排列的
.sc-numCard-type--4 {
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  .sc-numCard-svg {
    margin-bottom: 15px;
    box-sizing: border-box;
  }
  .sc-numCard-content {
    flex-direction: column;
    align-items: flex-start;
    height: v-bind(iconSizeV);
    .sc-numCard__label {
      margin-bottom: 11px;
      box-sizing: border-box;
    }
  }
}

// 数字在上，文字在下 ,但图标在右侧
.sc-numCard-type--5 {
  flex-direction: row-reverse;
  .sc-numCard-svg {
    margin-right: 0;
  }
  .sc-numCard-content {
    flex-direction: column;
    align-items: flex-start;
    height: v-bind(iconSizeV);
  }
}
</style>
