const fs = require('fs');
const express = require('express');

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');


const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);  // add this one, because middleware run in sequen ,middleware after this are protected.

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe);

router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;

// call express for use
// rename router var
// export module