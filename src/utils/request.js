import axios  from "axios";
import router from '@/router';

//Notification是一种错误提醒
import {  Message, Notification } from 'element-ui';

const request = axios.create(
    {		//设置/api前缀
        baseURL: "/api"
    }
)
//请求拦截器
request.interceptors.request.use(config=>{
    const token = localStorage.getItem("token");
    token && (config.headers.token = token)
    return config
})
//响应拦截器
request.interceptors.response.use(
    response => {
        //20000代表成功
        if (response?.data?.code === 20000) {
            return response;
            
        } // 603token失效, 跳转到登录
        else if (response?.data?.code === 603) { 
            // 替换到登录页面，但是如果是login页面那就不重复跳转
            let url=window.location.href.split('/')
            if(url[url.length-1]!=='login'){
                router.replace('/login')
            }
            
        } else {
            //如果原始的请求状态不等于200表示响应错误
             if(response.status!==200){
                Notification.error({
                    title: '错误',
                    message: '响应错误'
                })
            }
        }
                return response
    }
)


export default request