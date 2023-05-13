import cn from 'classnames'
import Image from 'next/image'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
// import RenderItem from './RenderItem'
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
  // const handleRenderItem = (item: ReactImageGalleryItem) => {
  //   const priority = items[0].original === item.original

  //   return RenderItem(item, priority)
  // }

  return (
    <ImageGallery
      additionalClass={cn(s.wrapper, additionalClass)}
      items={items}
      thumbnailPosition="left"
      showPlayButton={false}
      disableKeyDown
      showBullets
      disableThumbnailScroll
      useBrowserFullscreen
      // renderItem={handleRenderItem}
      renderThumbInner={renderThumbInner}
    />
  )
}

function renderThumbInner({ thumbnail }: Item) {
  return <Image src={thumbnail} alt="Product image." width={92} height={123} />
}
