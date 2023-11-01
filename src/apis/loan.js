import request from '@/utils/request'

//贷款申请提交接口
export const createLoan = (data) => {
    return request({
        url: '/loan/create',
        method: 'POST',
        data,
    })
}
// 获取贷款列表接口
export const getLoanList = (params) => {
    return request({
        url: '/loan/list',
        method: 'GET',
        params
    })
}

// 编辑接口
export const updateLoan = (data) => {
    return request({
        url:'/loan/update',
        method:'PUT',
        data,
    })
}

// 删除接口
export const deleteLoan = (id) => {
    return request({
        url: '/loan/delete/'+id,
        method: 'delete',
    })
}

//提交审核接口
export const submitApprove = (id) => {
    return request({
        url: '/loan/submitToApprove',
        method: 'post',
        data:{
            id
        }
    })
}

// 贷款初审接口
export const queryList = (params) => {
    return request({
        url: '/approve/first/list',
        method: 'get',
        params
    })
}
// 初审通过/拒绝接口
export const approveFirst = (id,flag) => {
    //调用时传入flag，改变调用的是通过或者是失败的接口
    return request({
        url: '/approve/first/'+flag,
        method: 'post',
        data: {
            loanId:  id,
            appId: id
        }
    })
}

// 贷款终审接口
export const queryEndList = (params) => {
    return request({
        url: '/approve/end/list',
        method: 'get',
        params
    })
}

// 审批 - 终审-通过/拒绝接口
export const approveEnd = (id, flag) => {
    return request({
        url: '/approve/end/' + flag,
        method: 'POST',
        data: {
            appId: id,
            loanId: id
        }
    })
}
// 合同列表
export const contractList = (params) => {
    return request({
        url: '/contract/list',
        method: 'get',
        params
    })
}

// 合同管理- 生成合同接口
export const generateContract = (id) => {
    return request({
        url: '/contract/createFile',
        method: 'post',
        data: {
            id
        }
    })
}

// 合同管理- 下载合同接口
export const downloadContract = (id) => {
    return request({
        url: '/contract/download',
        method: 'get',
        params: {
            id
        }
    })
}