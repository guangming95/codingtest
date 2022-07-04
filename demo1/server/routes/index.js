const router = require('koa-router')()
const UserClass = require('./../db/user')
const TaskClass = require('./../db/task')

router.get('/', async (ctx, next) => {
  ctx.body = { code: 0, msg: "success." }
})
// 获取用户列表
router.get('/api/userList', async (ctx, next) => {
  const user = new UserClass()
  const result = await user.getUserList()
  ctx.body = result
})
// 获取任务列表
router.post('/api/taskList', async (ctx, next) => {
  const task = new TaskClass()
  const result = await task.getTaskList(ctx.request.body)
  ctx.body = result
})
// 任务排序接口
router.post('/api/setTaskSort', async (ctx, next) => {
  const task = new TaskClass()
  const result = await task.setTaskSort(ctx.request.body)
  ctx.body = result
})

module.exports = router
