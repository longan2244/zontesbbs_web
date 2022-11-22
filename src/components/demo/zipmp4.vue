<template>
  <div style=" text-align: center; background-color: #6200ea; height: 100vh;">
      <Snackbar ref="child"></Snackbar>
        <v-toolbar color="deep-purple accent-4" cards dark flat>
      <v-btn @click.stop="returnv" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-card-title class="title font-weight-regular">返回</v-card-title>
      
      <v-spacer></v-spacer>
 
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
     <h3 style="color:white;">发布视频</h3>
     <br>
    <van-uploader v-model="fileList" :before-read="beforeRead" multiple :max-count="1" :max-size="5000 * 1024" @oversize="onOversize" />
    <Textarea @sendtextmp4text="upmp4"></Textarea>
    <!-- 遮罩层 -->
    <div class="text-center maskLayer">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="94">loading....</v-progress-circular>
    </v-overlay>
  </div>
  <!-- Snackbar -->
  
  </div>
</template>

<script>
import { Uploader } from "vant";
import Textarea from "@/components/Textarea.vue";
import Snackbar from "@/components/snackbar"
import { sendAnImagePostAPI } from "@/API/bbs/index";
import { demoAPI } from "@/API/bbs/index.js";
export default {
  data() {
    return {
      fileArr: [],
      fileList: [],
        overlay: false,//遮罩层
    };
  },
  
  methods: {
     beforeRead(file) {
      if (file.type !== 'video/mp4') {
        // Toast('');
        this.invokeChildMethod("请上传视频文件")
        return false;
      }
      return true;
    },
    //主方法
    async upmp4(content) {
      this.overlay = true
      //获取视频直连
      let data = await this.afterRead(this.fileList[0]);
      //发布视频
      // data.fileName + ";";
      let obj = {
        usercode: localStorage.getItem("usercode"),
        ititle: content.title,
        picStr: "",
        iContent:content.bio,
        atSome: "",
        iview: 1,
        VideoPath: "20220417195412_8112.png"+";"+data.fileName+";2597;1",
        voicePath: "",
      };
      // console.log(obj);
      await sendAnImagePostAPI(0, obj);
       this.overlay = false
       this.invokeChildMethod("发布视频成功,请刷新")
       setTimeout(()=>{
            this.returnv()
       },2000)
    },
    async afterRead(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      // this.fileArr=file.file
     // console.log(formData.get("file"));
      let { data } = await demoAPI(formData.get("file"));
      return data;
    },
    //返回
    returnv(){
      this.$router.go(-1)
    },
        //调用子组件提示
    invokeChildMethod(str) {
      this.$refs.child.prinsnackbar(str, true);
    },
    //文件大小提示
    onOversize(){
      this.invokeChildMethod("文件不能超过5M")
    }
  },
  components: {
    Textarea,
    Snackbar,
  },
};
// var form = document.querySelector("#form");
</script>

<style>

/* let { data } = await demoAPI(formdata); */
</style>
