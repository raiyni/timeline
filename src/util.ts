import { Style } from "./types"

export const applyStyle = (el: any, style: Style): any => {
  Object.keys(style).forEach(k => {
    // el.style(k, style[k])
    el.attr(k, style[k])
  })
}

export const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, 0), 1)
}

// @ts-ignore
export const IS_IE = (() => document.documentMode || /Edge/.test(navigator.userAgent) || /Edg/.test(navigator.userAgent))()
