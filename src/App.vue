<template>
  <el-config-provider :size="assemblySize">
    <RouterView />
  </el-config-provider>
</template>
<script setup lang="ts">
import { onMounted, watch, computed } from "vue";
import { RouterView } from "vue-router";
import { useTheme } from "@/hook/useTheme";
import { useColorMode } from "@vueuse/core";
import { useGlobalStore } from "@/stores/modules/global";

const globalStore = useGlobalStore();

const mode = useColorMode();
const assemblySize = computed(() => globalStore.assemblySize);

watch(
  () => globalStore.isDark,
  (n: boolean) => {
    mode.value = n ? "dark" : "light";
  }
);
</script>

<style scoped></style>
