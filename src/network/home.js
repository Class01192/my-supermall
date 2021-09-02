import { request } from './request';

export function getHomeMultidate() {
    return request({
        url: 'home/multidata'
    })


}
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: { //向地址中追加参数
            type,
            page
        }
    })
}