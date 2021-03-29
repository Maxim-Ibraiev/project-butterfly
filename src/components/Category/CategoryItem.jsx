import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './CategoryItem.module.scss';

export default function CategoryItem({
  href = '/',
  text = '',
  sizes,
  src,
  alt,
  width,
  height,
  layout,
}) {
  return (
    <Link href={href}>
      <a className={s.container}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          layout={layout}
          sizes={sizes}
        />
        <div className={s.layout} />
        <h3 className={s.text}>{text}</h3>
      </a>
    </Link>
  );
}
