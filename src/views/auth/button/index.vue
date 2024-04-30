<!-- 
 * @fileName: index.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-04-23 17:21:36
 * @description: 
 * @remark: 
!-->
<template>
  <div class="auth_container">
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
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style lang="scss" scoped>
.auth_container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 10px;
  border-radius: 6px;
}
</style>
