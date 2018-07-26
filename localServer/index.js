const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
var config = require('../config/index')
const app = express()
var port = process.env.PORT || config.build.port
//请求跨域
// app.all('*', function (req, res, next) {
//   //   // 统一拦截请求
//   if (req.headers.origin == 'http://localhost:9000') {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Credentials", true)
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     var token = req.headers.authorization;
//     console.log(token)
//     if (token) {
//       // 验证token的有效性
//       jwt.verify(token, 'shhhhh', function (err, decoded) {
//         console.log(decoded.foo) // bar
//       });
//     }
//     next();
//   }
// })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static('../dist'))
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + 8080 + '\n')
})
