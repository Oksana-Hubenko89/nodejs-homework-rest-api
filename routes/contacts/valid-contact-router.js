const Joi = require('joi')
const mongoose = require('mongoose')

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().optional(),
})
const schemaQueryContact = Joi.object({
  sortBy: Joi.string().valid('name', 'age', 'id').optional(),
  sortByDesc: Joi.string().valid('name', 'age', 'id').optional(),
  filter: Joi.string().optional(),
  limit: Joi.number().integer().min(1).max(50).optional(),
  offset: Joi.number().integer().min(0).optional(),
  favorite: Joi.boolean().optional(),
}).without('sortBy', 'sortByDesc')

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or('name', 'email', 'phone')

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    //console.log(err)
    
    if (err.name === 'ValidationError' && err.message.includes('phone with value')) {
      next({ status: 400, message: 'phone number must match the pattern (xxx) xxx-xxxx' })
    }

    if (err.name === 'ValidationError' && err.message.includes('email')) {
      next({ status: 400, message: 'email is not valid' })
    }

    next({ status: 400, message: err.message.replace(/"/g, "'") })
  }
}

module.exports = {
  validationQueryContact: async (req, res, next) => {
    return await validate(schemaQueryContact, req.query, next)
  },
  validationCreateContact: async (req, res, next) => {
    if(!req.body){
      return res.status(400).json({"message": "missing field favorite"})
    }
    return await validate(schemaCreateContact, req.body, next)
  },
  validationUpdateContact: async (req, res, next) => {
    return await validate(schemaUpdateContact, req.body, next)
  },
  validationObjectId: async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next({ status: 400, message: 'Invalid Object Id' })
    }
    next()
  },
    validationUpdateStatusContact: async (req, res, next) => {
      return await validate(schemaUpdateStatusContact, req.body, next)
    },
  }
