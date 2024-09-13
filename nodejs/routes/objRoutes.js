import express from 'express'
import { protect, adminCheck } from './../middlerware/authMiddleware.js'
import {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'

const router = express.Router()

router
  .route('/')
  .post(protect, adminCheck, registerUser)
  .get(protect, adminCheck, getAllUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .get(protect, adminCheck, getUserById)
  .delete(protect, adminCheck, deleteUser)
  .put(protect, adminCheck, updateUser)

// this id parameter can be accessed by calling req.params.id
// .method(middlewareFunc, controller)

export default router
