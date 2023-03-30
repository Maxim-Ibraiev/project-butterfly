import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useFilter, useReduceSelectors } from '../../../customHook'
import { arrayWrapper } from '../../../helpers'
import language from '../../../language'
import MainButton from '../../buttons/MainButton'
import FilesGrid from '../../FilesGrid'
import Form from '../../Form'
import CustomSelector from '../../inputs/CustomSelector'
import Input from '../../inputs/Input'
import NoProduct from '../../NoProduct'
import Text from '../../Text'

export default function AdminEdit() {
  const router = useRouter()
  const id = arrayWrapper(router.query.id)[0]
  const { getProductById } = useReduceSelectors()
  const product = getProductById(id)
  const form = useForm()
  const filter = useFilter()

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

  const handleEdit = data => {
    // todo
    console.log({ data })
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
        <CustomSelector value={filter.query.model} type="model" onChange={filter.define} />
        <Text type="body">{language.size}</Text>
        <CustomSelector value={filter.query.size} type="size" isMulti onChange={filter.define} />
        <Text type="body">{language.material}</Text>
        <CustomSelector value={filter.query.material} type="material" onChange={filter.define} />
        <Text type="body">{language.color}</Text>
        <CustomSelector value={filter.query.color} type="color" onChange={filter.define} />
        <Text type="body">{language.season}</Text>
        <CustomSelector value={filter.query.season} type="season" onChange={filter.define} />

        <MainButton isSubmit>{language.save}</MainButton>
      </Form>
    </div>
  )
}
