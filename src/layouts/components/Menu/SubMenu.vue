<!-- 
 * @fileName: SubMenu.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-04-25 10:28:53
 * @description: 
 * @remark: 
!-->
<template>
  <template v-for="(subItem, index) in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>{{ subItem.meta.title }}</template>
      <SubMenu :menu-list="subItem.children"></SubMenu>
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <template #title>
        <el-icon v-if="subItem.meta.icon">
          <component :is="subItem.meta.icon"></component>
        </el-icon>
        <span>{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

defineProps<{ menuList: Menu.MenuOptions | any }>();

const router = useRouter();

const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
  router.push(subItem.path);
};
</script>

<style lang="scss" scoped></style>
