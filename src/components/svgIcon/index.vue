<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  className?: string;
  iconClass: string;
}>();
const iconName = computed(() => {
  return `#icon-${props.iconClass}`;
});

const svgClass = computed(() => {
  if (props?.className) {
    return "svg-icon " + props?.className;
  } else {
    return "svg-icon";
  }
});
</script>

<style scoped>
.svg-icon {
  width: 1.1em;
  height: 1.1em;
  margin: 0 0.35em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
