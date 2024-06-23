import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import { createRouter, createWebHashHistory } from 'vue-router'
import global_ from './config/global'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.config.globalProperties.$http = axios
app.config.globalProperties.$global = global_.data
app.config.globalProperties.$uploadImg = async function (file) {
	let data = new FormData()
	let picbedUrl = '/picbed/upload'
	data.append('smfile', file)
	data.append('format', 'json')
	const res = await axios({
		url: picbedUrl,
		method: 'post',
		headers: {
			'Authorization': 'r6sTCbjSot5v0fNzTZ5NbaQbFsAyhbEx',
			'Content-Type': 'multipart/form-data'
		},
		data: data,
	})
	if (res.data.success) {
		return res.data.data.url
	} else {
		this.$message.error('上传失败')
		console.log(res)
	}
}

app.use(router)

app.mount('#app')
