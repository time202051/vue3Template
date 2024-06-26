<!-- 
 * @fileName: index.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-04-25 10:39:22
 * @description: 经典布局
 * @remark: 
!-->
<template>
  <el-container class="layout">
    <el-header>
      <div class="header-lf">
        <div class="logo">
          <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
          <span class="logo-text">{{ title }}</span>
        </div>
        <ToolBarLeft />
      </div>
      <div class="header-ri">
        <!-- <ToolBarRight /> -->
      </div>
    </el-header>
    <el-container class="classic-content">
      <el-aside width="200px">
        <div class="aside-box">
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

const title = import.meta.env.VITE_GLOB_APP_TITLE;

const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

// 手风琴:accordion
const { isCollapse, accordion } = storeToRefs(globalStore);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path));
const menuList = computed(() => authStore.showMenuListGet);
const asideWidth = computed(() => (unref(isCollapse) ? "65px" : "210px"));
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  :deep(.el-header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: 0 15px 0 0;
    box-sizing: border-box;
    background-color: var(--el-header-bg-color);
    border-bottom: 1px solid var(--el-header-border-color);
    .header-lf {
      display: flex;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
      .logo {
        flex-shrink: 0;
        width: 210px;
        margin-right: 16px;
        display: flex;
        align-items: center;
        .logo-img {
          width: 28px;
          margin-right: 6px;
          object-fit: contain;
        }
        .logo-text {
          font-size: 21.5px;
          font-weight: bold;
          color: var(--el-header-logo-text-color);
          white-space: nowrap;
        }
      }
    }
  }

  .classic-content {
    display: flex;
    height: calc(100% - 55px);
    :deep(.el-aside) {
      width: auto;
      // width: v-bind(asideWidth);
      background-color: var(--el-menu-bg-color);
      border-right: 1px solid var(--el-aside-border-color);
      .aside-box {
        display: flex;
        flex-direction: column;
        height: 100%;
        transition: width 0.3s ease;
        .el-menu {
          width: 100%;
          overflow-x: hidden;
          border-right: none;
        }
      }
    }
  }
}
</style>
