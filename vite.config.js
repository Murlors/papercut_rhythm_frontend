import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
	],
	server: {
		open: true, //启动项目自动弹出浏览器
		port: 5173, //启动端口
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				// target: 'http://117.50.179.215:9999', //实际请求地址
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
			'/picbed': {
				target: 'https://smms.app/api/v2',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/picbed/, ''),
			}
		},
	},
})
