<!-- 
 * @fileName: index.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-04-25 11:09:59
 * @description: 
 * @remark: 
!-->
<template>
  <el-main class="main-box">
    <router-view #default="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive>
          <component
            :is="createComponentWrapper(Component, route)"
            :key="route.fullPath"
          ></component>
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<script lang="ts" setup>
import { h, ref } from "vue";
// const { keepAliveName } = storeToRefs(keepAliveStore);
const keepAliveName: any[] = [];

const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);

// 暂且不需要缓存
function createComponentWrapper(component: any, route: any) {
  return h(component);
}
</script>

<style lang="scss" scoped>
.main-box {
  background-color: rgb(122, 122, 122);
}
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}
.fade-transform-enter-from {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(30px);
}
</style>
