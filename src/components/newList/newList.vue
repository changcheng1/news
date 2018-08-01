<template>
  <div class="container">
    <header>
      <div>地素时尚舆情简报</div>
    </header>
    <div class="top_menu_list">
      <a v-for="(item,index) in headerList" :key="index" @click="headerCli(index,item.id)" :class="{'current':myIndex===index+1}" class="header_item">{{item.name}}</a>
    </div>
    <div>
      <scroll class="wrapper" :listenScroll="true" ref="wrapper" @scroll="scroll" :probeType="2">
        <div>
          <div class="wrap" v-for="(item,index) in newList" :key="index" @click="gotoDetail(item)">
            <div class="inner_header">
              <span>{{item.HEADER}}</span>
            </div>
            <div>
              <div class="inner_content">【{{item.SOURCE}}】</div>
              <div class="inner_from">{{item.CONTENT}}</div>
            </div>
            <div class="inner_footer">
              <span class="inner_time">{{item.CREATED_TIME}}</span>
              <span class="inner_all">阅读全文</span>
            </div>
            <loading v-if="loadingBmShow && index === newList.length-1" :title="title" :loadingShow="loadingShow"></loading>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import scroll from 'components/scroll/scroll'
import { url, shareUrl } from 'common/js/common.js'
import loading from 'components/loading/loading'
export default {
  data() {
    return {
      myIndex: 1,
      loadingBmShow: false,
      newList: [],
      headerTitle: '',
      title: '正在载入...',
      wxList: {},
      currentPage: 1,
      showCount: 4,
      loadingShow: true,
      wxShare: {},
      headerList: [
        {
          name: '公司新闻 ',
          id: '1'
        },
        // {
        //   name: '同业新闻 ',
        //   id: '2'
        // },
        {
          name: '行业新闻 ',
          id: '2'
        },
        {
          name: '资本市场新闻 ',
          id: '3'
        }
      ]
    }
  },
  created() {
    let self = this
    // 获取配置的wx标题和img图片
    this.getShareList().then(response => {
      self.wxList = response[self.$route.params.index].title
      self.headerTitle = response[self.$route.params.index].title
      // 微信链接配置
      self.WXconfig.wxShowMenu(response[self.$route.params.index])
      // 获取主页的新闻列表
      self.getListJson('1', response[self.$route.params.index])
    })
  },
  methods: {
    headerCli(index, id) {
      this.myIndex = Number(id)
      this.currentPage = 1
      this.getListJson(this.myIndex).then(function() {
        this.$refs.wrapper.refresh()
      })
    },
    getShareList() {
      let self = this
      return new Promise((resolve, reject) => {
        this.$http
          .get(`${shareUrl}/young/code/getPartyList.do`, {})
          .then(function(response) {
            self.contentArr = response.data
            resolve(response.data)
          })
          .catch(function(error) {
            console.log(error)
          })
      })
    },
    getListJson(id, item) {
      var that = this
      return new Promise((resolve, reject) => {
        this.$http
          .post(`${shareUrl}/young/code/getList.do`, {
            Type: id,
            currentPage: 1,
            showCount: 4,
            date: this.$route.params.date,
            partya: this.$route.params.name
          })
          .then(function(response) {
            that.newList = response.data
          })
      })
    },
    scroll() {
      this.currentPage++
      this.loadingBmShow = true
      var that = this
      return new Promise((resolve, reject) => {
        this.$http
          .post(`${shareUrl}/young/code/getList.do`, {
            Type: this.myIndex,
            currentPage: this.currentPage,
            showCount: this.showCount,
            date: this.$route.params.date,
            partya: this.$route.params.name
          })
          .then(function(response) {
            if (!response.data.length) {
              that.title = '暂无数据...'
              that.loadingShow = false
              setTimeout(function() {
                that.loadingBmShow = false
              }, 2000)
              that.$nextTick(() => {
                that.$refs.wrapper.refresh()
              })
            } else {
              that.newList = that.newList.concat(response.data)
              setTimeout(function() {
                that.loadingBmShow = false
              }, 2000),
                // 在下次视图更新之后再调用
                that.$nextTick(() => {
                  that.$refs.wrapper.refresh()
                })
            }
          })
          .catch(function(error) {
            console.log(error)
            that.title = '加载失败...'
            that.loadingBmShow = false
          })
      })
    },
    gotoDetail(item) {
      if (item.URL != '') {
        window.location.href = item.URL
      } else {
        this.$router.push({
          path: `/newDetail/${item.NEWS_ID}`
        })
      }
    }
  },
  components: {
    scroll,
    loading
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
header {
  width: 100%;
  height: 0.88rem;
  /* background-image: url('./assets/img/header.png'); */
  background-size: 100% 100%;
  text-align: center;
  line-height: 0.88rem;
  font-size: 0.3rem;
  color: black;
  position: fixed;
  top: 0;
}
header div:nth-child(1) {
  font-weight: 800;
  font-size: 0.3rem;
}
header div:nth-child(2) {
  background: #558ed5;
  color: white;
}
.top_menu_list {
  height: 0.6rem;
  width: 100%;
  font-size: 0.28rem;
  line-height: 0.6rem;
  position: fixed;
  top: 0.88rem;
  text-align: center;
}
.top_menu_list a {
  padding: 0.08rem 0.06rem;
  text-decoration: none;
  border: 1px solid #558e65;
  margin-left: 0.12rem;
  color: #558ed5;
}

.current {
  background: #558ed5;
  color: white !important;
}

.wrapper {
  position: fixed;
  z-index: 1;
  top: 1.6rem;
  bottom: 0.01rem;
  left: 0;
  width: 100%;
  overflow: hidden;
}

.wrap {
  padding: 0.4rem 0.2rem;
  margin: 0 auto;
  border-bottom: 1px solid #e0e0e0;
}

.inner_header {
  font-size: 0.28rem;
  padding-bottom: 0.1rem;
  text-align: justify;
  font-weight: 800;
}

.inner_footer {
  color: rgb(155, 158, 163);
  padding-bottom: 0.2rem;
  font-size: 0.28rem;
  margin-top: 0.2rem;
}
.inner_header {
  font-size: 0.3rem;
  padding-bottom: 0.1rem;
  text-align: justify;
}
.inner_content {
  font-size: 0.3rem;
  font-weight: 800;
}
.inner_from {
  font-size: 0.3rem;
  margin-top: 0.2rem;
}
.inner_time {
  float: left;
  color: black;
  font-weight: 800;
}
.inner_all {
  float: right;
  color: black;
  font-weight: 800;
}
</style>
