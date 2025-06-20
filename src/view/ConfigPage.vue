<template>
  <el-row :gutter="20">
    <el-col :span="10">
      <el-header>
        <p>考勤配置</p>
      </el-header>
      <el-main>
        <el-table :data="configData" style="width: 80%;" :show-header="false">
          <el-table-column prop="configDesc" w>
            <template #default="scope">
              <span>{{ scope.row.configDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="configValue">
            <template #default="scope">
              <el-input v-model="scope.row.configValue" placeholder="请输入" @change="setConfigData(scope.row)"/>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-col>
    <el-col :span="10">
      <el-header>
        <p>用户配置</p>
      </el-header>
      <el-main>
        <el-table :data="userData" style="width: 80%;" border>
          <el-table-column prop="userId" label="用户ID">
            <template #default="scope">
              <span>{{ scope.row.userId }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="用户名称">
            <template #default="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiConfigQuery, apiConfigSet, apiUserQuery, apiUserSet } from '@/utils/api'
import { CommonResponseData, ConfigData, ConfigResData, UserData, UserResData } from '@/utils/type'

onMounted(() => {
  getConfigData();
  getUserData();
})

const configData = ref<ConfigData[]>([])
const userData = ref<UserData[]>([])

const getConfigData = async () => {
  let res: ConfigResData = await apiConfigQuery()
  if (res.code === 200) {
    console.log(res.data);
    configData.value = res.data;
  }
}

const setConfigData = async (data: ConfigData) => {
  console.log(data);
  let res: CommonResponseData = await apiConfigSet(data);
  if (res.code !== 200) {
    ElMessage.error(res.message);
  }
  getConfigData();
}

const getUserData = async () => {
  let res: UserResData = await apiUserQuery()
  if (res.code === 200) {
    console.log(res.data);
    userData.value = res.data;
  }
}

const setUserData = async (users: UserData[]) => {
  console.log(users);
  // let res: CommonResponseData = await apiUserSet(users);
  // if (res.code !== 200) {
  //   ElMessage.error(res.message);
  // }
}

</script>
<style lang="less" scoped>
.isAbnormal {
  color: red;
}
</style>
