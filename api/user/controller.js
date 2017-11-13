const { json } = require('server/reply')
const bcrypt = require('bcrypt')
const User = require('../../model/User')

module.exports = {
  getUsers: async ctx => {
    let users = await User.find({})
    return json(users)
  },

  getUser: async ctx => {
    try {
      return json(await User.findById(ctx.params.id))
    } catch (err) {
      return json(err)
    }
  },

  newUser: async ctx => {
    newUser = new User(ctx.data)
    newUser.password = await bcrypt.hash(newUser.password, 10)
    try{
      return json(await newUser.save())
    } catch(err) {
      return json(err)
    }
  },

  updateUser: async ctx => {
    let user = await User.findById(ctx.params.id)
    user.username = ctx.data.username
    try {
      return json(await user.save())
    } catch (err) {
      return json(err)
    }
  },

  dropUser: async ctx => {
    try {
      await User.findById(ctx.params.id).remove()
    } catch(err) {
      return json(err)
    }
    return json("OK")
  }
}
