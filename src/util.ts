import { Style } from "./types"

export const applyStyle = (el: any, style: Style): any => {
  Object.keys(style).forEach(k => {
    el.style(k, style[k])
  })
}

export const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, 0), 1)
}
