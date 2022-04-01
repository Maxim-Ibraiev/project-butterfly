import { model, Schema } from 'mongoose'

const ShoppingBagSchema = new Schema({
  userId: {
    type: String,
    required: [true, 'User id is required'],
  },
  selectedProducts: {
    type: [{ id: String, selectedSize: Number }],
    require: [true, 'selectedProducts is required'],
  },
})

const ShoppingBag = model('shopping-bag', ShoppingBagSchema)

export default ShoppingBag
