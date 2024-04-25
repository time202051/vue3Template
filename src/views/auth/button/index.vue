<!-- 
 * @fileName: index.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-04-23 17:21:36
 * @description: 
 * @remark: 
!-->
<template>
  <div>
    <div>权限button</div>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCssVar } from "@vueuse/core";

const router = useRouter();
// const color = useCssVar("--color", someEl, { initialValue: "#eee" });
</script>

<style lang="less" scoped></style>
