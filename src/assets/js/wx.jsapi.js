import axios from 'axios'
import {
  shareUrl
} from 'common/js/common.js'
export default {
  wxShowMenu: function (item) {
    axios.post(`${shareUrl}/young/code/getSign.do`, {
      url: window.location.href.split('#')[0]
    }).then(function (res) {
      var getMsg = res.data;
      wx.config({
        debug: false, //生产环境需要关闭debug模式
        appId: getMsg.appid, //appId通过微信服务号后台查看
        timestamp: getMsg.timestamp, //生成签名的时间戳
        nonceStr: getMsg.nonceStr, //生成签名的随机字符串
        signature: getMsg.signature, //签名
        jsApiList: [ //需要调用的JS接口列表
          'onMenuShareTimeline', //分享给好友
          'onMenuShareAppMessage', //分享到朋友
        ]
      });
      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: item.title, // 分享标题
          desc: item.content, //分享描述
          link: window.location.href, // 分享链接
          imgUrl: item.logoUrl // 分享图标
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
          title: item.title, // 分享标题
          desc: item.content, // 分享描述
          link: window.location.href, // 分享链接
          imgUrl: item.logoUrl,
        });
      });
    })
  }
}
