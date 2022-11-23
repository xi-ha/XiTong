// 1.1 导入数据库模块
const db = require('../db/index')
// 1.2 管理员登录验证
exports.manageLogin = (req, res) => {
  const manageInfo = req.body
  // 连接数据库判断管理员是否存在
  const sql = 'select * from login_system.manage where username=? and password=?'
  db.query(sql, [manageInfo.username, manageInfo.password], (err, results) => {
    if (err) return res.ss(err)
    if (results.length !== 1) return res.ss('您还不是管理员！')
    res.ss('登录成功', 0)
  })
}
// 1.3 获取用户管理信息
exports.getUserInfo = (req, res) => {
  // 计算数据库总条数
  const sql = 'select count(*) as total from login_system.user'
  db.query(sql, (err, results) => {
    if (err) return res.ss(err)
    if (results.length === 0) return res.ss('没有用户信息')
    const pageTotal = results[0].total //总条数
    const pageRow = Math.ceil(pageTotal / req.query.pageSize) //总页数
    // console.log(pageRow) pageSize是每页条数
    const start = req.query.pageSize * (req.query.pageNo - 1) //从哪里开始 pageNo是页码数
    // console.log(req.query.pageSize)
    // 获取指定页面的用户信息
    const sql = `select * from login_system.user limit ?,?`
    //·················req.query.pageSize得到的是字符串，需要将其转为数字类型
    db.query(sql, [start, parseInt(req.query.pageSize)], (err, results) => {
      if (err) return res.ss(err)
      res.send({
        status: 0,
        message: '获取用户信息成功',
        data: results,
        pageTotal: pageTotal,
        pageRow: pageRow
      })
    })
  })
}
// 1.4 添加用户管理信息
exports.addUser = (req, res) => {
  // 将新用户数据存入userInfo中
  const userInfo = req.body
  // 将新用户存入数据库中
  const sql = 'insert into login_system.user set ?'
  db.query(sql, userInfo, (err, results) => {
    if (err) return res.ss(err)
    if (results.affectedRow < 1) return res.ss('insert语句执行失败')
    res.ss('添加用户信息成功', 0)
  })
}
// 1.5 更新用户信息
exports.updateUser = (req, res) => {
  // 将更新的数据存储到updataInfo中
  const updataInfo = req.body
  // 连接数据库更新用户信息
  const sql = `update login_system.user set ? where id=?;`
  db.query(sql, [updataInfo, updataInfo.id], (err, results) => {
    if (err) return res.ss(err)
    if (results.affectedRow < 1) return res.ss('更新用户信息失败！')
    res.ss('更新用户信息成功', 0)
    // res.send({
    //   status: 0,
    //   message: '更新用户信息成功！',
    //   data: results
    // })
  })
}
// 1.6 删除用户
exports.deleteUser = (req, res) => {
  const sql = `delete from login_system.user where id=?;`
  db.query(sql, req.query.id, (err, results) => {
    if (err) return res.ss(err)
    if (results.length === 1) return res.ss('删除用户失败!')
    res.ss('删除用户成功！', 0)
  })
}
// 1.7 搜索用户信息
exports.searchUser = (req, res) => {
  const sql = `select * from login_system.user where name = ?`
  db.query(sql, req.query.search, (err, results) => {
    if (err) return res.ss(err)
    if (results.length !== 1) return res.ss('不存在此用户')
    res.send({
      status: 0,
      message: '搜索用户成功！',
      data: results
    })
  })
}
