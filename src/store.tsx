import { createContext } from 'preact'
import { Action } from './actions'

interface State {
  array: any[]
}

export const DEFAULT_STATE: State = {
  array: []
}

export interface Store {
  state: State
  dispatch: any
}

export const Config = createContext({
  state: DEFAULT_STATE,
  dispatch: (_action: Action) => {}
})

export const reducer = (state: any, action: Action) => {
  switch(action.type) {
    case 'setData': {
      return {
        ...state,
        array: [...action.payload]
      }
    }

    case 'setOver': {
      const obj = state.array[action.payload.idx]
      obj.over = action.payload.value

      return {
        ...state
      }
    }
  }

  return state
}
