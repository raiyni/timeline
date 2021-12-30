import { Action, Actions } from './actions'
import { Highlight, PointerCallback, PointerEvents, TaskOptions, Tick, VIEW_MODE } from './types'

import { createContext } from 'preact'
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
  events: { [key: string]: PointerCallback }
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

export const EMPTY_EVENTS: PointerEvents = {
}

export const Events = createContext({
  state: EMPTY_EVENTS,
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
  }

  return state
}


export const eventsReducer = (state: any, action: Action) => {
  switch (action.type) {
    case Actions.SET_EVENTS: {
      const events =  action.payload
      for (let key in events) {

      }
      return state
    }

    case Actions.ADD_EVENT:
      return state
  }

  return state
}
