
export enum Actions {
}

export interface Action {
  type: any
  payload: any
}


const createAction = (action: any, payload: any) => {
  return { type: action, payload }
}


export const setData = (payload: any) => {
  return createAction('setData', payload)
}

export const setOver = (idx: any, payload: any) => {
  return createAction('setOver', {idx, value: payload})
}
