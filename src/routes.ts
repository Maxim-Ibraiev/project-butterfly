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
    add: '/api/admin/add',
  },

  admin: {
    main: '/admin',
    auth: '/admin/login',
    add: 'admin/add',
  },
}

export default routes
