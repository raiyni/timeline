import { Fragment, h } from 'preact'
import { TaskOptions, Tick, VIEW_MODE } from './types'
import { interpolate, setDates, setScrollWidth, setX, updateTicks } from './actions'
import { useContext, useEffect } from 'preact/hooks'

import { Config } from './store'
import dayjs from 'dayjs'
// @ts-ignore
import flat from 'core-js-pure/features/array/flat'

const getModeWidth = (viewMode: VIEW_MODE): number => {
  switch (viewMode) {
    case VIEW_MODE.DAY:
      return 96
    case VIEW_MODE.WEEK:
      return 128
    case VIEW_MODE.MONTH:
      return 200
    case VIEW_MODE.YEAR:
      return 300
  }

  return -1
}

const toDayjsUnit = (viewMode: VIEW_MODE): dayjs.OpUnitType => {
  switch (viewMode) {
    case VIEW_MODE.DAY:
      return 'day'

    case VIEW_MODE.WEEK:
      return 'week'

    case VIEW_MODE.MONTH:
      return 'month'

    case VIEW_MODE.YEAR:
      return 'year'
  }

  return 'day'
}

const nextDate = (viewMode: VIEW_MODE, date: dayjs.Dayjs) => {
  switch (viewMode) {
    case VIEW_MODE.DAY:
      return date.add(1, 'day')
    case VIEW_MODE.MONTH:
      return date.add(1, 'month')
    case VIEW_MODE.WEEK:
      return date.add(1, 'week')
    case VIEW_MODE.YEAR:
      return date.add(1, 'year')
  }

  return date.add(1, 'day')
}

const startDate = (viewMode: VIEW_MODE, date: Tick) => {
  switch (viewMode) {
    case VIEW_MODE.DAY:
      return date.subtract(1, 'day')
    case VIEW_MODE.MONTH:
      return date.subtract(1, 'month')
    case VIEW_MODE.WEEK:
      return date.subtract(1, 'week')
    case VIEW_MODE.YEAR:
      return date.subtract(3, 'month')
  }

  return date.subtract(1, 'day')
}

const getBoundingDates = (
  tasks: TaskOptions[]
): { minDate: Tick; maxDate: Tick } => {
  const milestones = flat(
    tasks.map((t) => t.milestones),
    4
  )
  const plans = flat(
    tasks.map((t) => t.plans),
    4
  )

  const milestoneDates = flat(
    milestones.map((m: any) => m.date || [m.start, m.end]),
    2
  )
  const startDates = plans.map((p: any) => p.start).concat(milestoneDates)
  const endDates = plans.map((p: any) => p.end).concat(milestoneDates)

  const minDate = dayjs.min(startDates)
  const maxDate = dayjs.max(endDates)

  return { minDate, maxDate }
}

export const Axis = (props: any) => {
  const store = useContext(Config)
  const state = store.state

  useEffect(() => {
    if (state.tasks.length == 0 || !state.width) {
      return
    }

    let { minDate, maxDate } = getBoundingDates(state.tasks)

    minDate = startDate(state.viewMode, minDate)

    const diff = Math.floor(maxDate.diff(minDate, toDayjsUnit(state.viewMode))) + 1
    const modeWidth = getModeWidth(state.viewMode)

    let scrollWidth = modeWidth * diff
    console.log(diff, modeWidth, scrollWidth, state.width)
    if (scrollWidth < state.width) {
      scrollWidth = state.width
    }

    const ticks = []
    let currentTick = nextDate(state.viewMode, minDate)

    const referenceDate = currentTick.clone()
    while (interpolate(modeWidth, minDate, referenceDate, currentTick) < scrollWidth) {
      ticks.push(currentTick)
      currentTick = nextDate(state.viewMode, currentTick)
    }

    store.dispatch(setX(modeWidth, minDate, referenceDate))
    store.dispatch(setScrollWidth(scrollWidth))
    store.dispatch(setDates(minDate, maxDate))
    store.dispatch(updateTicks(ticks))
  }, [state.tasks, state.width, state.viewMode])


  return <Fragment>{props.children}</Fragment>
}
