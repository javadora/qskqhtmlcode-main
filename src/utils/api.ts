
import request from '@/utils/request'
import type { CommonResponseData, AtteOfMonthData, AtteOfMonthResData, RuleQueryData, 
  RulePageData, RuleData, ConfigData, ConfigResData, UserData, UserResData } from './type'

enum API {
  atte_statistic_url = '/sec/atte/query/statistic', //考勤月度统计
  atte_query_rule_url = '/sec/atte/query/rule', //查询规则日期
  atte_set_rule_url = '/sec/atte/set/rule', //设置规则日期
  atte_del_rule_url = '/sec/atte/del/rule', //删除规则日期
  atte_auto_rule_url = '/sec/atte/set/add', //设置当月规则日期
  atte_query_config_url = '/sec/atte/query/config', //查询配置
  atte_set_config_url = '/sec/atte/set/config', //设置配置
  atte_query_user_url = '/sec/atte/query/user', //查询用户
  atte_set_user_url = '/sec/atte/set/user', //设置用户
}

export const apiAtteStatistic = (data: AtteOfMonthData) =>
  request.post<any, AtteOfMonthResData>(API.atte_statistic_url, data)

export const apiRuleQuery = (data: RuleQueryData) =>
  request.post<any, RulePageData>(API.atte_query_rule_url, data)

export const apiRuleSet = (data: RuleData[]) =>
  request.post<any, CommonResponseData>(API.atte_set_rule_url, data)

export const apiRuleDel = (data: number[]) =>
  request.post<any, CommonResponseData>(API.atte_del_rule_url, data)

export const apiRuleAuto = () =>
  request.post<any, CommonResponseData>(API.atte_auto_rule_url)

export const apiConfigQuery = () =>
  request.post<any, ConfigResData>(API.atte_query_config_url)

export const apiConfigSet = (data: ConfigData) =>
  request.post<any, CommonResponseData>(API.atte_set_config_url, data)

export const apiUserQuery = () =>
  request.post<any, UserResData>(API.atte_query_user_url)

export const apiUserSet = (data: UserData[]) =>
  request.post<any, CommonResponseData>(API.atte_set_user_url, data)