import Joi from 'joi'

export const idValidation = Joi.string().required().min(24).max(24)

export const shoppingBagValidation = Joi.object({
  selectedProducts: Joi.array()
    .required()
    .items(Joi.object({ selectedSize: Joi.number().min(0).max(99), id: idValidation })),
})
