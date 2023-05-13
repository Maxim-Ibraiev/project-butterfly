import Image from 'next/image'
import { ReactImageGalleryItem } from 'react-image-gallery'
import { getDataURL } from '../../helpers'
import s from './RenderItem.module.scss'

export default function RenderItem(galleryItem: ReactImageGalleryItem, priority: boolean) {
  const { original } = galleryItem

  return (
    <div className={s.container}>
      <Image
        alt="product image."
        priority={priority}
        src={original}
        fill
        quality={100}
        placeholder="blur"
        blurDataURL={getDataURL(700, 700)}
        style={{ objectFit: 'contain' }}
        className={s.image}
      />
    </div>
  )
}
