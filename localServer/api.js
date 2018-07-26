//存放后端管理api以及通用／上传api
const express = require('express')
const router = express.Router()
const fs = require('fs')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
const session = require('express-session')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const axios = require('axios')
app.use(cookieParser())
//mysql连接信息配置 
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "572788",
  database: "user",
  port: '3306'
})
connection.connect();
router.post('/api/login', function (req, res, next) {
  let resBody = {
    state: ''
  }
  const username = req.body.username
  const password = req.body.password
  console.log("username:" + username);
  connection.query("SELECT * FROM user WHERE username = ?", [username], (err, doc) => {
    if (err) {
      resBody.state = '服务器内部错误'
      res.send(resBody)
    } else {
      if (doc.length == 0) {
        resBody.state = '账号不存在'
        res.send(resBody)
      } else {
        if (doc[0].password == password) {
          resBody.state = '登录成功'
          resBody.token = jwt.sign({
            foo: req.body.username
          }, 'shhhhh');
          // 设置session
          // req.session.user = doc[0].username;
          res.send(resBody);
        } else if (doc[0].password != password) {
          resBody.state = '密码错误'
          res.send(resBody);
        }
      }
    }
  })
})
router.get('/api/userlist', (req, res) => {
  fs.readFile('../static/index.text', (err, data) => {
    if (data) {
      res.send(data)
    } else {
      res.send(err)
    }
  })
})
router.get('/api/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

router.get('/api/lyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^\(\)]+})\)$/
      var matches = response.data.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})
module.exports = router
