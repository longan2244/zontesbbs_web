<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-form ref="form" v-model="form" class="pa-4 pt-6">
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          label="标题(可选)"
          solo
          dense
          v-model="title"
        ></v-text-field>
      </v-col>
      <v-textarea
        v-model="bio"
        auto-grow
        filled
        color="deep-purple"
        :rules="[rules.required]"
        label="内容"
        rows="7"
        autofocus
      ></v-textarea>
      <v-checkbox
        v-model="agreement"
        :rules="[rules.required]"
        color="deep-purple"
      >
        <template v-slot:label>
          我同意&nbsp;
          <a href="#" @click.stop.prevent="dialog = true">社区准则</a>
        </template>
      </v-checkbox>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="$refs.form.reset()"> Clear </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
        @click="sendtext"
        >提交</v-btn
      >
    </v-card-actions>
    <v-dialog v-model="dialog" absolute max-width="400" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-3">Legal</v-card-title>
        <v-card-text> 用户条款 </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text @click="(agreement = false), (dialog = false)">
            No
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            color="deep-purple accent-4"
            @click="(agreement = true), (dialog = false)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    agreement: true,
    bio: "", //评论内容
    title: "", //标题
    dialog: false,
    form: false,
    isLoading: false,
    rules: {
      required: (v) => !!v || "This field is required",
    },
  }),

  methods: {
    sendtext() {
      if (this.$route.fullPath == "/demo") {
        this.$emit("sendtextmp4text", { bio: this.bio, title: this.title });
      } else {
      }
      this.$emit("sendtext", { bio: this.bio, title: this.title });
    },
  },
};
</script>


//       items: [
//         { header: '可选话题' },
//         {
//           text: '350M',
//           color: 'green',
//         },
//                 {
//           text: '310M',
//           color: 'purple',
//         },
//         {
//           text: '350S',
//           color: 'blue',
//         },
//         {
//           text: '350E',
//           color: 'indigo',
//         },
//         {
//           text: '350D',
//           color: 'orange',
//         },
//         {
//           text: '350X',
//           color: 'cyan',
//         },
//         {
//           text: '350R',
//           color: 'blue',
//         },
//         {
//           text: '350V',
//           color: 'teal',
//         },
//         {
//           text: '350T',
//           color: 'pink',
//         },
//         {
//           text: 'GK350',
//           color: 'red',
//         },

//         {
//           text: '310V',
//           color: 'black',
//         },
//         {
//           text: '310T',
//           color: 'blue',
//         },
//         {
//           text: '310R',
//           color: 'blue',
//         }
// ,
//         {
//           text: '310X',
//           color: 'blue',
//         },
//         {
//           text: 'ZT250',
//           color: 'blue',
//         }
//       ],