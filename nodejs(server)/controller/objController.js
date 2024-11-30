// controller here
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @desc   Auth USER & and get TOKEN
// @Route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // res.json({user: dbUser})
  // or throw new Error('Invalid Username or Password')
})
