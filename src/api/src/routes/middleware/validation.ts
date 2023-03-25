import Joi from 'joi'

export const idValidation = Joi.string().required().min(24).max(24)

export const adminLoginValidation = Joi.object({
  login: Joi.string().min(1).max(99).required(),
  password: Joi.string().min(1).max(99).required(),
})

export const shoppingBagValidation = Joi.object({
  selectedProducts: Joi.array()
    .required()
    .items(Joi.object({ selectedSize: Joi.number().min(0).max(99), id: idValidation })),
})

export const fileValidation = Joi.object({
  myImage: Joi.array().min(3).max(10),
})

const images = Joi.array()
  .items(
    Joi.object({
      original: Joi.string().min(1).max(999),
      thumbnail: Joi.string().min(1).max(999),
      color: Joi.array().min(1).max(99),
    })
  )
  .min(3)
  .max(10)
  .required()

export const productToAddValidation = Joi.object({
  images,
  title: Joi.string().min(3).max(1000).required(),
  description: Joi.string().min(3).max(1000).required(),
  globalCategory: Joi.string().min(3).max(999).required(),
  category: Joi.string().min(3).max(999).required(),
  price: Joi.number().min(1).max(999999),
  color: Joi.string().min(3).max(1000),
  model: Joi.string().min(3).max(1000),
  size: Joi.object().max(999),
  material: Joi.array().min(1).max(99),
  season: Joi.string().min(3).max(999),
  popularity: Joi.number().min(-999).max(999999),
})

export const updateProductValidation = Joi.object({
  images,
  title: Joi.string().min(3).max(1000),
  description: Joi.string().min(3).max(1000),
  material: Joi.array(),
  price: Joi.number().min(1).max(999999),
  color: Joi.string().min(3).max(1000),
  model: Joi.string().min(3).max(1000),
  size: Joi.object().max(999),
  globalCategory: Joi.string().min(3).max(999),
  category: Joi.string().min(3).max(999),
  season: Joi.string().min(3).max(999),
  popularity: Joi.number().min(-999).max(999999),
})
