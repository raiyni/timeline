import { Action, Actions, interpolate } from './actions'
import { PlanOptions, TaskOptions, Tick, VIEW_MODE } from './types'

import { createContext } from 'preact'

interface State {
  tasks: TaskOptions[]
  viewMode: VIEW_MODE
  ticks: Tick[]
  minDate: Tick
  maxDate: Tick
  width: number
  scrollWidth: number
  height: number
  x: (tick: string | Tick) => number
}

export const DEFAULT_STATE: State = {
  tasks: [],
  viewMode: VIEW_MODE.MONTH,
  ticks: [],
  minDate: null,
  maxDate: null,
  width: 0,
  scrollWidth: 0,
  height: 0,
  x: (tick: string | Tick) => 0
}

export const Config = createContext({
  state: DEFAULT_STATE,
  dispatch: (_action: Action) => {}
})

export const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case Actions.CHANGE_VIEW:
      return {
        ...state,
        viewMode: action.payload,
      }
    case Actions.SET_WIDTH:
      return {
        ...state,
        width: action.payload
      }
    case Actions.SET_HEIGHT:
      return {
        ...state,
        height: action.payload
      }
    case Actions.SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      }
    case Actions.UPDATE_TICKS:
      return {
        ...state,
        ticks: action.payload
      }
    case Actions.SET_DATES: {
      const { minDate, maxDate } = action.payload
      return {
        ...state,
        minDate,
        maxDate,
      }
    }
    case Actions.SET_SCROLL_WIDTH:
      {
        return {
          ...state,
          scrollWidth: action.payload
        }
      }
    case Actions.SET_X:
      return {
        ...state,
        x: action.payload
      }
    case Actions.TOGGLE_TASK:
      const tasks = state.tasks
      const task = tasks.find((t: TaskOptions) => t.id == action.payload)
      task.collapsed = !!!task.collapsed

      return {
        ...state,
        tasks: tasks
      }
  }

  return state
}
