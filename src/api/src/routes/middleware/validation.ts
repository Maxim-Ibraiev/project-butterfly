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
  myImage: Joi.array().min(2).max(10),
})

export const fileListToUpdateValidation = Joi.object({
  'image-0': Joi.array().min(1).max(1).optional(),
  'image-1': Joi.array().min(1).max(1).optional(),
  'image-2': Joi.array().min(1).max(1).optional(),
  'image-3': Joi.array().min(1).max(1).optional(),
  'image-4': Joi.array().min(1).max(1).optional(),
  'image-5': Joi.array().min(1).max(1).optional(),
})

const images = Joi.array()
  .items(
    Joi.object({
      original: Joi.string().min(1).max(999),
      thumbnail: Joi.string().min(1).max(999),
      color: Joi.array().min(1).max(99),
    })
  )
  .min(2)
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
  images: images.optional(),
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

export const receivingproductforUpdate = Joi.object({
  images: images.optional(),
  title: Joi.string().min(3).max(1000).optional(),
  description: Joi.string().min(3).max(1000).optional(),
  material: Joi.array().optional(),
  price: Joi.number().min(1).max(999999).optional(),
  color: Joi.string().min(3).max(1000).optional(),
  model: Joi.string().min(3).max(1000).optional(),
  size: Joi.object().max(999).optional(),
  globalCategory: Joi.string().min(3).max(999).optional(),
  category: Joi.string().min(3).max(999).optional(),
  season: Joi.string().min(3).max(999).optional(),
  popularity: Joi.number().min(-999).max(999999).optional(),
  id: Joi.string(),
})
