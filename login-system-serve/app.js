// 1.1 导入express模块
const express = require('express')
// 2.1 导入路由模块
const router = require('./router/manageLogin.js')
// 3.1 导入解决跨域问题的中间件
const cors = require('cors')

// 1.2 创建服务器
const app = express()
// 3.2 配置解决跨域问题的中间件
app.use(cors())
// 4.1 解析post传过来的数据
app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
// 配置响应函数中间件
app.use(function (req, res, next) {
  res.ss = function (err, status = 1) {
    res.send({
      status,
      msg: err instanceof Error ? err.message : err
    })
  }
  next()
})
// 2.2 配置路由中间件
app.use(router)

// 1.3  启动服务器
app.listen('80', () => {
  console.log('服务器已经启动！')
})
