import Joi from 'joi'

export const idValidation = Joi.string().required().min(24).max(24)

export const adminLoginValidation = Joi.object({
  login: Joi.string().min(1).max(99).required(),
  password: Joi.string().min(1).max(99).required(),
})

export const shoppingBagValidation = Joi.object({
  selectedProducts: Joi.array()
    .required()
    .items(Joi.object({ selectedSize: Joi.string().min(0).max(99), id: idValidation })),
})

export const fileValidation = Joi.object({
  myImage: Joi.array().min(2).max(10),
})

const fileSchema = Joi.array()
  .items({
    filepath: Joi.string().max(300),
    mimetype: Joi.string().max(300),
    mtime: Joi.string().max(300),
    newFilename: Joi.string().max(300),
    originalFilename: Joi.string().max(300),
    size: Joi.number().max(10485760), // 10MB in binary

    _events: Joi.optional(),
    _eventsCount: Joi.optional(),
    _maxListeners: Joi.optional(),
    _writeStream: Joi.optional(),
    lastModifiedDate: Joi.optional(),
    hashAlgorithm: Joi.optional(),
    hash: Joi.optional(),
  })
  .single()

export const fileListToAddValidation = Joi.object({ images: Joi.array().items(fileSchema).min(2).max(10) })
export const fileListToUpdateValidation = Joi.object({
  'image-0': fileSchema,
  'image-1': fileSchema,
  'image-2': fileSchema,
  'image-3': fileSchema,
  'image-4': fileSchema,
  'image-5': fileSchema,
})

const imageItem = Joi.object({
  original: Joi.string().min(1).max(999),
  thumbnail: Joi.string().min(1).max(999),
  color: Joi.array().min(1).max(99),
})

const images = Joi.array().items(imageItem).min(2).max(10).required()

export const productToAddValidation = Joi.object({
  images,
  title: Joi.string().min(3).max(1000).required(),
  description: Joi.string().min(3).max(1000).required(),
  globalCategory: Joi.string().min(3).max(999).required(),
  category: Joi.string().min(3).max(999).required(),
  price: Joi.number().min(1).max(999999),
  colors: Joi.array().items(Joi.string().min(1).max(1000)),
  model: Joi.string().min(3).max(1000),
  sizes: Joi.array().items(Joi.string().min(1).max(1000)),
  material: Joi.array().min(1).max(99),
  season: Joi.string().min(3).max(999),
  popularity: Joi.number().min(-999).max(999999),
})

export const updateImage = images.min(0).optional().allow()

export const updateProductValidation = Joi.object({
  images: updateImage,
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

export const imageOptionsValidation = Joi.object({
  title: Joi.string().min(3).max(1000),
  color: Joi.array().items(Joi.string().min(1).max(1000)),
  id: Joi.array().items(Joi.string().min(0).max(9999)).single(),
  preImages: updateImage,
})
