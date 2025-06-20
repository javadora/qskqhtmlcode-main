export interface ResponseData {
  code: number
  message: string
  success: boolean
  timestamp: string
}

export interface CommonResponseData extends ResponseData {
  data: null
}

export interface PageData {
  pageSize: number
  curPage: number
  total: number
}

export interface AtteData {
  id: number
  userId: number
  userName: string
  atteYear: number
  atteMonth: number
  atteDay: number
  startTime: Date
  endTime: Date
  result: string
  now: Date
}

export interface RuleData {
  id: number | null
  atteYear: number
  atteMonth: number
  atteDay: number
  startTime: string
  endTime: string
  type: number
}

export interface ConfigData {
  id: number 
  configCode: string
  configValue: string
  configDesc: string
  updateTime: Date
}

export interface UserData {
  userId: number 
  userName: string
}

export interface AtteOfMonthData {
  year: number  //年
  month: number  //月
}

export interface AtteOfMonthResData extends ResponseData {
  data: Map<number, AtteData[]>
}

export interface RuleSearchForm {
  atteYear: number | null
  atteMonth: number | null
  atteDay: number | null
  type: number | null
}

export interface RuleAddData {
  id: number | null
  date: Date | null
  time:string | null
  type: number | null
}

export interface RuleQueryData {
  param: RuleSearchForm
  page: PageData
}

export interface RulePageData extends ResponseData {
  data: {
    page: PageData
    list: RuleData[]
  }
}

export interface ConfigResData extends ResponseData {
  data: ConfigData[]
}

export interface UserResData extends ResponseData {
  data: UserData[]
}