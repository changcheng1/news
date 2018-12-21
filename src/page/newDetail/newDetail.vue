<template>
  <div>
    <scroll class="list-content" :data="contentArr">
      <div>
        <div>
          <h1 class="title">
            {{newList.HEADER}}
          </h1>
          <div class="head_time">{{newList.CREATED_TIME}}</div>
          <div v-html="newList.CONTENT">
          </div>
          <!-- <p v-for="(item,index) in contentArr" :key="index">
            {{item}}
          </p> -->
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
/* eslint-disable */
import scroll from 'components/scroll/scroll'
import { url } from 'common/js/common.js'
export default {
  data() {
    return {
      newList: '',
      contentArr: []
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      var that = this
      this.$http
        .get(`${url}detail.do`, {
          params: {
            id: this.$route.query.id
          }
        })
        .then(function(response) {
          // response.data.CONTENT = response.data.CONTENT.replace(/\s+/g, '')
          that.newList = response.data
          that.contentArr = that.newList.CONTENT.split('。')
        })
    }
  },
  components: {
    scroll
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.title {
  font-size: 0.34rem;
  padding: 0.15rem 0 0.16rem;
  font-family: PingFangSC-Semibold;
  color: #3f4146;
  -webkit-letter-spacing: 0;
  -moz-letter-spacing: 0;
  -ms-letter-spacing: 0;
  letter-spacing: 0;
  font-weight: 600;
  text-align: center;
}
p {
  font-size: 0.26rem;
  padding: 0rem 0.124rem 0 0.124rem;
}
.head_time {
  font-size: 0.34rem;
  color: rgb(155, 158, 163);
  padding-left: 0.2rem;
}
.list-content {
  position: fixed;
  z-index: 1;
  top: 0rem;
  bottom: 0.01rem;
  left: 0;
  width: 100%;
  overflow: hidden;
}
p {
  font-size: 0.32rem;
}
</style>
