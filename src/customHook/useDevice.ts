import throttle from 'lodash.throttle'
import { useEffect, useState } from 'react'

export default function useDevice() {
  const [isMobile, setMobile] = useState(true)
  const [isTable, setTable] = useState(false)
  const [isDesktop, setDesktop] = useState(false)

  useEffect(() => {
    const width = () => document.body.clientWidth
    const setDevise = () => {
      setMobile(width() < 767)
      setTable(width() >= 767 && width() <= 1023)
      setDesktop(width() >= 1024)
    }

    const handleResize = throttle(() => setDevise(), 1000)

    window.addEventListener('resize', handleResize)
    setDevise()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { isMobile, isTable, isDesktop }
}
