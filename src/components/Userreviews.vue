<template>
  <v-card max-width="100%" class="mx-auto">
    <!-- <strong> 帖子 ID：{{ id }}</strong> -->
    <v-list>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <template v-for="(item, index) in pldata">
          <v-list-item :key="item.ID">
            <v-list-item-avatar v-if="!ifimg(item.userPhotoPath)">
              <v-img :src="item.userPhotoPath"></v-img>
            </v-list-item-avatar>
            <v-list-item-avatar v-else color="pink">
              <span class="white--text headline">Z</span>
            </v-list-item-avatar>

            <v-alert
              border="left"
              colored-border
              color="pink"
              elevation="1"
              width="100%"
              class="py-1"
            >
              <v-list-item-action-text>
                <span v-html="item.UserName + ' '"></span>
                <span v-html="item.sendTime + '发布'"></span>
                <v-list-item class="py-1" v-html="item.icontent"></v-list-item>
                <img
                  v-for="(imgdata, index) in item.cmpicturePath"
                  @click="previewThePicture([item.imgpath + imgdata])"
                  :key="index"
                  :src="item.imgpath + imgdata"
                  alt=""
                  width="33.3%"
                  class="pr-2"
                />
              </v-list-item-action-text>
              <v-row align="center" justify="end" class="mb-2 mr-2">
                <v-icon color="#ccc" class="mr-5">mdi-message-text</v-icon>
                <v-icon
                  class="pr-2"
                  :color="item.likecolor"
                  @click="like(item, index)"
                  >mdi-heart</v-icon
                >
                {{ item.zanNum }}
              </v-row>
            </v-alert>
          </v-list-item>
        </template>
      </van-list>
    </v-list>
  </v-card>
</template>

<script>
import { getpostallAPI, likeAPI } from "@/API/bbs/index";
import { ImagePreview } from "vant";
import { List } from "vant";
export default {
  props: ["id"], //帖子id
  data() {
    return {
      floorSum: "", //总评论数
      lastID: "0", //评论id
      pldata: [], //评论数据
      // cmcmitem:[],//评论评论数据
      zandata: "", //是否点赞
      imgdata: [], //图片
      loading: false, //分页
      finished: false, //分页
    };
  },
  computed: {},
  // 获取评论数据方法
  methods: {
    async getcommentdata() {
      let { data } = await getpostallAPI(1, this.id, this.lastID);
      if (data.status == 1) {
        this.finished = true;
      }

      this.floorSum = data.floorSum;
      this.lastID = data.lastID;
      try {
        this.pldata = [...this.pldata, ...data.commentitem];
      } catch (error) {}
      this.pldata.forEach((item, index) => {
        item.likecolor = "#ccc";
        item.likeCmSum = "0";
        if (item.cmpicturePath != "") {
          try {
            item.cmpicturePath = item.cmpicturePath.split(";");
          } catch (error) {}
        }
        this.loading = false;
      });
    },
    //评论点赞
    async like(item, index) {
      let { data } = await likeAPI(1, this.id, item.ID);
      if (data.likeState == "add") {
        this.pldata[index].likecolor = "pink";
      } else {
        this.pldata[index].likecolor = "#ccc";
      }
      this.pldata[index].likeCmSum = data.likeCmSum;
    },

    //预览图片
    previewThePicture(arr) {
      ImagePreview({
        images: arr,
        closeable: true,
      });
    },
    //分页
    onLoad() {
      // if(this.pldata.length == 0)
      //  this.finished = true
      if (this.lastID == "0") return;
      this.getcommentdata();
    },
    ifimg(usePhotoPath) {
      // console.log(usePhotoPath);
      if (usePhotoPath == "../images/RoadBook/Man07.jpg") {
        return true;
      }
      return false;
    },
  },
  created() {
    // console.log(this.id);
    this.getcommentdata();
  },
};
</script>