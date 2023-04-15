import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useFilter, useReduceSelectors } from '../../../customHook'
import { arrayWrapper } from '../../../helpers'
import { ProductToUpdate, Request } from '../../../interfaces'
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
  const fileForm = useForm()
  const filter = useFilter()
  const [submitStatus, setSubmitStatus] = useState<Request>()
  const [fileList, setFileList] = useState(new Array(6).fill(null))
  const [productImages, setProductImages] = useState(product.getImages())

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

  const handleEdit = async (data: { description: string; title: string; price: number }) => {
    if (fileList.filter(Boolean).length + productImages.filter(Boolean).length < 2) {
      const Fileindex = fileList.findIndex(el => el == null)
      const imageIndex = productImages.length
      const index = Math.max(Fileindex, imageIndex)
      fileForm.setFocus(`image-${index}`)

      return
    }

    const { query } = filter

    const productToUpdate: ProductToUpdate = {
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

    setSubmitStatus('Request')
    try {
      const imageResponse = await api.admin.imageUpdate(id, fileList, {
        color: productToUpdate.color,
        title: productToUpdate.title,
        preImages: productImages.filter(Boolean),
      })

      productToUpdate.images = imageResponse.data

      await api.admin.editProduct(product.getId(), productToUpdate)

      setSubmitStatus('Success')
    } catch (error) {
      setSubmitStatus('Error')
    } finally {
      setTimeout(() => {
        if (submitStatus !== 'Request') setSubmitStatus(null)
      }, 3000)
    }
  }

  const handleDeleteItem = (index: number) => {
    setProductImages(productImages.map((el, ind) => (ind === index ? null : el)))
  }

  return (
    <div>
      <Text type="header" component="h1">
        {language.editProduct}
      </Text>

      <Form handleSubmit={form.handleSubmit(handleEdit)}>
        <FilesGrid
          onChange={setFileList}
          onDeleteItem={handleDeleteItem}
          images={product.getImages()}
          register={fileForm.register}
        />
        <Input label="title" register={form.register} required />
        <Input label="description" register={form.register} required />
        <Input label="price" type="number" register={form.register} required />

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
