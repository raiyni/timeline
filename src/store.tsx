import { createContext } from 'preact'
import { Action, Actions } from './actions'
import { Highlight, PointerEvents, TaskOptions, Tick, VIEW_MODE } from './types'
import { calculateHeight } from './util/useProcessData'

interface State {
  tasks: TaskOptions[]
  viewMode: VIEW_MODE
  ticks: Tick[]
  minDate: Tick
  maxDate: Tick
  width: number
  scrollWidth: number
  height: number
  highlights: Highlight[]
  events: PointerEvents
  target?: EventTarget
  years?: number[]
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
  highlights: [],
  events: {},
  years: [],
  x: (tick: string | Tick) => 0
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
  switch (action.type) {
    case Actions.CHANGE_VIEW:
      if (!(Object.values(VIEW_MODE).indexOf(action.payload) > -1)) {
        console.error('View mode must be of type VIEW_MODE:', JSON.stringify(Object.values(VIEW_MODE)))
        return state
      }
      return {
        ...state,
        viewMode: action.payload
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
        tasks: action.payload
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
        maxDate
      }
    }
    case Actions.SET_SCROLL_WIDTH: {
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

      const height = calculateHeight(tasks)

      return {
        ...state,
        tasks: tasks,
        height: height
      }
    case Actions.SET_HIGHLIGHTS: {
      return {
        ...state,
        highlights: action.payload
      }
    }

    case Actions.SET_EVENTS: {
      return {
        ...state,
        events: {
          ...action.payload
        }
      }
    }

    case Actions.SET_YEARS: {
      return {
        ...state,
        years: action.payload
      }
    }
  }

  return state
}
