import { Style } from "./types"

export const applyStyle = (el: any, style: Style, attr: boolean = true): any => {
  Object.keys(style).forEach(k => {
    if (!attr) el.style(k, style[k])
    else el.attr(k, style[k])
  })
}

export const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, 0), 1)
}

// @ts-ignore
export const IS_IE = (() => document.documentMode || /Edge/.test(navigator.userAgent) || /Edg/.test(navigator.userAgent))()

export const uid = () => {
  const data = new Uint32Array(1)
  crypto.getRandomValues(data)

  return data[0] + '';
}


export function debounce (fn: any, wait: number): any {
  let t: NodeJS.Timeout
  return function () {
    clearTimeout(t)
    t = setTimeout(function() {
      fn.call(arguments)
    }, wait)
  }
}
