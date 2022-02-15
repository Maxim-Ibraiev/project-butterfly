import throttle from 'lodash.throttle'
import { useEffect, useState } from 'react'
import { mobileLesser, mobileUpper, tableLesser, tableUpper } from '../constants'

const handleResize = throttle(fn => fn, 1000)

export default function useDevice() {
  const [devices, setDevise] = useState({ isMobile: true, isTable: false, isDesktop: false })

  useEffect(() => {
    window.addEventListener(
      'resize',
      handleResize(() => setDevise(getScreenSize()))
    )

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return devices
}

function getScreenSize() {
  const width = document.body.clientWidth

  return {
    isMobile: width <= mobileLesser,
    isTable: width >= mobileUpper && width <= tableLesser,
    isDesktop: width >= tableUpper,
  }
}
