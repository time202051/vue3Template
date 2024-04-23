<!-- 
 * @fileName: index.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-04-23 17:21:36
 * @description: 
 * @remark: 
!-->
<template>
  <div>权限button</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
onMounted(() => {
  console.log("权限router", router, router.options, router.getRoutes());
});
</script>

<style lang="less" scoped></style>
