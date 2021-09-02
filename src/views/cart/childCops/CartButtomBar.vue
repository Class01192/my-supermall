<template>
  <div class="cart-buttom-bar">
  <div class="check-content">
    <check-button class="check-button" 
                  :is-checked="isSelectAll" 
                  @click.native="checkClick"></check-button>
    <span>全选</span>
  </div>
  <div class="total-price">
    合计：{{totalPrice}}
  </div>
  <div class="caculate">
     去结算：{{checkLength}}件
  </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkbutton/CheckButton'
import { mapGetters } from 'vuex'; 
export default {
  name: "CartButtomBar",
  created() {},
 
  components:{
  CheckButton
  },
  computed:{
     ...mapGetters(['cartList']),
    totalPrice(){
      //先筛选出来被选中的商品
      return '￥'+this.cartList.filter(item=>{
      return item.isChecked}).reduce((preValue,item)=>{
        return preValue + item.price*item.count 
        // console.log(item);;
      },0).toFixed(2)
    },
    checkLength(){
    return this.cartList.filter(item=>{
      return item.isChecked
    }).length
    },
    isSelectAll(){
      if(this.cartList.length == 0 ) 
      return false
      return !this.cartList.find(item=> !item.isChecked)  //判断是否有未选中商品，如果有，就让全选按钮处于非选中状态
    }
  },
  
  methods: {
    checkClick(){
    if(this.isSelectAll){  //若全部被选中
      this.cartList.forEach(item => { item.isChecked = false });  //点击后全部不选中
}else{  //若部分，获取全部未选中
   this.cartList.forEach(item=>{ item.isChecked = true })   //点击后全部选中
}
    
    }
  }
};
</script>

<style  scoped>
.cart-buttom-bar{
  position: fixed;
  left: 0;
  bottom: 49px;
  display: flex;
  width: 100%;
  height: 40px;
  background-color:rgb(180, 178, 178);
}
.check-content{
  display: flex;
  /* line-height: 40px; */
  /* margin: 10px; */
  padding: 10px 0 0 10px;
}
.check-button{
width: 20px;
height: 20px;
font-size: 14px;
}
.total-price{
  flex: 1;
  padding: 10px 0 0 20px;
  font-size: 14px;
}
.caculate{
  width: 100px;
  height: 100%;
  background-color:red;
  color: #fff;
  text-align: center;
  line-height: 40px;
  font-size: 14px;

}
</style>