<template>
  <div>
    <el-calendar class="custom-calendar" v-model="activeDate" @input="handleSelect">
      <template #date-cell="{data}">
        <div>
          <span>
            {{ data.date.getDate() }}
          </span>
        </div>
        <div>
          <span style="color: red;">
            {{ getAbnormal(data.date) }}
          </span>
        </div>
      </template>
    </el-calendar>
    <el-dialog :title="title" v-model="dialogVisible" destroy-on-close :close-on-click-modal="false" style="height: 600px;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="userName" label="姓名"/>
        <el-table-column prop="result" label="结果">
          <template #default="scope">
            <span :class="scope.row.result !== '正常' && scope.row.result !== '' ? 'isAbnormal' : '' ">{{ scope.row.result }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="上班打卡时间"/>
        <el-table-column prop="endTime" label="下班打卡时间"/>
      </el-table>
    </el-dialog>
  </div>
  <div style="text-align: right;margin-right: 50px">
    <el-button type="" size="large">计算</el-button>
    <el-button type="primary" size="large">导出</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiAtteStatistic } from '@/utils/api'
import { AtteData, AtteOfMonthResData } from '@/utils/type'


onMounted(() => {
  let now = new Date();
  getAtteData(now.getFullYear(), now.getMonth() + 1);
})

const activeDate = ref<Date>()
const handleSelect = (val: Date) => {
  let now = new Date();
  if (now.getMonth() === val.getMonth()) {
    // console.log(val.getDate());
    title.value = val.getFullYear() + '-'+ (val.getMonth() + 1) + '-' + val.getDate().toString() + ' 考勤记录';
    tableData.value = atteMap.value.get(val.getDate().toString());
    dialogVisible.value = true;
  }
}

let title = ref('')
let dialogVisible = ref(false)
let tableData = ref<AtteData[]>()
const atteMap = ref<Map<string, AtteData[]>>(new Map)
const getAtteData = async (year: number, month: number) => {
  let params = {
    year: year,
    month: month,
    dateMap: null
  }
  let res: AtteOfMonthResData = await apiAtteStatistic(params)
  if (res.code === 200) {
    // console.log(res.data);
    atteMap.value = new Map(Object.entries(res.data));
  }
}

const getAbnormal = (date: Date) => {
  let now = new Date();
  if (now.getMonth() === date.getMonth()) {
    let list = atteMap.value.get(date.getDate().toString());
    let filter = list?.filter(item => item.result !== '正常' && item.result !== '').map(item => item.userName);
    let display = filter?.join(' ');
    return display;
  } else {
    return '';
  }
}

</script>
<style lang="less" scoped>
.isAbnormal {
  color: red;
}
</style>
