import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useFilter, useReduceSelectors } from '../../../customHook'
import { arrayWrapper } from '../../../helpers'
import { Request } from '../../../interfaces'
import language from '../../../language'
import MainButton from '../../buttons/MainButton'
import FilesGrid from '../../FilesGrid'
import Form from '../../Form'
import CustomSelector from '../../inputs/CustomSelector'
import Input from '../../inputs/Input'
import NoProduct from '../../NoProduct'
import Text from '../../Text'
import api from '../../../api/api'

export default function AdminEdit() {
  const router = useRouter()
  const id = arrayWrapper(router.query.id)[0]
  const { getProductById } = useReduceSelectors()
  const product = getProductById(id)
  const form = useForm()
  const filter = useFilter()
  const [submitStatus, setSubmitStatus] = useState<Request>()

  if (!product) return <NoProduct />

  useEffect(() => {
    filter.updateURL({
      id,
      category: [product.getCategory()],
      color: [product.getColor()],
      globalCategory: [product.getGlobalCategory()],
      material: product.getMaterial(),
      model: [product.getModel()],
      season: [product.getSeason()],
      size: product.getAllSizeOptions(),
    })

    form.setValue('title', product.getTitle())
    form.setValue('description', product.getDescription())
    form.setValue('price', product.getPrice())
  }, [])

  const handleEdit = (data: { description: string; title: string; price: number }) => {
    setSubmitStatus('Request')
    const files: File[] = []

    for (let index = 0; index < 6; index++) {
      const fileList = data[`files_${index}`]
      if (fileList[0]) {
        files[index] = fileList[0]
      } else {
        files[index] = null
      }
    }

    const productToUpdate = {
      title: data.title,
      description: data.description,
      price: data.price,
      ...filter.query,
      id,
    }

    delete productToUpdate.sort

    api.admin
      .editProduct(files, productToUpdate)
      .then(() => {
        setSubmitStatus('Success')
        if (submitStatus !== 'Request') setSubmitStatus(null)
      })
      .catch(() => setSubmitStatus('Error'))
  }

  return (
    <div>
      <Text type="header" component="h1">
        {language.editProduct}
      </Text>

      <Form handleSubmit={form.handleSubmit(handleEdit)}>
        <FilesGrid fileName="files" register={form.register} images={product.getImages()} />
        <Input label="title" register={form.register} />
        <Input label="description" register={form.register} />
        <Input label="price" type="number" register={form.register} />

        <Text type="body">{language.globalCategory}</Text>
        <CustomSelector value={filter.query.globalCategory} type="globalCategory" onChange={filter.define} />
        <Text type="body">{language.category}</Text>
        <CustomSelector value={filter.query.category} type="category" onChange={filter.define} />
        <Text type="body">{language.model}</Text>
        <CustomSelector
          value={filter.query.model}
          type="model"
          onChange={filter.define}
          isCreatableSelector
        />
        <Text type="body">{language.size}</Text>
        <CustomSelector
          value={filter.query.size}
          type="size"
          isMulti
          onChange={filter.define}
          isCreatableSelector
        />
        <Text type="body">{language.material}</Text>
        <CustomSelector
          value={filter.query.material}
          type="material"
          onChange={filter.define}
          isCreatableSelector
        />
        <Text type="body">{language.color}</Text>
        <CustomSelector
          value={filter.query.color}
          type="color"
          onChange={filter.define}
          isCreatableSelector
        />
        <Text type="body">{language.season}</Text>
        <CustomSelector value={filter.query.season} type="season" onChange={filter.define} />

        <MainButton status={submitStatus} isSubmit>
          {language.save}
        </MainButton>
      </Form>
    </div>
  )
}
