/*
 * @Author: xutian 77181077+Tiana1234@users.noreply.github.com
 * @Date: 2023-09-19 11:12:36
 * @LastEditors: xutian 77181077+Tiana1234@users.noreply.github.com
 * @LastEditTime: 2024-05-20 11:14:41
 * @FilePath: \wms_ui\src\router\router.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 对外暴露配置路由
export const antRoutes = {
  path: '/',
  name: 'home',
  component: () => import('../view/HomeView.vue'),
  children: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('../views/home/homePage.vue'),
    // },
    // {
    //   path: '/warehouse', //  数据建模- 仓库建模管理
    //   name: 'warehouse',
    //   component: () => import('../views/dataModel/warehouse/index.vue'),
    // },
    // {
    //   path: '/reservoirArea', //  数据建模- 库区建模管理
    //   name: 'reservoirArea',
    //   component: () => import('../views/dataModel/reservoirArea/index.vue'),
    // },
    // {
    //   path: '/shelf', //  数据建模- 货架建模管理
    //   name: 'shelf',
    //   component: () => import('../views/dataModel/shelf/index.vue'),
    // },

    // {
    //   path: '/site', //  数据建模- 库位建模管理
    //   name: 'site',
    //   component: () => import('../views/dataModel/site/index.vue'),
    // },
    // {
    //   path: '/network', //  数据建模- 网关建模管理
    //   name: 'network',
    //   component: () => import('../views/dataModel/network/index.vue'),
    // },
    // {
    //   path: '/goodsCategory', //  数据建模- 货物类别管理
    //   name: 'goodsCategory',
    //   component: () => import('../views/dataModel/goodsCategory/index.vue'),
    // },
    // {
    //   path: '/goodsManagement', //  数据建模- 货物管理
    //   name: 'goodsManagement',
    //   component: () => import('../views/dataModel/goodsManagement/index.vue'),
    // },
    // {
    //   path: '/manufacturer', //  数据建模- 生产厂家管理
    //   name: 'manufacturer',
    //   component: () => import('../views/dataModel/manufacturer/index.vue'),
    // },
    // {
    //   path: '/receivingUnit', //  数据建模- 领用单位管理
    //   name: 'receivingUnit',
    //   component: () => import('../views/dataModel/receivingUnit/index.vue'),
    // },
    // {
    //   path: '/measurementUnit', //  数据建模- 计量单位管理
    //   name: 'measurementUnit',
    //   component: () => import('../views/dataModel/measurementUnit/index.vue'),
    // },
    // {
    //   path: '/warning', //  数据建模- 告警管理
    //   name: 'warning',
    //   component: () => import('../views/dataModel/warning/index.vue'),
    // },
    // {
    //   path: '/standardInstruction', //  数据建模- 标准说明
    //   name: 'standardInstruction',
    //   component: () => import('../views/dataModel/standardInstruction/index.vue'),
    // },
    // {
    //   path: '/inventory', // 仓库管理- 库存管理
    //   name: 'inventory',
    //   component: () => import('../views/warehouse/inventory/index.vue'),
    // },
    // {
    //   path: '/warehousing', // 仓库管理- 入库管理
    //   name: 'warehousing',
    //   component: () => import('../views/warehouse/warehousing/index.vue'),
    // },
    // {
    //   path: '/outbound', // 仓库管理- 出库管理
    //   name: 'outbound',
    //   component: () => import('../views/warehouse/outbound/index.vue'),
    // },
    // {
    //   path: '/check', // 仓库管理- 盘点管理
    //   name: 'check',
    //   component: () => import('../views/warehouse/check/index.vue'),
    // },
    // {
    //   path: '/scrap', // 仓库管理- 报废管理
    //   name: 'scrap',
    //   component: () => import('../views/warehouse/scrap/index.vue'),
    // },
    // {
    //   path: '/relocation', // 仓库管理- 移库管理
    //   name: 'relocation',
    //   component: () => import('../views/warehouse/relocation/index.vue'),
    // },
    // {
    //   path: '/procure', // 仓库管理- 采购管理
    //   name: 'procure',
    //   component: () => import('../views/warehouse/procure/index.vue'),
    // },
    // /**
    //  * 查询管理
    //  */
    // {
    //   path: '/record', // 查询管理- 记录查询
    //   name: 'record',
    //   component: () => import('../views/queryManagement/record/index.vue'),
    // },
    // {
    //   path: '/allocationQuery', // 查询管理- 库位查询
    //   name: 'allocationQuery',
    //   component: () => import('../views/queryManagement/allocationQuery/index.vue'),
    // },
    // {
    //   path: '/checkQuery', // 查询管理- 盘点查询
    //   name: 'checkQuery',
    //   component: () => import('../views/queryManagement/checkQuery/index.vue'),
    // },
    // {
    //   path: '/inventoryAnalysis', // 查询管理- 库存分析-1
    //   name: 'inventoryAnalysis',
    //   component: () => import('../views/queryManagement/stockAnalysis/index.vue')
    // },
    // {
    //   path: '/checkAnalysis', // 查询管理- 盘点分析
    //   name: 'checkAnalysis',
    //   component: () => import('../views/queryManagement/checkAnalysis/index.vue'),
    // },
    // // {
    // //   path: '/inOutboundAnalysis', // 查询管理- 出入库分析
    // //   name: 'inOutboundAnalysis',
    // //   component: () => import('../views/queryManagement/inOutboundAnalysis/index.vue'),
    // // },
    // {
    //   path: '/log', // 查询管理- 操作日志
    //   name: 'log',
    //   component: () => import('../views/queryManagement/log/index.vue'),
    // },
    // {
    //   path: '/print', // 查询管理- 打印管理
    //   name: 'print',
    //   component: () => import('../views/queryManagement/print/index.vue'),
    // },
    // {
    //   path: '/user', // 系统管理-用户中心
    //   name: 'user',
    //   component: () => import('../views/systemManagement/user/inde.vue'),
    // },
    // {
    //   path: '/backUp', // 查询管理- 打印管理
    //   name: 'backUp',
    //   component: () => import('../views/systemManagement/backUp/index.vue'),
    // },
  ],
}
