<template>
  <div class="goods-item" @click="goodsClick">   <!-- @click="goodsClick"-->
     <img :src="showImage" alt=""   @load="imgLoad"> <!-- @load="imgLoad" > load vue自带方法监听图片是否加载完毕 -->

    <div class="goods-info">
      <p >{{goodsItem.title}}</p>
      <span class="price">${{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>   <!-- //展示收藏数量 -->
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  created() {},
  data() {
    return {};
  },
  props: {
    goodsItem:{
      type:Object,
      defaule(){
        return{}
      }
    }
  },
  methods: {
    imgLoad(){
     this.$bus.$emit('itemImageLoad')   //$bus事件总线，向外发出一itemImageLoad这个事件
    },
    goodsClick(){
      this.$router.push('/detail/'+this.goodsItem.iid)  //动态路由，向/detail后面追加iid地址+ this.goodsItem.iid)
    }
  },
  computed:{
    showImage(){  //计算属性，判断参数中是否含有show
    return this.goodsItem.image || this.goodsItem.show.img
    }
  }
  
};
</script>

<style scoped>
.goods-item {
    /* display: inline-block; */
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
    border:3px solid var(--color-tint);
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>