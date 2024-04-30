<!-- 
 * @fileName: index.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-04-23 17:21:59
 * @description: 
 * @remark: 
!-->
<template>
  <div>
    <div>权限menu</div>
    <el-select v-model="value" placeholder="Select" style="width: 240px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

const value = ref("");

const options = [
  {
    value: "Option1",
    label: "Option1"
  },
  {
    value: "Option2",
    label: "Option2"
  },
  {
    value: "Option3",
    label: "Option3"
  },
  {
    value: "Option4",
    label: "Option4"
  },
  {
    value: "Option5",
    label: "Option5"
  }
];
</script>

<style lang="less" scoped></style>
