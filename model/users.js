const User = require('./schemas/user')

const findById = async (id) => {
  return await User.findOne({ _id: id })
}

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const findByVerifyTokenEmail = async (verificationToken) => {
  return await User.findOne({verifyToken:verificationToken})
}

const create = async (userOptions) => {
  const user = new User(userOptions)
  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

const updateAvatar = async (id, avatar, idCloudAvatar = null) => {
  return await User.updateOne({ _id: id }, { avatar, idCloudAvatar })
}

const updateVerifyToken = async (id, verify, verifyToken) => {
  return await User.updateOne(
    { _id:id },
    { verify, verifyToken },
  )
}

module.exports = {
  findById,
  findByEmail,
  findByVerifyTokenEmail,
  create,
  updateToken,
  updateAvatar,
  updateVerifyToken,
}