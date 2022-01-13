import { useEffect, useRef, useState } from 'preact/hooks'

export const useResizeObserver = (elRef: any): number => {
  const [width, setWidth] = useState(0)

  const observer = useRef(
    new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect

      setWidth(width)
    })
  )

  useEffect(() => {
    if (elRef.current) {
      observer.current.observe(elRef.current)
    }

    return () => {
      observer.current.unobserve(elRef.current)
    }
  }, [elRef, observer])

  return width
}
