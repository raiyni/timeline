import { useEffect } from "preact/hooks"

export type EventCallback = (e?: CustomEvent) => {}

const subscribe = (key: string, callback: EventCallback, target: any = document, options: any) => {
  if (!key) return undefined
  if (!callback) return undefined

  target.addEventListener(key, callback, options)

  return () => {
    target.removeEventListener(key, callback, options)
  }
}

export const publish = (key: string, detail: any = {}) => {
  const event = new CustomEvent(key, {
    detail
  })

  document.dispatchEvent(event)
}

// TODO: rename useEvent
const useBus = (key: string, callback: EventCallback, deps: any[] = []) => {
  useEffect(() => subscribe(key, callback, document, {}), deps)

  return publish
}

export const useEvent = (key: string, callback: EventCallback, target: any = document, options: any = {}) => {
  useEffect(() => subscribe(key, callback, target, options), [key, callback, target, JSON.stringify(options)])

  return publish
}

export default useBus
