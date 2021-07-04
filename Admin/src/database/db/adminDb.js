const mongoose = require('mongoose')
const userSchema=require('../Model/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Connectiing to mongoose
const con4=mongoose.createConnection('mongodb+srv://SwargamTest:Swargam123@cluster0.izarr.mongodb.net/AdminData?retryWrites=true&w=majority', {
 useNewUrlParser: true,
 useCreateIndex: true,
 useUnifiedTopology: true
})
con4.then(()=>{
  console.log(`connection to admin database established`)
}).catch(err=>{
  console.log(`db error ${err.message}`);
  process.exit(-1)
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_TOKEN)

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
      throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
      throw new Error('Unable to login')
  }

  return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const  User= con4.model('User', userSchema)
module.exports=User