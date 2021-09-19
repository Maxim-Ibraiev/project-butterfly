import ImageGallery from 'react-image-gallery'
import cn from 'classnames'
import { useDevice } from '../../customHook'
import s from './Gallery.module.scss'

type Props = {
  items: {
    original: string
    thumbnail: string
  }[]
  additionalClass?: string
  position?: 'top' | 'right' | 'bottom' | 'left'
}

export default function Gallery({ items, position, additionalClass }: Props) {
  const { isDesktop } = useDevice()

  return (
    <ImageGallery
      additionalClass={cn(s.wrapper, additionalClass)}
      showThumbnails={isDesktop}
      items={items}
      thumbnailPosition={position}
      showPlayButton={false}
      disableKeyDown
      showBullets
    />
  )
}
