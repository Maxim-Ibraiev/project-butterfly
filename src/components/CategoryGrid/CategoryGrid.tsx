import CategoryItem from './CategoryGridItem'
import { mobileUpper } from '../../constants'
import language from '../../language'
import Text from '../Text'
import routes from '../../routes'
import s from './CategoryGrid.module.scss'

export default function Category() {
  const { femaleClothes, maleClothes, childrenClothes } = routes

  return (
    <section>
      <Text component="h2" type="header">
        Категории
      </Text>
      <div className={s.gallery}>
        <div className={s.firstCategory}>
          <CategoryItem
            href={femaleClothes}
            text={language.femaleClothes}
            width={700}
            height={430}
            layout="responsive"
            sizes={`(max-width: ${mobileUpper}px) 50vw, 280px`}
            src="/femaleClothes.jpg"
          />
        </div>
        <div className={s.categories}>
          <CategoryItem
            href={maleClothes}
            text={language.maleClothes}
            width={700}
            height={900}
            layout="responsive"
            sizes={`(max-width: ${mobileUpper}px) 100vw,
                  575px`}
            src="/maleClothes.jpg"
          />
        </div>
        <div className={s.categories}>
          <CategoryItem
            href={childrenClothes}
            text={language.childrenClothes}
            width={700}
            height={900}
            layout="responsive"
            objectFit="cover"
            sizes={`(max-width: ${mobileUpper}px) 50vw, 280px`}
            src="/childrenClothes.jpg"
          />
        </div>
      </div>
    </section>
  )
}
