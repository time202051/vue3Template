<!-- 
 * @fileName: index.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-04-26 10:47:20
 * @description: 
 * @remark: 
!-->
<template>
  <el-container class="layout">
    <el-aside width="200px">
      <div class="aside-box">
        <div class="logo">
          <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
          <span v-show="!isCollapse" class="logo-text">{{ title }}</span>
        </div>
        <el-scrollbar>
          <el-menu
            :router="false"
            :default-active="activeMenu"
            :unique-opened="accordion"
            :collapse-transition="false"
          >
            <SubMenu :menu-list="menuList" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>

    <el-container class="classic-content">
      <el-header>
        <ToolBarLeft />
        <ToolBarRight />
      </el-header>
      <el-container class="classic-main">
        <Main></Main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, unref } from "vue";
import Main from "@/layouts/components/Main/index.vue";
import { useGlobalStore } from "@/stores/modules/global";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";
import { useAuthStore } from "@/stores/modules/auth";
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";

const title = import.meta.env.VITE_GLOB_APP_TITLE;

const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

const { isCollapse, accordion } = storeToRefs(globalStore);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path));
const menuList = computed(() => authStore.showMenuListGet);
const asideWidth = computed(() => (unref(isCollapse) ? "65px" : "210px"));
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  :deep(.el-aside) {
    width: v-bind(asideWidth);
    background-color: var(--el-menu-bg-color);
    border-right: 1px solid var(--el-aside-border-color);
    .aside-box {
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: width 0.3s ease;
      background-color: var(--el-bg-color-page);
      .el-scrollbar {
        height: calc(100% - 55px);
        .el-menu {
          width: 100%;
          overflow-x: hidden;
          border-right: none;
        }
      }
      .logo {
        box-sizing: border-box;
        height: 55px;
        display: flex;
        align-items: center;
        justify-content: center;
        .logo-img {
          width: 28px;
          margin-right: 6px;
          object-fit: contain;
        }
        .logo-text {
          font-size: 21.5px;
          font-weight: bold;
          color: var(--el-aside-logo-text-color);
          white-space: nowrap;
        }
      }
    }
  }
  .el-header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: 0 15px;
    background-color: var(--el-bg-color-page);
    border-bottom: 1px solid var(--el-header-border-color);
  }
}
</style>
