import request from './request'

function post(url, data, opt) {
    return request({
        ...{
            url: url,
            method: 'post',
            data: data,
        }, ...opt
    })
}
function get(url, data, opt) {
    return request({
        ...{
            url: url,
            method: 'get',
            params: data
        }, ...opt
    })
}

export default {
    post, get
}