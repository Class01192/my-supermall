<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !==0">
    <!-- <div v-for="tables in paramInfo.rule.tables" :key="tables.index"> -->
    <table v-for="(table,index) in paramInfo.sizes" 
           :key="index" 
           class="info-size">
      <tr v-for="(tr,indey) in table" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <!-- </div> -->
    <table class="info-param">
      <tr v-for="(info,index) in paramInfo.infos" :key="index">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <!-- 这里先判断paramInfo.info.images中是否有值，若有值便进行渲染图片，无值再进行渲染 -->
    <div class="info-img" v-if="paramInfo.image"> 
      <img :src="paramInfo.info.images[0]" alt="" >
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  created() {},
  data() {
    return {};
  },
  props: {
   paramInfo:{
      type:Object,
      defaule(){
          return {}
      }
    }
  },
  methods: {
    imageLoad(){
     
    }
  },
};
</script>

<style scoped>
.param-info{
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
.param-info table{
  width: 100%;
  border-collapse: collapse;
}
.param-info table tr{
  height: 42px;
}
.param-info table tr td{
  border-bottom: 1px solidrgba(100,100,100,.1);
}
.info-param-key{
  width: 95px;
}
.info-param{
  border-top: 1px solid rgba(0,0,0,.1);
}
.param-value{
  color:#eb4868;
}
.info-img img{
  width: 100%;
}
</style>