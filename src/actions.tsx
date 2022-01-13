import { Highlight, PointerCallback, TaskOptions, Tick, VIEW_MODE } from './types'

import dayjs from 'dayjs'

export enum Actions {
  CHANGE_VIEW,
  SET_WIDTH,
  SET_HEIGHT,
  UPDATE_TICKS,
  SET_TASKS,
  SET_DATES,
  SET_SCROLL_WIDTH,
  SET_X,
  TOGGLE_TASK,
  SET_HIGHLIGHTS,
  SET_EVENTS,
  ADD_EVENT,
  SET_YEARS
}

export interface Action {
  type: Actions
  payload: any
}

const createAction = (action: Actions, payload: any) => {
  return { type: action, payload }
}

export const changeView = (viewMode: VIEW_MODE): Action => {
  return createAction(Actions.CHANGE_VIEW, viewMode)
}

export const setWidth = (width: number): Action => {
  return createAction(Actions.SET_WIDTH, width)
}

export const setHeight = (height: number): Action => {
  return createAction(Actions.SET_HEIGHT, height)
}

export const updateTicks = (ticks: dayjs.Dayjs[]): Action => {
  return createAction(Actions.UPDATE_TICKS, ticks)
}

export const setTasks = (data: TaskOptions[]): Action => {
  return createAction(Actions.SET_TASKS, data)
}

export const setDates = (minDate: Tick, maxDate: Tick): Action => {
  return createAction(Actions.SET_DATES, { minDate, maxDate })
}

export const setScrollWidth = (width: number): Action => {
  return createAction(Actions.SET_SCROLL_WIDTH, width)
}

export const setX = (scrollWidth: number, minDate: Tick, maxDate: Tick): Action => {
  return createAction(Actions.SET_X, (tick: Tick) => interpolate(scrollWidth, minDate, maxDate, tick))
}

export const toggleTask = (id: string): Action => {
  return createAction(Actions.TOGGLE_TASK, id)
}

export const setHighlights = (highlights: Highlight[]): Action => {
  return createAction(Actions.SET_HIGHLIGHTS, highlights)
}

export const setEvents = (events: any): Action => {
  return createAction(Actions.SET_EVENTS, events)
}

export const addEvent = (key: string, callback: PointerCallback): Action => {
  return createAction(Actions.ADD_EVENT, { key, callback })
}

export const setYears = (years: number[]): Action => {
  return createAction(Actions.SET_YEARS, years)
}

export const interpolate = (width: number, start: Tick, end: Tick, input: Tick): number => {
  const distance = end.diff(start)
  const inputDistance = input.diff(start)
  const ratio = inputDistance / distance

  return width * ratio
}

export const deinterpolate = (width: number, start: Tick, end: Tick, x: number): Tick => {
  const ratio = x / width
  const distance = end.diff(start)

  const inputDistance = ratio * distance
  return start.add(inputDistance, 'millisecond')
}
