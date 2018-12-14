<template>
  <div>
    <scroll class="list-content">
      <div>
        <div>
          <h1 class="title">
            分享列表
          </h1>
          <div class="head_time">
            <div v-for="(item,index) in contentArr" :key="index" class="shareContainer">
              <span class="flexItem">{{item.NAME}}</span>
              <span class="flexItem">{{parmsDate}}</span>
              <span class="flexItem">
                <button @click="shareNews(item,index)" class="wxShare_button">点击进入</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
/* eslint-disable */
import scroll from 'components/scroll/scroll'
import { shareUrl } from 'common/js/common.js'
import Lockr from 'lockr'
Lockr.prefix = 'lockr_';
export default {
  data() {
    return {
      newList: '',
      contentArr: [],
      parmsDate: window.location.href.split('=')[1]
    }
  },
  created() {
    Lockr.flush();
    this.getWxShare()
  },
  methods: {
    getWxShare() {
      this.$http
        .get(`${shareUrl}/young/code/getPartyList.do`, {
          params: {
            date: window.location.href.split('=')[1]
          }
        })
        .then(response => {
          this.contentArr = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    shareNews(item, index) {
      let date = window.location.href.split('=')[1]
      this.$router.push({
        path:'/newList',
        query:{
          data:date,
          name:item.Name,
          index:index
        }
      })
    }
  },
  components: {
    scroll
  }
}
</script>
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
.head_time {
  font-size: 0.28rem;
  text-align: center;
  padding: 0 0.12rem;
}
.shareContainer {
  border-bottom: 1px solid #e0e0e0;
  padding: 0.12rem 0;
  display: flex;
}
.flexItem {
  flex: 1;
}
.shareContainer span {
  margin-left: 0.22rem;
}
.wxShare_button {
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 0.01rem solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  margin-left: 0.12rem;
  padding: 0.12rem 0.2rem;
  font-size: 0.26rem;
  border-radius: 0.04rem;
  background: #409eff;
  color: white;
}
</style>
