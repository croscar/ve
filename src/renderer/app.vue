<template>
    <div id="app" class="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
    name: 've',
      data () {
        return {
          theme: this.$store.state.app.themeColor
        }
  },
      mounted () {

      },
      beforeDestroy () {

      },
      methods: {

      }
    }
</script>

<style>
html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 100%;
}
</style>
