<template>
  <div class="text-center contextbox">
    <Snackbar ref="child"></Snackbar>
  
    <v-icon color="white" @click.stop="sheet = !sheet" dense class="mr-1" 
      >mdi-message-text</v-icon
    >
      {{CommentSum}}
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="200px">
        <center class="bjk">
          <!-- 编辑框 -->
          <v-text-field
            color="#ff4081"
            v-model="cmContent"
            label="请输入"
            autofocus
          ></v-text-field>
          <!-- 发送-->
          <div class="go">
            <v-btn
              class="ma-2 white--text"
              :loading="loading"
              :disabled="loading"
              color="#ff4081"
              @click="loaderS"
            >
              发送
            </v-btn>
          </div>
        </center>
        <!-- <v-btn class="mt-6" text color="red" @click="sheet = !sheet">关闭</v-btn> -->
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import {commentsAPI} from "@/API/bbs/index"
import Snackbar from "@/components/snackbar"
export default {
  props:["ID","CommentSum"],
  data: () => ({
    ISOK:false,
    sheet: false,
    cmContent: "",
    //按钮状态
    loader: null,
    loading: false,
  }),
  methods:{
    //调用子组件方法
     invokeChildMethod(){
            this.$refs.child.prinsnackbar('发送成功',true)
        },
    //发送评论 
   async comments(){
       let {data} = await commentsAPI(0,this.ID,this.cmContent)
      //console.log(data);
      if(data.returnflag=="感谢支持"||"1"){
      //发送成功取消按钮加载中状态
        this.loader = null;
        this.sheet = !this.sheet
         this.invokeChildMethod()
      }else{
        
      }
  
    },
    loaderS() {
      const l = this.loader;
      this[l] = !this[l];
       this.comments()
    },
  },
  components:{
    Snackbar
  }
};
</script>

<style lang="less" scoped>
.contextbox {
  z-index: 9999;
}
.bjk {
  margin: 0 16px;
}
</style>