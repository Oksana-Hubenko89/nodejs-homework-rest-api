const express = require('express')
const router = express.Router()
const cntrl = require('../../controllers/users')
const guard = require('../../helper/guard')
const uploadAvatar = require('../../helper/upload-avatar')
//const rateLimit = require('express-rate-limit')
const {
  validationUserData
} = require('./valid-user-router')

router.post('/signup',validationUserData, cntrl.reg)
router.post('/login',validationUserData, cntrl.login)
router.post('/logout', guard, cntrl.logout)
router.patch(
  '/avatars',
  guard,
  uploadAvatar.single('avatar'),
  cntrl.updateAvatar,
)
router.get('/current', guard, cntrl.current)


router.get('/verify/:verificationToken',cntrl.verify)
router.post('/verify', cntrl.repeatEmailVerify)


module.exports = router