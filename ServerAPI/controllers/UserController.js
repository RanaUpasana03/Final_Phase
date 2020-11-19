const User = require('../models/UserModel')
const db = require('../DB')
const jwt = require('jsonwebtoken')

exports.register = function (req, res) {
  const { username, email, password, passwordConfirmation, firstname, lastname, addressline1, city, zipcode, state} = req.body
  if (!email || !password) {
    return res.status(422).json({ 'error': 'Please provide email or password' })
  }

  if (!firstname || !lastname || !addressline1  || !city || !state || !zipcode){
    return res.status(422).json({ 'error': 'Please fill in all the fields' })
  }

  if (password != passwordConfirmation) {
    return res.status(422).json({ 'error': 'Password does not match' })
  }
  User.findOne({ email }, function (err, existingUser) {
    if (err) {
      return res.status(422).json({ 'error': 'Oops! Something went Wrong' })
    }
    if (existingUser) {
      return res.status(422).json({ 'error': 'User already exists' })
    }
    else {
      const user = new User({
        username, email, password, passwordConfirmation, firstname, lastname, addressline1, city, zipcode, state
      })

      user.save(function (err) {
        if (err) {
          return res.status(422).json({
            'error': 'Oops! Something went wrong'
          })
        }
        return res.status(200).json({ 'registered': true })
      })
    }
  })
 }
 exports.findById = function(req, res){

     User.findById(req.params.id, (err, user)=>{
         if(err)throw err;
         res.send(user);
     })

 }
 
exports.login = function (req, res) { 
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).json({ 'error': 'Please provide email or password' })
  }
  User.findOne({ email }, function (err, user) {
    if (err) {
      return res.status(422).json({
        'error': 'Oops! Something went wrong'
      })
    }

    if (!user) {
      return res.status(422).json({ 'error': 'Invalid user' })
    }

    if (user.hasSamePassword(password)) {
      json_token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          /*email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          addressline1: user.addressline1,
          addressline2: user.addressline2,
          city: user.city,
          state: user.state,
          zipcode: user.zipcode*/
        },
        db.secret,
        { expiresIn: '1h' })

      return res.json(json_token)
    }
    else {
      return res.status(422).json({ 'error': 'Wrong email or password' })
    }
  })
}

exports.authMiddleware = function (req, res, next) {
  const json_token = req.headers.authorization
  try {
    if (json_token) {
      const user = parseToken(json_token)
      User.findById(user.userId, function (err, user) {
        if (err) {
          return res.status(422).json({
            'error': 'Oops! Something went wrong'
          })
        }
        if (user) {
          res.locals.user = user
          next()
        }
        else {
          return res.status(422).json({ 'error': 'Not authorized user' })
        }
      })
    }
    else {
      return res.status(422).json({ 'error': 'Not authorized user' })
    }
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err
    })
  }
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], db.secret)
}