<!-- 
 * @fileName: index.vue 
 * @fileNameCHS: 
 * @author: 李嘉鹏
 * @date: 2024-04-23 11:42:10
 * @description: 
 * @remark: 
!-->
<template>
  <div>登陆页面</div>
  <el-form
    ref="loginFormRef"
    style="max-width: 600px"
    :model="loginForm"
    :rules="loginRules"
    label-width="auto"
  >
    <el-form-item label="账号" prop="username">
      <el-input v-model="loginForm.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="loginForm.password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)">
        重置
      </el-button>
      <el-button
        :icon="UserFilled"
        round
        size="large"
        type="primary"
        :loading="loading"
        @click="login(loginFormRef)"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Login } from "@/api/interface";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import { loginApi } from "@/api/modules/login";
import { md5 } from "md5js";
import { useUserStore } from "@/stores/modules/user";
import { initDynamicRouter } from "@/router/modules/dynamicRouter";
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config";
import { ElNotification } from "element-plus";

const router = useRouter();
const userStore = useUserStore();

const loginFormRef = ref<FormInstance>();
const loading = ref(false);
const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const loginForm = reactive<Login.ReqLoginForm>({
  username: "",
  password: ""
});

// resetForm
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    try {
      // 1.执行登陆
      const data: any = await loginApi({ ...loginForm, password: md5(loginForm.password, 32) });
      const { access_token } = data;
      if (access_token) userStore.setToken(access_token);

      // 2.添加动态路由
      await initDynamicRouter();

      // 3.清空 Tabs ,keepAlive数据

      // 4.跳转到首页
      router.push(HOME_URL);
      ElNotification({
        title: "你好",
        message: "欢迎登录 Geeker-Admin",
        type: "success",
        duration: 3000
      });
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style lang="less" scoped></style>
