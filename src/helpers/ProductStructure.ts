import { IProductObject } from '../interfaces'

export default class ProductStructure {
  #product: IProductObject

  constructor(product: IProductObject) {
    this.#product = product
  }

  getAvailableSize = () => this.#product.size

  getAllSizeOptions = () => Object.keys(this.getAvailableSize())

  getMainImageSrc = () => this.getImages()[0].original

  getPrice = () => this.#product.price

  getPopularity = () => this.#product.popularity

  getColor = () => this.#product.color

  getMaterial = () => this.#product.material

  getImages = () => this.#product.images

  getId = () => this.#product.id

  getCategory = () => this.#product.category

  getDescription = () => this.#product.description

  getTitle = () => this.#product.title

  getModel = () => this.#product.model

  getSeason = () => this.#product.season

  getSelectedSize = () => this.#product.selectedSize || 0

  toObject = (): IProductObject => ({
    price: this.getPrice(),
    popularity: this.getPopularity(),
    material: this.getMaterial(),
    color: this.getColor(),
    images: this.getImages(),
    id: this.getId(),
    category: this.getCategory(),
    description: this.getDescription(),
    title: this.getTitle(),
    model: this.getModel(),
    season: this.getSeason(),
    size: this.getAvailableSize(),
    createdAt: '',
    updatedAt: '',
    __v: 0,
    selectedSize: this.getSelectedSize(),
  })
}
