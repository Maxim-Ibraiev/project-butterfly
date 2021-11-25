import throttle from 'lodash.throttle'
import { useEffect, useState } from 'react'
import { mobileLesser, mobileUpper, tableLesser, tableUpper } from '../constants'

export default function useDevice() {
  const [isMobile, setMobile] = useState(true)
  const [isTable, setTable] = useState(false)
  const [isDesktop, setDesktop] = useState(false)

  useEffect(() => {
    const width = () => document.body.clientWidth
    const setDevise = () => {
      setMobile(width() <= mobileLesser)
      setTable(width() >= mobileUpper && width() <= tableLesser)
      setDesktop(width() >= tableUpper)
    }

    const handleResize = throttle(() => setDevise(), 1000)

    window.addEventListener('resize', handleResize)
    setDevise()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { isMobile, isTable, isDesktop }
}
