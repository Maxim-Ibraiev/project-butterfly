import { IProductObject } from '../interfaces'

export default class ProductStructure {
  #product: IProductObject

  constructor(product: IProductObject) {
    this.#product = product
  }

  #getImageURL = (src: string) =>
    src.includes('http')
      ? src
      : `https://res.cloudinary.com/butterfly-project/image/upload/v2/products/${src}`

  getAvailableSize = () =>
    this.#product.sizes.reduce((acc, el) => {
      acc[el] = 1
      return acc
    }, {})

  getAllSizeOptions = () => this.#product.sizes

  getMainImageSrc = () => this.#getImageURL(this.getImages()[0].original)

  getPrice = () => this.#product.price

  getPopularity = () => this.#product.popularity

  getColor = () => this.#product.colors

  getMaterial = () => this.#product.material

  getImages = () =>
    this.#product.images.map(el => ({
      original: this.#getImageURL(el.original),
      thumbnail: this.#getImageURL(el.thumbnail),
      color: el.color,
    }))

  getId = () => this.#product.id

  getGlobalCategory = () => this.#product.globalCategory

  getCategory = () => this.#product.category

  getDescription = () => this.#product.description

  getTitle = () => this.#product.title

  getModel = () => this.#product.model

  getSeason = () => {
    console.warn('property "season" is deprecated')
    return ''
  }

  getSelectedSize = () => this.#product.selectedSize || ''

  toObject = (): IProductObject => ({
    price: this.getPrice(),
    popularity: this.getPopularity(),
    material: this.getMaterial(),
    colors: this.getColor(),
    images: this.getImages(),
    id: this.getId(),
    globalCategory: this.getGlobalCategory(),
    category: this.getCategory(),
    description: this.getDescription(),
    title: this.getTitle(),
    model: this.getModel(),
    sizes: this.getAllSizeOptions(),
    createdAt: '',
    updatedAt: '',
    __v: 0,
    selectedSize: this.getSelectedSize(),
  })
}
