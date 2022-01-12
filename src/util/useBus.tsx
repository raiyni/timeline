import { useEffect } from "preact/hooks"

type eventCallback = (e?: CustomEvent) => {}

const subscribe = (key: string, callback: eventCallback) => {
  if (!key) return undefined
  if (!callback) return undefined

  document.addEventListener(key, callback)

  return () => {
    document.removeEventListener(key, callback)
  }
}

export const dispatch = (key: string, detail: any) => {
  const event = new CustomEvent(key, {
    detail
  })

  document.dispatchEvent(event)
}

const useBus = (key: string, callback: eventCallback, deps: any[] = []) => {
  useEffect(() => subscribe(key, callback), deps)

  return dispatch
}

export default useBus
