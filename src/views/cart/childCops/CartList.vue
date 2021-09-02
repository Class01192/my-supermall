<template>
   <div>
     <!-- <li v-for="(item,index) in cartList" :key="index">{{item}}</li>   class="catr-list"-->
     <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
   </div>
          
   
</template>

<script>
import CartListItem from './CartListItem.vue'
import { mapGetters } from 'vuex'; 
export default {
  name: "CartList",
  created() {},
  data() {
    return {};
  },
  components:{
    CartListItem
  },
   computed:{
     ...mapGetters(['cartList'])
   }
}
</script>

<style  scoped>
</style>