/*
 * @Author: xutian 77181077+Tiana1234@users.noreply.github.com
 * @Date: 2023-09-11 15:17:06
 * @LastEditors: xutian 77181077+Tiana1234@users.noreply.github.com
 * @LastEditTime: 2023-09-13 15:25:34
 * @FilePath: \ck-uid:\cangku\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from 'vue-router'
// 引入路由详情
import { antRoutes } from './router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    antRoutes,
    {
      path: '/404', //找不到地址
      name: '404',
      component: () => import('../view/404.vue'),
    },
    {
      path: '/:pathMatch(.*)*', //找不到地址
      name: 'Any',
      redirect: '/404',
    },
  ],
})
// 导出
export default router
