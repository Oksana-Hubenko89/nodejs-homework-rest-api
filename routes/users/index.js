const express = require('express')
const router = express.Router()
const cntrl = require('../../controllers/users')
const guard = require('../../helper/guard')
//const rateLimit = require('express-rate-limit')
const {
  validationUserData
} = require('./valid-user-router')

router.post('/signup',validationUserData, cntrl.reg)
router.post('/login',validationUserData, cntrl.login)
router.post('/logout', guard, cntrl.logout)

router.get('/current', guard, cntrl.current)

module.exports = router