import { useEffect } from "preact/hooks"

export type EventCallback = (e?: CustomEvent) => {}

const subscribe = (key: string, callback: EventCallback) => {
  if (!key) return undefined
  if (!callback) return undefined

  document.addEventListener(key, callback)

  return () => {
    document.removeEventListener(key, callback)
  }
}

export const publish = (key: string, detail: any = {}) => {
  const event = new CustomEvent(key, {
    detail
  })

  document.dispatchEvent(event)
}

const useBus = (key: string, callback: EventCallback, deps: any[] = []) => {
  useEffect(() => subscribe(key, callback), deps)

  return publish
}

export default useBus
