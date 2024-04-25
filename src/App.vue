<template>
  <RouterView ref="routerRef" />
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
// import { useTheme } from "@/hook/useTheme";
import { ref } from "vue";

const routerRef: any = ref();
// useTheme(routerRef, "customTheme");
</script>

<style scoped></style>
