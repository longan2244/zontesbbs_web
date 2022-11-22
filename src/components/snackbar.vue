<template>
          <v-snackbar
      v-model="snackbar"
      absolute
      bottom
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click.stop="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
  export default {
    data: () => ({
      snackbar: false,
      text: 'Hello, I\'m a snackbar',
    }),
    methods: {
      prinsnackbar(str,flag){
           this.text = str;
           this.snackbar=flag;
      }
    },
  }
</script>

<style lang="less" scoped>
</style>