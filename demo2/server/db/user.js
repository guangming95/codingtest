const { User } = require('./models')

module.exports = class UserClass {
  getUserList = async () => {
    const userList = await User.find()
    return { code: 200, data: userList, msg: 'success' }
  }
}
