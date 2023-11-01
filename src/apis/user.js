import request from '@/utils/request' 

export const doLogin = (user)=>{
    return request.post("/user/login", {
        //这里是后端需要account字符，也就是用户名
        account: user.username,
        password: user.pass
    })
} 

// 用户登录接口
export const logout = ()=>{
    return request.post('/user/logout');
}

// 创建管理者接口
export const createUser =({username,password,permission})=>{
    return  request.post('/permission/createUser',{
        account:username,
        password,
        role_id:permission
    }) 
}

//获取用户列表接口 
export const userList =()=>{
    return request({
        url: '/user/list?type=new',
        method: 'get'
    })
}

// 判断用户角色接口
export const userInfo = ()=>{
    return request.get("/user/info")
}