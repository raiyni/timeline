import { useEffect, useRef, useState } from "preact/hooks"

import ResizeObserver from "resize-observer-polyfill"

type Size = [number, number]
export const useResizeObserver = (elRef: any): Size => {

  const [size, setSize] = useState([0, 0] as Size)

  const observer = useRef(
    new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect

      setSize([width, height])
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

  return size
}
