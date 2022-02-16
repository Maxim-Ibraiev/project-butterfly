import Image from 'next/image'
import ImageGallery from 'react-image-gallery'
import cn from 'classnames'
import RenderItem from './RenderItem'
import { useDevice } from '../../customHook'
import s from './Gallery.module.scss'

export type Item = {
  original: string
  thumbnail: string
}
type Props = {
  items: Item[]
  additionalClass?: string
}

export default function Gallery({ items, additionalClass }: Props) {
  const { isDesktop } = useDevice()
  const position = isDesktop ? 'left' : undefined
  const handleRenderItem = (item: Item) => {
    const priority = items[0].original === item.original

    return RenderItem({ item, priority })
  }

  return (
    <ImageGallery
      additionalClass={cn(s.wrapper, additionalClass)}
      showThumbnails={isDesktop}
      items={items}
      thumbnailPosition={position}
      showPlayButton={false}
      disableKeyDown
      showBullets
      renderItem={handleRenderItem}
      renderThumbInner={renderThumbInner}
    />
  )
}

function renderThumbInner({ thumbnail }: Item) {
  return <Image src={thumbnail} width={92} height={123} />
}
