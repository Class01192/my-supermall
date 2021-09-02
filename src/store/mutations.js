export default {
    // 1、mutation的唯一作用就是修改state状态
    //  2、mutation中每个方法尽可能完成的事件比较单一
    // addToCart(state, payload) {
    //   let oldProduct = null;
    //   for(let item of state.cartList){
    //     if(item.iid === payload.iid){
    //       oldProduct = item;
    //     }

    //   }
    //   if(oldProduct){
    //     oldProduct.count +=1
    //   }else{
    //     payload.count = 1
    //     state.cartList.push(payload)
    //   }
    // }
    // 1、查找之前数组中是否含有该商品，如果可以找到的返回true
    //     let oldProduct = state.cartList.find(item => item.iid === payload.iid)
    //     if (oldProduct) {
    //         oldProduct.count += 1
    //     } else {
    //         payload.count = 1
    //         state.cartList.push(payload)
    //     }
    // }
    addCount(state, oldPayload) {
        oldPayload.count++
    },
    addToCart(state, payload) {
        payload.isChecked = true //向对象模型中添加一个参数，监听是否选中
        state.cartList.push(payload)

    }

}