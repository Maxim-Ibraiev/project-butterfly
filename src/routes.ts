const routes = {
  home: '/',
  category: '/[category]',
  categories: {
    dress: '/dress',
    suit: '/suit',
    jeans: '/jeans',
    largeSizes: '/largeSizes',
    shirts: '/shirts',
    tShirt: '/t-shirt',
  },
  handMade: '/handeMade',
  product: '/product',
  checkout: '/checkout',
  getCheckout: (id: string) => (id ? `/checkout?shoppingId=${id}` : '/checkout'),

  api: {
    getShoppingBag: (id?: string) => (id ? `/api/shoppingBag?id=${id}` : '/api/shoppingBag'),
    shoppingBag: '/api/shoppingBag',
  },
}

export default routes
