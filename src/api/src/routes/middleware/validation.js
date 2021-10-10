const Joi = require('joi')

const images = Joi.array().items(
  Joi.object({
    original: Joi.string().min(1).max(999),
    thumbnail: Joi.string().min(1).max(999),
    color: Joi.array().min(1).max(99),
  })
)

const product = Joi.object({
  images,
  title: Joi.string().min(3).max(1000).required(),
  description: Joi.string().min(3).max(1000).required(),
  category: Joi.string().min(3).max(999).required(),
  price: Joi.number().min(1).max(999999),
  color: Joi.string().min(3).max(1000),
  model: Joi.string().min(3).max(1000),
  size: Joi.object().max(999),
  material: Joi.array().min(1).max(99),
  season: Joi.string().min(3).max(999),
  popularity: Joi.number().min(-999).max(999999),
})

const updateProduct = Joi.object({
  images,
  title: Joi.string().min(3).max(1000),
  description: Joi.string().min(3).max(1000),
  material: Joi.array(),
  price: Joi.number().min(1).max(999999),
  color: Joi.string().min(3).max(1000),
  model: Joi.string().min(3).max(1000),
  size: Joi.object().max(999),
  category: Joi.string().min(3).max(999),
  season: Joi.string().min(3).max(999),
  popularity: Joi.number().min(-999).max(999999),
})

module.exports = { product, updateProduct }
