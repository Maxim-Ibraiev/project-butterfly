import CategoryItem from './CategoryGridItem'
import routes from '../../routes'
import s from './CategoryGrid.module.scss'
import language from '../../language'

export default function Category() {
  const { categories } = routes

  return (
    <section>
      <h2 className={s.item}>Категории</h2>
      <div className={s.gallery}>
        <CategoryItem
          href={categories.dress}
          text={language.dress}
          width="700px"
          height="475px"
          layout="responsive"
          src="/ss_2-770x550.1.0.webp"
        />
        <CategoryItem
          href={categories.suit}
          text={language.suit}
          width="700px"
          height="475px"
          layout="responsive"
          src="/exp/1.webp"
        />
        <CategoryItem
          href={categories.jeans}
          text={language.jeans}
          width="700px"
          height="475px"
          layout="responsive"
          src="/exp/2.webp"
        />
        <CategoryItem
          href={categories.tShirt}
          text={language.tShirt}
          width="700px"
          height="475px"
          layout="responsive"
          src="/exp/3.webp"
        />
        <CategoryItem
          href={categories.shirts}
          text={language.shirts}
          width="700px"
          height="475px"
          layout="responsive"
          src="/exp/4.webp"
        />
      </div>
    </section>
  )
}
