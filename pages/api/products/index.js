// // import data from '../../../db.json'
// // import api from '../../../src/api'
const products = [
  {
    material: ['cotton', 'silk'],
    _id: '60e9429acac71a2ac8021368',
    description: 'red dress',
    title: 'Белое платье без рукавов из прошвы с расклешенной юбкой',
    price: 1299,
    alert: 'Белое платье без рукавов из прошвы с расклешенной юбкой',
    createdAt: '2021-07-10T06:47:54.279Z',
    updatedAt: '2021-07-20T10:37:07.631Z',
    __v: 0,
    size: { 40: 1, 42: 3, 45: 0 },
  },
  {
    material: ['silk'],
    _id: '60e943a2cac71a2ac8021369',
    description:
      'Повседневное платье из льна жатка. Силуэтности изделию придаёт эластичная деталь в поясе. В боковых швах предусмотрены карманы. Широкий пояс из основной ткани с массивной пряжкой в комплекте.',
    title: "Платье-клеш из льна 'жатка' с коротким рукавом оранжевое",
    price: 999,
    alert: "Платье-клеш из льна 'жатка' с коротким рукавом оранжевое",
    createdAt: '2021-07-10T06:52:18.828Z',
    updatedAt: '2021-07-20T10:40:29.998Z',
    __v: 0,
    image:
      'https://cdn.dressa.com.ua/ostrov-cache/sylius_extra_large/27/plate-klesh-iz-lna-zhatka-s-korotkim-rukavom-oranzhevoe-54362-1.jpg',
    size: { 45: 5, 50: 0, 52: 1 },
  },
  {
    material: ['silk'],
    _id: '60e943b7cac71a2ac802136a',
    description:
      'Платье без рукавов из хлопка с V-образным вырезом и карманами в боковых швах. Застегивается на потайную молнию по спинке. Комплектуется тканевым поясом с пряжкой',
    title: 'Платье без рукавов из хлопка с V-образным вырезом зеленое',
    price: 999,
    alert: 'Платье без рукавов из хлопка с V-образным вырезом зеленое',
    createdAt: '2021-07-10T06:52:39.270Z',
    updatedAt: '2021-07-20T10:40:57.332Z',
    __v: 0,
    image:
      'https://cdn.dressa.com.ua/ostrov-cache/sylius_extra_large/39/plate-molochnogo-cveta-bez-rukavov-s-v-obraznym-vyrezom-54251-1.jpg',
    size: { 45: 5, 50: 0, 52: 1 },
  },
  {
    material: ['silk'],
    _id: '60e943d6cac71a2ac802136b',
    description:
      'Платье с принтом и расклешенной юбкой. Цельнокроеный рукав дополнен рюшами. По талии эластичная деталь. В изделии предусмотрена подкладка из хлопка. Пояс в комплект не входит.',
    title: 'Шифоновое платье с цветочным принтом и юбкой-клеш',
    price: 1099,
    alert: 'Шифоновое платье с цветочным принтом и юбкой-клеш',
    createdAt: '2021-07-10T06:53:10.191Z',
    updatedAt: '2021-07-20T10:41:07.549Z',
    __v: 0,
    image:
      'https://cdn.dressa.com.ua/ostrov-cache/sylius_extra_large/a8/shifonovoe-plate-s-cvetochnym-printom-i-yubkoy-klesh-bezhevoe-54216-1.jpg',
    size: { 45: 5, 50: 0, 52: 1 },
  },
  {
    material: ['silk'],
    _id: '60e943f5cac71a2ac802136c',
    description:
      'Стильное платье из хлопка с узором. Расклешенные рукава и низ юбки дополняет нежная оборка. Модель украшена кружевом. Для комфортной посадки по фигуре талия на спинке присобрана на резинку. Предусмотрена хлопковая подкладка.',
    title: 'Расклешенное платье из хлопка с объемными рукавами',
    price: 1099,
    alert: 'Расклешенное платье из хлопка с объемными рукавами',
    createdAt: '2021-07-10T06:53:41.441Z',
    updatedAt: '2021-07-20T10:41:13.721Z',
    __v: 0,
    image:
      'https://cdn.dressa.com.ua/ostrov-cache/sylius_extra_large/a8/shifonovoe-plate-s-cvetochnym-printom-i-yubkoy-klesh-bezhevoe-54216-1.jpg',
    size: { 45: 5, 50: 0, 52: 1 },
  },
  {
    material: ['silk'],
    _id: '60e94412cac71a2ac802136d',
    description:
      'Свободное платье-рубашка в стиле сафари из приятного к телу штапеля. Рукав регулируется шлевками. Изделие застегивается на пуговицы по всей длине',
    title: 'Платье-рубашка длины макси из штапеля мятное',
    price: 899,
    alert: 'Платье-рубашка длины макси из штапеля мятное',
    createdAt: '2021-07-10T06:54:10.497Z',
    updatedAt: '2021-07-20T10:41:52.917Z',
    __v: 0,
    image:
      'https://cdn.dressa.com.ua/ostrov-cache/sylius_extra_large/2d/plate-rubashka-dliny-maksi-iz-shtapelya-myatnoe-54350-1.jpg',
    size: { 45: 5, 47: 1, 50: 2, 52: 3 },
  },
  {
    material: ['cotton'],
    _id: '60e9442fcac71a2ac802136e',
    description:
      'Платье из шифона в цветочный принт с эластичным поясом. Модель с глубоким V-образным вырезом по горловине и открытой спинкой. Снизу модель дополнена широкой оборкой. Подкладка из основного материала. Комплектуется поясом из основного материала.',
    title: 'Платье молочного цвета без рукавов с V-образным вырезом',
    price: 999,
    alert: 'Платье молочного цвета без рукавов с V-образным вырезом',
    createdAt: '2021-07-10T06:54:39.354Z',
    updatedAt: '2021-07-20T10:42:06.147Z',
    __v: 0,
    image:
      'https://cdn.dressa.com.ua/ostrov-cache/sylius_extra_large/39/plate-molochnogo-cveta-bez-rukavov-s-v-obraznym-vyrezom-54251-1.jpg',
    size: { 45: 5, 47: 1, 50: 2, 52: 3 },
  },
  {
    material: ['cotton'],
    _id: '60e94465cac71a2ac802136f',
    description:
      'Платье с оригинальным вырезом по спинке. Застёгивается на две пуговицы и потайную молнию сбоку. В модели предусмотрен запас ткани на деталях спинки для регулировки прилегания по фигуре путем перешивания пуговиц. ',
    title: 'Синее платье с оригинальным вырезом по спинке ',
    price: 899,
    alert: 'Синее платье с оригинальным вырезом по спинке ',
    createdAt: '2021-07-10T06:55:33.931Z',
    updatedAt: '2021-07-20T10:42:22.004Z',
    __v: 0,
    image:
      'https://cdn.dressa.com.ua/ostrov-cache/sylius_extra_large/21/sinee-plate-s-originalnym-vyrezom-po-spinke-54283-1.jpg',
    size: { 45: 0, 47: 1, 50: 0, 52: 0 },
  },
  {
    material: ['cotton', 'silk'],
    _id: '60e94481cac71a2ac8021370',
    description:
      'Льняное платье на запах. Модель с удлиненной спинкой и фурнитурой для пояса. Изделие без рукавов. Низ платья расклешенный. ',
    title: 'Платье молочного цвета на запах с удлиненной спинкой ',
    price: 899,
    alert: 'Платье молочного цвета на запах с удлиненной спинкой ',
    createdAt: '2021-07-10T06:56:01.866Z',
    updatedAt: '2021-07-20T10:42:57.908Z',
    __v: 0,
    image:
      'https://cdn.dressa.com.ua/ostrov-cache/sylius_extra_large/40/plate-molochnogo-cveta-na-zapah-s-udlinennoy-spinkoy-54331-1.jpg',
    size: { 45: 1, 47: 1, 50: 0, 52: 0 },
  },
]

export default async function categoriesHandler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      // Get data from your database
      // const data = await api.getCategories()
      res.status(200).json({
        data: products,
        error: null,
      })
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
