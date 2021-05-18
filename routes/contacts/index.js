
const express = require('express')
const router = express.Router()
const {
  validationCreateContact,
  validationUpdateContact,
  validationObjectId,
  validationUpdateStatusContact,
  validationQueryContact,
} = require('./valid-contact-router')
//const handleError = require('../../helper/handle-error')
const guard = require('../../helper/guard')
const role = require('../../helper/role')
const { Subscription } = require('../../helper/constants')
const cntrl = require('../../controllers/contacts')


router
  .get('/', guard, validationQueryContact, cntrl.getAll)
  .post('/', guard, validationCreateContact, cntrl.create)

router.get('/pro', guard, role(Subscription.PRO), cntrl.onlyPro)
router.get('/business', guard, role(Subscription.BUSINESS), cntrl.onlyBusiness)

router
  .get('/:contactId', guard, validationObjectId, cntrl.getById)
  .put('/:contactId', guard, validationUpdateContact, cntrl.update)
  .delete('/:contactId', guard, cntrl.remove)

router.patch('/:contactId/favorite', guard,
validationUpdateStatusContact,
cntrl.updateStatus,
)

module.exports = router






