import React from 'react';
import CategoryItem from './CategoryItem';
import s from './Category.module.scss';
import routes from '../../routes';
const { category } = routes;
export default function Category() {
  return (
    <section>
      <h2 className={s.item}>Категории</h2>
      <div className={s.gallery}>
        <div className={s.first}>
          <CategoryItem
            href={category.dress}
            text="Платья"
            width="700px"
            height="475px"
            layout="responsive"
            src="/ss_2-770x550.1.0.webp"
          />
        </div>
        <div className={s.innerGallery}>
          <CategoryItem
            href={category.suit}
            text="Костюмы"
            width="700px"
            height="475px"
            layout="responsive"
            src="/exp/1.webp"
          />
          <CategoryItem
            href={category.jeans}
            text="Джинсы"
            width="700px"
            height="475px"
            layout="responsive"
            src="/exp/2.webp"
          />
          <CategoryItem
            href={category.footballShirt}
            text="Футболки"
            width="700px"
            height="475px"
            layout="responsive"
            src="/exp/3.webp"
          />
          <CategoryItem
            href={category.shirt}
            text="Рубашки"
            width="700px"
            height="475px"
            layout="responsive"
            src="/exp/4.webp"
          />
        </div>
      </div>
    </section>
  );
}
