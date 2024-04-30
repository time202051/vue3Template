<!-- 
 * @fileName: AssemblySize.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-04-30 16:20:18
 * @description: 
 * @remark: 
!-->
<template>
  <el-dropdown trigger="click" @command="setAssemblySize">
    <el-icon :size="24"><Grid /></el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in assemblySizeList"
          :key="item.value"
          :command="item.value"
          :disabled="assemblySize === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import { AssemblySizeType } from "@/stores/interface";
import { Grid } from "@element-plus/icons-vue";

const globalStore = useGlobalStore();
const assemblySize = computed(() => globalStore.assemblySize);

const assemblySizeList = [
  { label: "默认", value: "default" },
  { label: "大型", value: "large" },
  { label: "小型", value: "small" }
];

const setAssemblySize = (item: AssemblySizeType) => {
  if (assemblySize.value === item) return;
  globalStore.setGlobalState("assemblySize", item);
};
</script>
