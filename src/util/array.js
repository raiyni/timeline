export const fill = (arr, obj) => {
  if (Array.prototype.fill) {
    return arr.fill(obj)
  }

  for (let i = 0; i < arr.length; i++) {
  }
}
