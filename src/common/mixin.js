// 混入的用法，当多个组件要使用一个类的内容时使用混入
import { debounce } from '@/common/utils.js'
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            newRefresh: null
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 500) //防抖动函数,避免用户每输入一个字符都想服务器发送请求
        this.itemImgListener = () => {
            //当图片加载玩生成后刷新页面
            this.newRefresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener) //这里监听goodslistitem中发出的itemImgLoad这个事件
            // console.log('我是混入中的数据');

    }
}

export const isShowBackTop = {
    data() {
        return {
            isShow: false, //这里控制返回顶部按键是否显示
        }
    },
    methods: { //将公共事件定义到混入中
        backTop() {
            this.$refs.scroll.scrollTo(0, 0) //获取DOM中的scroll组件中的scrollTo方法确定点击事件发生后，页面滚动的位置以及事件
        },
    },
}