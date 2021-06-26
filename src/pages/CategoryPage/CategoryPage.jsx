import React from 'react';
import ProductCard from '../../components/cards/ProductCard';
import s from './CategoryPage.module.scss';

export default function CategoryPage() {
  return (
    <div>
      <div className={s.cards}>
        <ProductCard
          layout="responsive"
          width={'100%'}
          height={'100%'}
          src={'/products/ex-1.jpg'}
          price={250}
          description="lorem lorem lorem lorem"
          palette={['red', 'green']}
          sises={[35, 37, 38, 40]}
        />
        <ProductCard
          layout="responsive"
          width={'100%'}
          height={'auto'}
          src={'/products/ex-1.jpg'}
          price={250}
          description="lorem lorem lorem lorem"
          palette={['red', 'green']}
          sises={[35, 37, 38, 40]}
        />
        <ProductCard
          layout="responsive"
          width={'100%'}
          height={'auto'}
          src={'/products/ex-1.jpg'}
          price={250}
          description="lorem lorem lorem lorem"
          palette={['red', 'green']}
          sises={[35, 37, 38, 40]}
        />
        <ProductCard
          layout="responsive"
          width={'100%'}
          height={'auto'}
          src={'/products/ex-1.jpg'}
          price={250}
          description="lorem lorem lorem lorem"
          palette={['red', 'green']}
          sises={[35, 37, 38, 40]}
        />
        <ProductCard
          layout="responsive"
          width={'100%'}
          height={'auto'}
          src={'/products/ex-1.jpg'}
          price={250}
          description="lorem lorem lorem lorem"
          palette={['red', 'green']}
          sises={[35, 37, 38, 40]}
        />
        <ProductCard
          layout="responsive"
          width={'100%'}
          height={'auto'}
          src={'/products/ex-1.jpg'}
          price={250}
          description="lorem lorem lorem lorem"
          palette={['red', 'green']}
          sises={[35, 37, 38, 40]}
        />
      </div>
    </div>
  );
}
