<template>
  <div>
    <div id="app">
         <router-view/>
    </div>
  </div>

</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
html {
  font-family: 'PingFangSC-Regular', 'Source Han Sans CN', sans-serif;
  word-break: break-word;
  width: 100%;
  height: 100%;
}
body {
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
