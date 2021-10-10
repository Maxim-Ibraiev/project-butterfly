/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { Schema } from 'mongoose'

export const categoriesSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, 'Set categories for config'],
    },
  },
  {
    versionKey: false,
    timestamps: false,
    toJSON: {
      virtuals: true,
      transform(doc, red) {
        delete red._id

        return red
      },
    },
  }
)

categoriesSchema.virtual('id').get(function () {
  return this._id
})

export default categoriesSchema
