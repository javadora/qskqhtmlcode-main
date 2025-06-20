/*
 * @Author: xutian 77181077+Tiana1234@users.noreply.github.com
 * @Date: 2023-09-13 17:31:52
 * @LastEditors: xutian 77181077+Tiana1234@users.noreply.github.com
 * @LastEditTime: 2023-10-16 16:07:46
 * @FilePath: \vue-admind:\wms_ui\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ConfigEnv, UserConfigExport, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import { viteMockServe } from 'vite-plugin-mock'
// import DefineOptions from 'unplugin-vue-define-options/vite'
// import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import path from 'path'
// 引入svg
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  // 获取各种环境下对应的变量
  loadEnv(mode, process.cwd())
  return {
    base: './',
    plugins: [
      // VueSetupExtend(),
      // DefineOptions(),
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // createSvgIconsPlugin({
      //   iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      //   symbolId: 'icon-[dir]-[name]',
      // }),
      // viteMockServe({
      //   localEnabled: command === 'serve',
      // }),
    ],
    resolve: { alias: { '@': path.resolve('./src') } },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    //设置反向代理，跨域
    server: {
      // host: '0.0.0.0',//设置地址：http://localhost
      // port: 4500, // 设置服务启动端口号
      // open: true, // 设置服务启动时是否自动打开浏览器
      // cors: true, // 允许跨域
      proxy: {
        '/sec': {
          target: 'http://192.168.55.7:9040',
          // target: 'http://192.168.55.222:9004',//孙诚
          // target: 'http://192.168.55.42:9004',//陈慧慧
          // target: 'http://192.168.55.13:9004',//王飞军
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/sec/, '')//这里的/需要转义
        }
      }
    },
  }
}
