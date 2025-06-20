<template>
  <div style="margin-left: 10px">
    <el-form ref="searchRef" class="searchBox" :model="search">
      <div style="display: flex; flex-wrap: wrap">
        <el-form-item label="日期">
          <el-date-picker v-model="search.date" type="date" placeholder="选择日期" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="search.type" placeholder="请选择" clearable>
            <el-option label="加班" :value="0" />
            <el-option label="放假" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label-width="10px">
          <el-button type="primary" size="large" @click="getRuleData">查询</el-button>
          <el-button type="" size="large" @click="openDialog">编辑</el-button>
          <el-button type="" size="large" @click="batchDelete">删除</el-button>
          <el-button type="" size="large" @click="autoRuleData">生成当月规则</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
  <div>
    <el-table ref="tableRef" :data="tableData" style="width: 100%;margin-top: 20px;" @selection-change="selectChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="atteDate" label="年-月-日">
        <template #default="scope">
          <span>{{ scope.row.atteYear }} - {{ scope.row.atteMonth.toString().padStart(2, '0') }}- {{ scope.row.atteDay.toString().padStart(2, '0') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="上班打卡时间">
        <template #default="scope">
          <span>{{ getTime(scope.row.startTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="下班打卡时间">
        <template #default="scope">
          <span>{{ getTime(scope.row.endTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型">
        <template #default="scope">
          <span>{{ scope.row.type == 0 ? '加班' : '放假' }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div style="margin-top: 20px;">
    <el-pagination @size-change="sizeChange" @current-change="pageChange" :current-page="page.curPage"
      :page-sizes="[10, 20, 50]" :page-size="page.pageSize" layout="total, prev, pager, next,  sizes, jumper"
      :total="page.total">
    </el-pagination>
  </div>
  <el-dialog title="编辑规则" v-model="dialogVisible" destroy-on-close :close-on-click-modal="false" style="height: 600px;overflow: auto;" @close="closeDialog">
    <div>
      <el-button type="" size="large" @click="addRuleData">添加</el-button>
      <el-button type="primary" size="large" @click="setRuleData">提交</el-button>
    </div>
    <el-table :data="addList" style="width: 100%;margin-top: 20px;">
      <el-table-column type="index" width="100"/>
      <el-table-column prop="date" label="年-月-日">
        <template #default="scope">
          <el-date-picker v-model="scope.row.date" type="date" placeholder="选择日期" clearable>
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="班种">
        <template #default="scope">
          <el-radio v-model="scope.row.time" label="08:30:00-18:00:00">全天</el-radio>
          <el-radio v-model="scope.row.time" label="08:30:00-12:00:00">上午班</el-radio>
          <el-radio v-model="scope.row.time" label="14:00:00-18:00:00">下午班</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型">
        <template #default="scope">
          <el-select v-model="scope.row.type" placeholder="请选择" clearable>
            <el-option label="加班" :value="0" />
            <el-option label="放假" :value="1" />
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { apiRuleQuery, apiRuleSet, apiRuleAuto, apiRuleDel } from '@/utils/api'
import { CommonResponseData, RuleData, RulePageData, RuleAddData, RuleQueryData } from '@/utils/type'

onMounted(() => {
  getRuleData();
})

let search = reactive({
  date: null,
  type: null
})
let dialogVisible = ref(false)
let formData = reactive({
  date: null,
  time: null,
  type: null
})
let addList = ref<RuleAddData[]>([])
let selectData = ref<RuleData[]>([])
let tableData = ref<RuleData[]>()
let page = reactive({
  curPage: 1,
  pageSize: 10,
  total: 0
})

const getTime = (str: string) => {
  return str.split(' ')[1];
}

const autoRuleData = async () => {
  let res: CommonResponseData = await apiRuleAuto();
  if (res.code !== 200) {
    ElMessage.error(res.message)
  }
  getRuleData();
}

const openDialog = () => {
  selectData.value.sort((a, b) => a.id - b.id);
  selectData.value.forEach(item => {
    let date = new Date(formatDate(item.atteYear, item.atteMonth, item.atteDay));
    let time = item.startTime.split(' ')[1] + '-' + item.endTime.split(' ')[1];
    addList.value.push({
      id: item.id,
      date: date,
      time: time,
      type: item.type
    });
  });
  dialogVisible.value = true;
}

const closeDialog = () => {
  addList.value.splice(0, addList.value.length);
  dialogVisible.value = false;
}

const batchDelete = async () => {
  let params: number[] = [];
  selectData.value.forEach(item => params.push(item.id));
  let res: CommonResponseData = await apiRuleDel(params);
  if (res.code !== 200) {
    ElMessage.error(res.message)
  }
  getRuleData();
}

const formatDate = (year: number, month: number, day:number) => {
  let monthStr = month.toString().padStart(2, '0');
  let dayStr = day.toString().padStart(2, '0');
  // 拼接成YYYY-MM-DD格式
  return `${year}-${monthStr}-${dayStr} 00:00:00`;
}

const selectChange = (selection: RuleData[]) => {
  selectData.value = selection;
}

const addRuleData = () => {
  addList.value.push({
    id: null,
    date: formData.date,
    time: formData.time,
    type: formData.type
  });
  formData = {
    date: null,
    time: null,
    type: null
  }
}

const setRuleData = async () => {
  let params: RuleData[] = [];
  for (let index = 0; index < addList.value.length; index++) {
    let item = addList.value[index];
    console.log(item);
    if (item.date == null || item.time == null || item.type == null) {
      let index = addList.value.indexOf(item) + 1;
      ElMessage.error('第' + index + '条数据异常');
      return;
    }
    let year = item.date.getFullYear();
    let month = item.date.getMonth() + 1;
    let day = item.date.getDate();
    let date = year + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0')
    let rule = {
      id : item.id,
      atteYear: year,
      atteMonth: month,
      atteDay: day,
      startTime: date + ' ' + item.time.split('-')[0],
      endTime: date + ' ' + item.time.split('-')[1],
      type: item.type
    }
    params.push(rule);
  }
  console.log(params);
  let res: CommonResponseData = await apiRuleSet(params);
  if (res.code !== 200) {
    ElMessage.error(res.message)
  }
  getRuleData();
  closeDialog();
}

const getRuleData = async () => {
  let params = {
    param: {
      atteYear: search.date !== null ? search.date.getFullYear() : null,
      atteMonth: search.date !== null ? search.date.getMonth() + 1 : null,
      atteDay: search.date !== null ? search.date.getDate() : null,
      type: search.type,
    },
    page: { ...page },
  }
  let res: RulePageData = await apiRuleQuery(params)
  if (res.code === 200) {
    console.log(res.data);
    tableData.value = res.data.list;
    page.total = res.data.page.total;
  }
}

const sizeChange = (val: number) => {
  page.pageSize = val;
  getRuleData();
}

const pageChange = (val: number) => {
  page.curPage = val;
  getRuleData();
}

</script>
<style lang="less" scoped>
.searchBox {
  .el-form-item {
    margin-right: 10px;

    .el-select {
      width: 192px;
    }
  }
}
</style>
