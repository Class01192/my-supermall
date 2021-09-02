<template>
  <div class="tabcontrol">
    <div v-for="(item,index) in title" :key="index" class="tab-control-item" >
      <span :class="{active:index===curentIndex}" @click="itemClick(index)">{{item}} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  created() {},
  props:{
    title:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  data() {
    return {
      curentIndex:0   //记录当前哪个文件被选中
    };
  },
  methods: {
    itemClick(index){
      // console.log(index);
      this.curentIndex=index
      this.$emit('tabClick',index) //子传父，将点击事件传递到父组件中
    }
  },
 }
</script>

<style  scoped>
.tabcontrol{
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  text-align: center;
  background-color: #fff;
}
.tab-control-item{
  flex: 1;
}
.active{
  color:#ff8198;
  border-bottom: 2px solid #ff8198;

}
.tab-control-item span{
  padding: 5px;
}

</style>