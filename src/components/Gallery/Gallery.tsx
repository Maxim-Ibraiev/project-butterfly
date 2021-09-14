import ImageGallery from 'react-image-gallery'
import { useDevice } from '../../customHook'

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
      additionalClass={additionalClass}
      showThumbnails={isDesktop}
      items={items}
      showBullets={isDesktop}
      thumbnailPosition={position}
      showPlayButton={false}
      disableKeyDown
    />
  )
}
