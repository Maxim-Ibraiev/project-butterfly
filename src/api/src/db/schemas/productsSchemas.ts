/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { model, Schema } from 'mongoose'

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    model: {
      type: String,
    },
    color: {
      type: String,
    },
    category: {
      type: String,
    },
    images: {
      type: [{ original: String, thumbnail: String, color: [String] }],
      require: [true, 'Image is required'],
    },
    season: {
      type: String,
    },
    size: {
      type: Object,
      default: {},
    },
    material: {
      type: [String],
      default: [],
    },
    popularity: {
      type: Number,
      default: 0,
    },
  },
  {
    bufferTimeoutMS: 60000,
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id
        delete ret._id
        ret.images.map(el => delete el._id)
      },
    },
  }
)

export default model('products', productSchema)
