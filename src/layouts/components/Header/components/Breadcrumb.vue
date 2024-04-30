<!-- 
 * @fileName: Breadcrumb.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-04-26 11:39:07
 * @description: 面包屑
 * @remark: 
!-->
<template>
  <div :class="['breadcrumb-box mask-image', !globalStore.breadcrumbIcon && 'no-icon']">
    <el-breadcrumb :separator-icon="ArrowRight">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
          <div
            class="el-breadcrumb__inner is-link"
            :class="{ 'item-no-icon': !item.meta.icon }"
            @click="onBreadcrumbClick(item, index)"
          >
            <el-icon v-if="item.meta.icon && globalStore.breadcrumbIcon" class="breadcrumb-icon">
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span class="breadcrumb-title">
              {{ item.meta.title }}
            </span>
          </div>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { computed, unref } from "vue";
import { useAuthStore } from "@/stores/modules/auth";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";
import { useGlobalStore } from "@/stores/modules/global";

const authStore = useAuthStore();
const globalStore = useGlobalStore();
const { showMenuListGet } = storeToRefs(authStore);
const route = useRoute();
const router = useRouter();

// 面包屑数据
const breadcrumbList = computed(() => {
  const getAllBreadcrumbList = (
    menuList: Menu.MenuOptions[],
    parent = [],
    result: { [key: string]: any }
  ) => {
    menuList.forEach((item: Menu.MenuOptions) => {
      result[item.path] = [...parent, item];
      if (item.children) getAllBreadcrumbList(item.children, result[item.path], result);
    });
    return result;
  };
  const result = getAllBreadcrumbList(unref(showMenuListGet), [], {});
  return result[route.path];
});

const onBreadcrumbClick = (item: Menu.MenuOptions, index: number) => {
  if (index !== breadcrumbList.value.length - 1) router.push(item.path);
};
</script>

<style lang="scss" scoped>
.breadcrumb-box {
  display: flex;
  align-items: center;
  overflow: hidden;
  .el-breadcrumb {
    white-space: nowrap;
    .el-breadcrumb__item {
      .el-breadcrumb__inner {
        display: flex;
        align-items: center;
        &.is-link {
          color: var(--el-header-text-color);
          &:hover {
            color: var(--el-color-primary);
          }
        }
        .breadcrumb-icon {
          margin-right: 6px;
          font-size: 16px;
        }
      }
      &:last-child .el-breadcrumb__inner,
      &:last-child .el-breadcrumb__inner:hover {
        color: var(--el-header-text-color-regular);
      }
    }
  }
}
.no-icon {
}
</style>
