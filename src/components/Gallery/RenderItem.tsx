import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getDataURL } from '../../helpers'
import { Item } from './Gallery'
import s from './Gallery.module.scss'

interface IRenderItem {
  item: Item
  priority?: boolean
}

export default function RenderItem({ item: { original }, priority }: IRenderItem) {
  return (
    <div style={{ maxHeight: '100vh' }}>
      <Image
        priority={priority}
        src={original}
        width={1200}
        height={1600}
        quality={100}
        placeholder="blur"
        blurDataURL={getDataURL(700, 700)}
      />
    </div>
  )
}
