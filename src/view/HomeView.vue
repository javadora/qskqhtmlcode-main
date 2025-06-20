<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">考勤中心</el-menu-item>
        <el-menu-item index="3">规则中心</el-menu-item>
        <el-menu-item index="4">配置中心</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <AttePage v-if="activeIndex == '1'"/>
      <RulePage v-if="activeIndex == '3'"/>
      <ConfigPage v-if="activeIndex == '4'"/>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import AttePage from './AttePage.vue'
import RulePage from './RulePage.vue'
import ConfigPage from './ConfigPage.vue'

const activeIndex = ref<string>("1")
const handleSelect = (val: string) => {
  // console.log(val);
  activeIndex.value = val;
}
</script>
<style lang="less" scoped>

</style>
