<!-- 
 * @fileName: index.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-04-23 17:05:51
 * @description: 
 * @remark: 
!-->
<template>
  <component :is="layoutComponents[layout]"></component>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { Component } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import LayoutClassic from "@/layouts/LayoutClassic/index.vue";
import LayoutVertical from "@/layouts/LayoutVertical/index.vue";

import { storeToRefs } from "pinia";
import type { LayoutType } from "@/stores/interface";

const layoutComponents: Record<LayoutType, Component> = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
  transverse: LayoutClassic,
  columns: LayoutClassic
};
const globalStore = useGlobalStore();
const { layout } = storeToRefs(globalStore);
</script>

<style lang="less" scoped></style>
