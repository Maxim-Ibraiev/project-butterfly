const routes = {
  home: '/',
  category: '/[globalCategory]',
  categories: {
    dress: '/dress',
    suit: '/suit',
    jeans: '/jeans',
    largeSizes: '/largeSizes',
    shirts: '/shirts',
    tShirt: '/t-shirt',
  },
  femaleClothes: '/femaleClothes',
  maleClothes: '/maleClothes',
  childrenClothes: '/childrenClothes',
  handMade: '/handMade',
  all: '/all',
  product: '/product',
  checkout: '/checkout',
  getCheckout: (id: string) => (id ? `/checkout?shoppingId=${id}` : '/checkout'),

  api: {
    getShoppingBag: (id?: string) => (id ? `/api/shoppingBag?id=${id}` : '/api/shoppingBag'),
    shoppingBag: '/api/shoppingBag',
    adminLogin: '/api/admin/auth',
    adminProduct: '/api/admin/product',
  },

  admin: {
    main: '/admin',
    auth: '/admin/login',
    add: '/admin/add',
    toEditProduct: (id: string) => `/admin/product/${id}`,
  },
}

export default routes
