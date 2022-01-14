import { createContext } from "preact";
import { useContext, useEffect } from "preact/hooks";

export type EventCallback = (e: CustomEvent) => void

interface Bus {
  target?: EventTarget
  on?: (key: string, callback: EventCallback, options?: any) => void
  off?: (key: string, callback: EventCallback) => void
  publish?: (key: string, detail?: any) => void
  useEvent?: (key: string, callback: EventCallback, options?: any) => void
  useDomEvent?: (key: string, callback: EventCallback, target?: EventTarget, options?: any, ...args: any[]) => void
}

const on = (target: EventTarget, key: string, callback: EventCallback, options = {}) => {
  if (!key) return
  if (!callback) return
  if (!target) return

  target.addEventListener(key, callback, options)
}

const off = (target: EventTarget, key: string, callback: EventCallback, options = {}) => {
  if (!target) return

  target.removeEventListener(key, callback, options)
}

export const createBusConfig = (): Bus => {
  const target = new EventTarget()
  return {
    target,
    on: (key: string, callback: EventCallback, options = {}) => {
      on(target, key, callback, options)
    },
    off: (key: string, callback: EventCallback) => {
      off(target, key, callback)
    },
    publish: (key: string, detail = {}) => {
      const event = new CustomEvent(key, {
        detail
      })
      target.dispatchEvent(event)
    },
    useEvent: (key: string, callback: EventCallback, options = {}) => {
      useEffect(() => {
        on(target, key, callback, options)

        return () => off(target, key, callback)
      }, [key, callback, target, JSON.stringify(options)])
    },
    useDomEvent: (key: string, callback: EventCallback, target = document, options = {}) => {

      useEffect(() => {
        on(target, key, callback, options)

        return () => off(target, key, callback)
      }, [key, callback, target, JSON.stringify(options)])
    }
  }
}

export const EventBus = createContext({} as Bus)

export const reducer = (state: any, action: any) => {
  return state
}

export const useEventBus = () => useContext(EventBus)
