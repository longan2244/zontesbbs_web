<template>
  <div>
    <v-toolbar color="deep-purple accent-4" cards dark flat>
      <v-btn @click.stop="delwind" icon>
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
    <Snackbar ref="child"></Snackbar>
    <div class="jpgregion">
      <van-uploader
        multiple
        preview-size="25vw"
        :before-read="beforeRead"
        v-model="fileList"
      >
        <template #preview-cover="{ file }">
          <div class="preview-cover van-ellipsis">{{ file.name }}</div>
        </template>
      </van-uploader>
    </div>
    <Textarea @sendtext="sendtexts"></Textarea>
  </div>
</template>
<script>
import Snackbar from "@/components/snackbar";
import Textarea from "@/components/Textarea";
import { commentsAPI, sendAnImagePostAPI } from "@/API/bbs/index";
import { Uploader, Toast } from "vant";
import { ZIPimg, ba64ToLink } from "@/Public/PublicMethods.js";
// import { ZIPimg } from "@/Public/PublicMethods.js";
let imgBase64 = [];
export default {
  props: ["messages"],
  data() {
    return {
      imgdata: [],
      fileList: [], //用户发送的视频，图片
      comment: "", //用户发送的文本信息
      title: "", //用户标题
      type: false, //弹窗类型
    };
  },
  components: { Snackbar, Textarea },
  methods: {
    //子传过来的文字数据
    sendtexts(val) {
      this.comment = val.bio;
      this.title = val.title;
     //console.log(val.bio, val.title);
      this.afterRead(this.fileList);
    },
    // 关闭弹窗
    delwind() {
      // console.log(4444);
      this.$emit("delupWindow", this.type);
      // this.$router.go(-1)
      if (this.$route.fullPath == "/sendAnImageArticle") this.$router.go(-1);
    },
    // 返回布尔值
    beforeRead(file) {
      // console.log(954);
      if (this.$route.fullPath == "/sendAnImageArticle") {
        return true;
      }
      if (file.type !== "image/jpeg") {
        // Toast('请上传 jpg 格式图片');
        // console.log("请上传 jpg 格式图片");
        // alert("请上传 jpg 格式图片")
        this.invokeChildMethod("请上传 jpg 格式图片");
        return false;
      }
      return true;
    },
    async afterRead(file) {
      // console.log(); return
      let picturePath = "";
      if (file.length > 0) {
        let imgBase64 = await ZIPimg(file); //返回数组类型
        picturePath = await ba64ToLink(imgBase64); //返回字符串类型
      }
     // console.log(picturePath);
      if (this.$route.fullPath == "/sendAnImageArticle") {
        let obj = {
          usercode: localStorage.getItem("usercode"),
          ititle: this.title,
          picStr: picturePath,
          iContent: this.comment,
          iview: 1,
          VideoPath: "",
          voicePath: "",
          type: 0,
          atSome: "",
        };
        //console.log(obj);
        let { data } = await sendAnImagePostAPI(0, obj);
        if (data.result == 1) {
          this.invokeChildMethod("发送文章成功");
        }
      } else {
        let { data } = await commentsAPI(
          0,
          this.messages.ID,
          this.comment,
          picturePath,
          this.title
        );
        this.invokeChildMethod("发送评论成功");
      }

      setTimeout(() => {
        this.delwind();
      }, 2000);
    },
    //调用子组件提示
    invokeChildMethod(str) {
      this.$refs.child.prinsnackbar(str, true);
    },
  },
};
</script>
<style lang="less" scoped>
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}

/deep/.jpgregion .van-uploader__wrapper {
  justify-content: center;
  align-items: left;
}
</style>