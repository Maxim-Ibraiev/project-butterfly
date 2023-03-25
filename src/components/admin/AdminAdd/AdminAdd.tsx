import React from 'react'
import { useForm } from 'react-hook-form'
import { CATEGORIES } from '../../../constants'
import { useFilter } from '../../../customHook'
import { FilterQuery } from '../../../interfaces'
import language from '../../../language'
import MainButton from '../../buttons/MainButton'
import FilesGrid from '../../FilesGrid'
import Form from '../../Form'
import CustomSelector, { OnChange } from '../../inputs/CustomSelector'
import Input from '../../inputs/Input'
import api from '../../../api/api'

type ProductOptions = FilterQuery
type ProductRest = { files: FileList; title: string; description: string; price: string }

export default function AdminAdd() {
  const options = useFilter()

  const form = useForm<ProductOptions>()

  const handleChange: OnChange = (type, value) => options.define(type, value)

  const handleAdd = (data: FilterQuery & ProductRest) => {
    const files: File[] = []
    const product = {
      ...options.query,
      title: [data.title],
      description: [data.description],
      price: data.price,
    }
    delete product.sort

    for (let index = 0; index < 6; index++) {
      const dataFile: File = data[`files_${index}`][0]
      if (dataFile) {
        files.push(dataFile)
      }
    }

    console.log('product:', product)
    api.adminAdd(files, product).then(console.log)
  }

  return (
    <div>
      <Form handleSubmit={form.handleSubmit(handleAdd)}>
        <FilesGrid fileName="files" register={form.register} />
        <Input label="Title" name="title" register={form.register} />
        <Input label="description" name="description" register={form.register} />
        <Input label="price" name="price" type="number" register={form.register} />
        <CustomSelector
          type="globalCategory"
          value={options.query.globalCategory}
          onChange={handleChange}
          options={CATEGORIES}
        />
        <CustomSelector
          type="category"
          value={options.query.category}
          onChange={handleChange}
          isCreatableSelector
          isSeaSelectedOptions
        />
        <CustomSelector
          type="model"
          value={options.query.model}
          onChange={handleChange}
          isCreatableSelector
          isSeaSelectedOptions
        />
        <CustomSelector
          type="size"
          value={options.query.size}
          onChange={handleChange}
          isCreatableSelector
          isMulti
          isSeaSelectedOptions
        />
        <CustomSelector
          type="material"
          value={options.query.material}
          onChange={handleChange}
          isCreatableSelector
          isMulti
          isSeaSelectedOptions
        />
        <CustomSelector
          type="color"
          value={options.query.color}
          onChange={handleChange}
          isCreatableSelector
          isSeaSelectedOptions
        />
        <CustomSelector
          type="season"
          value={options.query.season}
          onChange={handleChange}
          isCreatableSelector
          isSeaSelectedOptions
        />

        <MainButton isSubmit> {language.save}</MainButton>
      </Form>
    </div>
  )
}
