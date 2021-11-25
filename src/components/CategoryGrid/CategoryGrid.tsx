import CategoryItem from './CategoryGridItem'
import routes from '../../routes'
import s from './CategoryGrid.module.scss'
import language from '../../language'
import { mobileUpper } from '../../constants'

export default function Category() {
  const { categories } = routes

  return (
    <section>
      <h2 className={s.item}>Категории</h2>
      <div className={s.gallery}>
        <CategoryItem
          href={categories.dress}
          text={language.dress}
          width={700}
          height={475}
          layout="responsive"
          sizes={`(max-width: ${mobileUpper}px) 100vw,
                  575px`}
          src="/ss_2-770x550.1.0.webp"
        />
        <CategoryItem
          href={categories.suit}
          text={language.suit}
          width={700}
          height={475}
          layout="responsive"
          sizes={`(max-width: ${mobileUpper}px) 50vw, 280px`}
          src="/exp/1.webp"
        />
        <CategoryItem
          href={categories.jeans}
          text={language.jeans}
          width={700}
          height={475}
          layout="responsive"
          sizes={`(max-width: ${mobileUpper}px) 50vw, 280px`}
          src="/exp/2.webp"
        />
        <CategoryItem
          href={categories.tShirt}
          text={language.tShirt}
          width={700}
          height={475}
          layout="responsive"
          sizes={`(max-width: ${mobileUpper}px) 50vw, 280px`}
          src="/exp/3.webp"
        />
        <CategoryItem
          href={categories.shirts}
          text={language.shirts}
          width={700}
          height={475}
          layout="responsive"
          sizes={`(max-width: ${mobileUpper}px) 50vw, 280px`}
          src="/exp/4.webp"
        />
      </div>
    </section>
  )
}
