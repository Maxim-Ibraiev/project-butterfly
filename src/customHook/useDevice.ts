import debounce from 'lodash.debounce'
import { useEffect, useState } from 'react'
import { mobileLesser, mobileUpper, tableLesser, tableUpper } from '../constants'

export default function useDevice() {
  const [devices, setDevise] = useState({ isMobile: true, isTable: false, isDesktop: false })

  const handleResize = debounce(() => setDevise(getScreenSize()), 100)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()

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
