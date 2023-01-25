import CategoryItem from './CategoryGridItem'
import { mobileUpper } from '../../constants'
import language from '../../language'
import Text from '../Text'
import routes from '../../routes'
import s from './CategoryGrid.module.scss'

export default function Category() {
  const { categories, handMade } = routes

  return (
    <section>
      <Text component="h2" type="header">
        Категории
      </Text>
      <div className={s.gallery}>
        <CategoryItem
          href={handMade}
          text={language.handMade}
          width={700}
          height={430}
          layout="responsive"
          sizes={`(max-width: ${mobileUpper}px) 50vw, 280px`}
          src="/handMadeHero.jpg"
        />

        <CategoryItem
          href={categories.dress}
          text={language.dress}
          width={700}
          height={900}
          layout="responsive"
          sizes={`(max-width: ${mobileUpper}px) 100vw,
                  575px`}
          src="/products/ex-2.jpg"
        />
        <CategoryItem
          href={categories.suit}
          text={language.suit}
          width={700}
          height={900}
          layout="responsive"
          objectFit="cover"
          sizes={`(max-width: ${mobileUpper}px) 50vw, 280px`}
          src="/products/s1.8.jpg"
        />
      </div>
    </section>
  )
}
