<template>
  <div class="listbox" @click.stop="topost">
    <!-- ../images/drawable-mdpi/f013.png -->
    <v-card class="mx-auto" color="#6200ea" dark max-width="100%">
      <!-- 表情包 -->
      <v-card-text ref="content" class="imgs" v-html="iContent"> </v-card-text>
      <!-- 轮播图 -->
      <v-carousel height="200" v-if="items.length">
        <v-carousel-item
          v-for="(item, i) in items"
          @click.stop="getImg(items, i)"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
      <!-- 视频播放 -->
      <div class="mdui-video-container" v-if="video.length > 0">
        <iframe :src="this.video[0]" frameborder="0" allowfullscreen></iframe>
      </div>
      <!-- 轮播图结束 -->
      <v-card-actions>
        <!-- 用户头像 -->
        <v-list-item>
          <v-list-item-avatar color="grey darken-3">
            <v-img
              @click.stop="userinfo"
              class="elevation-6"
              :src="UserProfile"
            ></v-img>
          </v-list-item-avatar>
          <!-- 用户名称 -->
          <v-list-item-content>
            <v-list-item-title>{{ NickName }}</v-list-item-title>
            <span class="subheading mr-2">{{ ViewTime }}</span>
          </v-list-item-content>
          <!-- 用户操作-->
          <v-row align="center" justify="end">
            <!-- 评论 -->
            <span><Comments :ID="ID" :CommentSum="CommentSum"></Comments></span>
            &nbsp; &nbsp; &nbsp;
            <!-- 点赞 -->
            <v-icon :color="likecolor" @click.stop="like" class="mr-1"
              >mdi-heart</v-icon
            >
            <span class="subheading mr-2">{{ LikeSumS }}</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import Comments from "@/components/Comments";
import { likeAPI } from "@/API/bbs/index";
import bus from "@/tool/EventBus.js";
export default {
  created() {
    this.URLimg();
    this.URLvideo();
    this.ismylikes();
  },
  props: [
    "iContent",
    "UserProfile",
    "NickName",
    "LikeSum",
    "PicturePath",
    "PicURL",
    "VideoPath",
    "VideoURL",
    "ID",
    "isLikeBlog",
    "ViewTime",
    "CommentSum",
    "title",
  ],
  data() {
    return {
      LikeSumS: this.LikeSum, //总点赞数
      items: [], //图片数组
      video: [], // 视频数组
      likecolor: "white",
      ismylisk: this.isLikeBlog, //是否点赞
      iContentS: this.iContent, //内容
    };
  },
  methods: {
    //评论
    comments() {
     // console.log(666677);
    },
    // 是否点赞
    ismylikes() {
      if (this.ismylisk == "like") {
        this.likecolor = "pink";
      }
    },
    // 预览图片
    getImg(items, i) {
      ImagePreview({
        images: [this.items[i].src],
        showIndex: true,
        loop: false,
        startPosition: i,
      });
    },
    // 解析图片地址
    URLimg() {
      try {
        if (!this.PicturePath) {
          return;
        }
        // console.log();
        this.PicturePath.split(";").forEach((element) => {
          this.items.push({ src: this.PicURL + element });
        });
      } catch (error) {}
    },
    //解析视频地址
    URLvideo() {
      try {
        if (this.VideoPath != "") {
        // console.log("有视频");
          let newarr = this.VideoPath.split(";");
          this.video.push(this.VideoURL + newarr[1]);
        }
      } catch (error) {}
    },
    //到贴纸
    topost() {
       setTimeout(() => {
         bus.$emit("emittiezidata", this.ID, this._props, this._data);
       },);
        setTimeout(() => {
         bus.$emit("emittitleandav", this.ID, this._props, this._data);
       },);
        this.$router.push("/bbs/post");
    },
    userinfo() {
      this.$router.push("/userinfo");
    },
    
    async like() {
      let { data } = await likeAPI(0, this.ID);
      
      if (data.likeState == "add") {
        this.likecolor = "pink";
      } else {
        this.likecolor = "white";
      }
      this.LikeSumS = data.likeSum;
    },
  },
  mounted() {
    try {
      // console.log(this.$refs);
      this.$refs.content.children[0].style = "width: 20px;";
      let a = this.$refs.content.children[0].src.split("images");
      // console.log(a[1]);
      let s = "http://60.205.191.83/images" + a[1];
      this.emojis = s;
      this.$refs.content.children[0].src = s;
    } catch (error) {}
  },
  components: {
    Comments,
  },
};
</script>

<style lang="less" scoped>
.mx-auto {
  margin-top: 10px;
}
.listbox {
  padding: 10px;
}
// .img{
//   background: url("http://localhost:5139/images/drawable-mdpi/f001.png");
// }
</style>