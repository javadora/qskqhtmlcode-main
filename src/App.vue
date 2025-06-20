<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import HomeView from './view/HomeView.vue'
import { ref } from 'vue';

const locale = ref(zhCn);
</script>

<template>
  <el-config-provider :locale="locale">
    <HomeView />
  </el-config-provider>
</template>

<style scoped>
</style>
