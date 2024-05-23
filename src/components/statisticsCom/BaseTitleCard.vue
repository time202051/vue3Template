<!-- 
 * @fileName: BaseTitleCard.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-03-19 19:24:46
 * @description: 
 * @remark: 最基础的统计页面的卡片，头部（左标题，右slot）和body区域白底
!-->
<template>
  <div :class="ns.b()">
    <div :class="[ns.b('header')]">
      <div>{{ title }}</div>
      <div v-if="$slots.operate" :class="ns.em('header', 'content')">
        <slot name="operate"></slot>
      </div>
    </div>
    <div :class="[ns.b('body')]" v-loading="isLoading">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useNamespace } from "@/hook/useNamespace";
const ns = useNamespace("baseTitleCard");

const props = withDefaults(
  defineProps<{
    title?: string;
    isLoading?: boolean; //loading效果
  }>(),
  {
    title: "标题",
    isLoading: false
  }
);
</script>

<style lang="less" scoped>
@headerH: 48px;
.sc-baseTitleCard {
  .sc-baseTitleCard-header {
    height: @headerH;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 16px;
  }
  .sc-baseTitleCard-header::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 16px;
    background: #5782ef;
  }
  .sc-baseTitleCard-body {
    background: #ffffff;
    border-radius: 4px;
    height: calc(100% - @headerH);
    overflow: hidden;
  }
}
</style>
