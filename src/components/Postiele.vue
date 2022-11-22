<template>
  <div :key="messages.NickName">
    <v-container fluid>
      {{ data.ID }}
      <v-row justify="center">
        <br />
        <br />
        <v-expansion-panels v-model="panel" multiple popout>
          <v-expansion-panel hide-actions v-model="panel">
            <v-expansion-panel-header>
              <v-row align="center" class="spacer" no-gutters>
                <v-col cols="2" sm="2" md="1">
                  <v-avatar size="38px">
                    <img alt="Avatar" :src="messages.UserProfile" />
                  </v-avatar>
                </v-col>

                <v-col class="text-no-wrap" cols="5" sm="3">
                  <v-chip class="ma-2" color="pink" text-color="white" small>
                    关注
                  </v-chip>
                  <br />
                  <strong v-html="messages.title"></strong>
                </v-col>
              </v-row>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-chip class="ma-2" color="pink" text-color="white" small>
                发布于{{ messages.ViewTime }}
                <v-icon right small>mdi-publish</v-icon>
              </v-chip>
              <v-divider></v-divider>
              <br />
              <strong>{{ messages.NickName }}:</strong>
              <v-card-text v-html="messages.iContentS"></v-card-text>
              <div class="imgbox">
                <!-- v-if="messages.items.length!=0" -->
                <!-- 作者图片 -->
                <v-row>
                  <v-col cols="12" sm="6" offset-sm="3">
                    <v-card>
                      <v-container fluid>
                        <v-row>
                          <v-col
                            v-for="(img, i) in messages.items"
                            :key="i"
                            class="d-flex child-flex"
                            cols="4"
                          >
                            <v-card flat tile class="d-flex">
                              <v-img
                                :src="img.src"
                                :lazy-src="`https://picsum.photos/10/6?image=${
                                  i * 5 + 10
                                }`"
                                @click="getImg(img, i)"
                                aspect-ratio="0.8"
                                class="grey lighten-2"
                              >
                                <template v-slot:placeholder>
                                  <v-row
                                    class="fill-height ma-0"
                                    align="center"
                                    justify="center"
                                  >
                                    <v-progress-circular
                                      indeterminate
                                      color="grey lighten-5"
                                    ></v-progress-circular>
                                  </v-row>
                                </template>
                              </v-img>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
              <!-- {{ messages.iContentS.length }} -->
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
    <br>
  </div>
</template>
<script>
import bus from "@/tool/EventBus.js";
import { ImagePreview } from "vant";
import { getpostallAPI } from "@/API/bbs/index";
export default {
  data() {
    return {
      data: {},
      panel: [0], //控制打开
      messages: [
        {
          new: "关注",
          color: "pink",
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          title: "Welcome to Vuetify.js!", //内容
        },
      ],
      // messages.iContentS.length
      // lorem:this.messages.iContentS
    };
  },

  methods: {
    async getpostall(id) {
      let { data } = await getpostallAPI(0, id, 0);
      this.messages.iContentS = data.BlogDetail[0].iContent;
    },
    //预览图片
    getImg(items, i) {
      ImagePreview({
        images: [items.src],
        showIndex: true,
        loop: false,
        startPosition: i,
        maxZoom: 10,
        closeable: true,
      });
    },
  },
  created() {
    bus.$on("emittitleandav", (ID, props, data) => {
      this.messages = { ...this.messages, ID, ...props, ...data };
      // 减轻服务器压力
      if (props.iContent.length > 200) {
        this.getpostall(ID);
      }
    });
  },
  updated() {
    this.$emit("commentOnTheData", this.messages);
  },
};
</script>
<style lang="less" scoped>
</style>