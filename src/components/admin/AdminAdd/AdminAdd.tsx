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
  const fireFform = useForm()
  const [fileList, setFileList] = useState(new Array(6).fill(null))

  const handleChange: OnChange = (type, value) => options.define(type, value)
  const handleAdd = async (data: FormOptions) => {
    if (fileList.filter(Boolean).length < 2) {
      if (!fileList[0]) fireFform.setFocus('image-0')
      else fireFform.setFocus('image-1')

      return
    }

    const productToAdd: ProductToUpdate = {
      ...data,
      globalCategory: data.globalCategory[0],
      category: data.category[0],
      model: data.model[0],
      color: data.color[0],
      season: data.season[0],
      size: data.size.reduce((acc, el) => {
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
        <FilesGrid onChange={setFileList} register={fireFform.register} />
        <Input label="Title" name="title" register={form.register} options={{ minLength: 3 }} required />
        <Input
          label="description"
          name="description"
          register={form.register}
          options={{ minLength: 3 }}
          required
        />
        <Input
          label="price"
          name="price"
          type="number"
          register={form.register}
          options={{ valueAsNumber: true }}
          required
        />
        <CustomSelector
          type="globalCategory"
          value={form.getValues('globalCategory')}
          onChange={handleChange}
          options={CATEGORIES}
          register={form.register}
          required
        />
        <CustomSelector
          type="category"
          value={form.getValues('category')}
          onChange={handleChange}
          isCreatableSelector
          isSeaSelectedOptions
          register={form.register}
          required
        />
        <CustomSelector
          type="model"
          value={form.getValues('model')}
          onChange={handleChange}
          isCreatableSelector
          isSeaSelectedOptions
          register={form.register}
          required
        />
        <CustomSelector
          type="size"
          value={form.getValues('size')}
          onChange={handleChange}
          isCreatableSelector
          isMulti
          isSeaSelectedOptions
          register={form.register}
          required
        />
        <CustomSelector
          type="material"
          value={form.getValues('material')}
          onChange={handleChange}
          isCreatableSelector
          isMulti
          isSeaSelectedOptions
          register={form.register}
          required
        />
        <CustomSelector
          type="color"
          value={form.getValues('color')}
          onChange={handleChange}
          isCreatableSelector
          isSeaSelectedOptions
          register={form.register}
          required
        />
        <CustomSelector
          type="season"
          value={form.getValues('season')}
          onChange={handleChange}
          isCreatableSelector
          isSeaSelectedOptions
          register={form.register}
          required
        />

        <MainButton isSubmit status={submitStatus} isLoading={submitStatus === 'Request'}>
          {language.save}
        </MainButton>
      </Form>
    </div>
  )
}
