const Joi = require('joi')

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().optional(),
})

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
    console.log(err)
    next({ status: 400, message: err.message.replace(/"/g, "'") })
  }
}

module.exports = {
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
