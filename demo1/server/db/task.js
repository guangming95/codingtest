const { Task } = require('./models')

module.exports = class TaskClass {
  // 获取任务列表、当前人列表
  getTaskList = async (data) => {
    let query = {}
    if (data.type === 'Name' && data.By_who) {
      query = {
        By_who: data.By_who
      }
    } else if (data.type === 'Email' && data.Email) {
      query = {
        Email: data.Email
      }
    }
    const temp = await Task.find(query)
    const taskList = temp.sort(function(a, b) { return a.Priority - b.Priority })
    const result = [[], [], []]
    taskList.forEach(item => {
      result[item.Stage - 1].push(item)
    })
    return { code: 200, data: result, msg: 'success' }
  }
  // 设置排序
  setTaskSort = async (data) => {
    for (const item of data) {
      await Task.findOneAndUpdate({ _id: item._id },
      { Priority: item.Priority });
    }
    return { code: 0, msg: 'success' };
  }
}
