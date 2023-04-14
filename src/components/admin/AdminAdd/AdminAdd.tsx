import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { CATEGORIES } from '../../../constants'
import { useFilter } from '../../../customHook'
import { FilterQuery, ProductToUpdate, Request } from '../../../interfaces'
import language from '../../../language'
import MainButton from '../../buttons/MainButton'
import FilesGrid from '../../FilesGrid'
import Form from '../../Form'
import CustomSelector, { OnChange } from '../../inputs/CustomSelector'
import Input from '../../inputs/Input'
import api from '../../../api/api'

type ProductRest = { title: string; description: string; price: number; files: File[] }
type FormOptions = FilterQuery & ProductRest & FieldValues

export default function AdminAdd() {
  const options = useFilter()
  const [submitStatus, setSubmitStatus] = useState<Request>()
  const form = useForm<FilterQuery>()
  const [fileList, setFileList] = useState(new Array(6).fill(null))

  const handleChange: OnChange = (type, value) => options.define(type, value)
  const handleAdd = async (data: FormOptions) => {
    const { query } = options
    const productToAdd: ProductToUpdate = {
      title: data.title,
      description: data.description,
      price: data.price,
      globalCategory: query.globalCategory[0],
      category: query.category[0],
      model: query.model[0],
      material: query.material,
      color: query.color[0],
      season: query.season[0],
      size: query.size.reduce((acc, el) => {
        acc[el] = 1
        return acc
      }, {}),
    }

    try {
      setSubmitStatus('Request')

      const imageRes = await api.admin.imageAdd(fileList, {
        color: productToAdd.color,
        title: productToAdd.title,
      })

      productToAdd.images = imageRes.data
      console.log('imageRes.data:', imageRes.data)
      await api.admin.addProduct(productToAdd)

      setSubmitStatus('Success')
    } catch (error) {
      setSubmitStatus('Error')
    } finally {
      setTimeout(() => {
        if (submitStatus !== 'Request') setSubmitStatus(null)
      }, 3000)
    }
  }

  return (
    <div>
      <Form handleSubmit={form.handleSubmit(handleAdd)}>
        <FilesGrid onChange={setFileList} />
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

        <MainButton isSubmit status={submitStatus} isLoading={submitStatus === 'Request'}>
          {language.save}
        </MainButton>
      </Form>
    </div>
  )
}
