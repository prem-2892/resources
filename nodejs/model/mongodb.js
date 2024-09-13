import mongoose from 'mongoose'

// Define a schema for a sample "User" model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Prevent model re-compilation if already defined
const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
