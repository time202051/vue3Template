<!-- 
 * @fileName: ToolBarRight.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-04-30 16:19:16
 * @description: 
 * @remark: 
!-->
<template>
  <div class="tool-bar-ri">
    <div class="header-icon">
      <AssemblySize id="assemblySize" />
      <Fullscreen id="fullscreen" />
    </div>
    <span class="username">{{ username }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { useUserStore } from "@/stores/modules/user";
import AssemblySize from "./components/AssemblySize.vue";
import Fullscreen from "./components/Fullscreen.vue";

const userStore = useUserStore();
const username = computed(() => userStore.userInfo.name);
</script>

<style scoped lang="scss">
.tool-bar-ri {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 25px;
  .header-icon {
    display: flex;
    align-items: center;
    & > * {
      margin-left: 21px;
      color: var(--el-header-text-color);
    }
  }
  .username {
    margin: 0 20px;
    font-size: 15px;
    color: var(--el-header-text-color);
  }
}
</style>
