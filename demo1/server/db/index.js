const mongoose = require('mongoose')

module.exports = {
  open() {
    return mongoose.connect('mongodb://127.0.0.1:27017/codingTest1')
    .then(() => {
      console.log('数据库链接成功')
    })
    .catch(err => {
      console.log('数据库链接失败', err)
    })
  },
  close () {
    return  mongoose.connection.close()
  }
}