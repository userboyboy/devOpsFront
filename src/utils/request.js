import axios from 'axios'
const service = axios.create({
    timeout: 5000, // request timeout 请求后端接口，五秒内没有返回前端直接返回超时
    baseURL: 'http://0.0.0.0:3000/api/'
})
service.interceptors.request.use(
    config => {
        // 请求头
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    res => {
        // 登录成功 token 过期统一返回登录页
        console.log(res, 'requ');

        if (res.data.meta.status == 403) {
            window.sessionStorage.removeItem('token')
            // window.location.href = '/';
            return
        }
        return res
    },
    error => {
        this.$message.error("网络开小差，请稍后再试")
        return Promise.reject(error)
    }
)

export default service