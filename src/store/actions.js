export default {
    //异步操作或者复杂逻辑要放到action中进行
    addToCart(context, payload) {
        return new Promise((resolve, reject) => {
            //这一步用来遍历cartList，判断新传入商品的iid(payload.iid),是否在cartList已经存在返回一个布尔值
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

            if (oldProduct) {
                //如果存在，让当前商品数+1
                // oldProduct.count += 1
                context.commit('addCount', oldProduct)
                resolve('当前商品数加1')
            } else {
                // 如果不存在，将该商品添加至购物车，同时，商品数量定为1
                payload.count = 1
                context.commit('addToCart', payload)
                resolve('以添加至购物车')
            }

        })
    }

}