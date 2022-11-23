// 1.1 导入express模块
const express = require('express')
// 2.1 导入路由处理函数模块
const manage_handler = require('../router_handler/manageLogin.js')
// 1.2 创建路由模块
const router = express.Router()
// 2.2 登录验证是否为管理员
router.post('/login', manage_handler.manageLogin)
// 2.3 获取用户管理信息
router.get('/userInfo', manage_handler.getUserInfo)
// 2.4 添加用户管理信息
router.post('/addUser', manage_handler.addUser)
// 2.5 更新用户信息
router.post('/updateUser', manage_handler.updateUser)
// 2.6 删除用户
router.post('/deleteUser', manage_handler.deleteUser)
// 2.7 搜索用户信息
router.get('/search', manage_handler.searchUser)
// 1.3 向外共享路由模块
module.exports = router
