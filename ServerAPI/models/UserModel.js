const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
mongoose.pluralize(null);

const UserSchema = new Schema({

    firstname: {
        type: String,
        min: [10, 'Too long, min 10 characters are required'],
        lowercase: true,
        unique: true,
        requirement:'FirstName is required!'
    },

    lastname: {
        type: String,
        min: [10, 'Too long, min 10 characters are required'],
        lowercase: true,
        unique: true,
        requirement:'FirstName is required!'
    },

  username: {
    type: String,
    min: [4, 'Too short, min 4 characters are required'],
    lowercase: true,
    unique:true,
    required:'Username is required!'
  },
  email: {
    type: String,
    min: [4, 'Too short, min 4 characters are required'],
    max: [32, 'Too long, max 16 characters are required'],
    lowercase: true,
    unique: true,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    min: [4, 'Too short, min 4 characters are required'],
    required: 'Password is required'
  },
  passwordConfirmation: {
    type: String,
    min: [4, 'Too short, min 4 characters are required'],
   
  },
  addressline1: {
      type: String,
      required: true,
      max: [40, 'Please enter minimum 40 character only']
  },
  city:{
      type: String,
      required: true,
      max: [10, 'Min 10 characters are required']
  },
  state: {
      type: String,
      required: true,
      max: [2, 'Please enter two character only']
  },
  zipcode: {
    type: String,
    required: true,
    max: [5, 'Please enter min 5 character']
  }

});

UserSchema.pre('save', function (next) {
  const user = this
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return res.status(422).json({
        'error': 'There is an error while gensalt hash'
      })
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return res.status(422).json({
          'error': 'There is an error while password hash'
        })
      }
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.hasSamePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)