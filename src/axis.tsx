import dayjs from 'dayjs'
import { Fragment, h } from 'preact'
import { useContext, useEffect } from 'preact/hooks'
import { deinterpolate, interpolate, setDates, setScrollWidth, setX, setYears, updateTicks } from './actions'
import { Config } from './store'
import { TaskOptions, Tick, VIEW_MODE } from './types'

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

const nextDate = (viewMode: VIEW_MODE, date: dayjs.Dayjs, step: number = 1) => {
  switch (viewMode) {
    case VIEW_MODE.DAY:
      return date.add(step, 'day')
    case VIEW_MODE.MONTH:
      return date.add(step, 'month')
    case VIEW_MODE.WEEK:
      return date.add(step, 'week')
    case VIEW_MODE.YEAR:
      return date.add(step, 'year')
  }

  return date.add(step, 'day')
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

const getBoundingDates = (tasks: TaskOptions[]): { minDate: Tick; maxDate: Tick } => {
  const milestones = tasks.map((t) => t.milestones).flat(4)
  const plans = tasks.map((t) => t.plans).flat(4)
  const milestoneDates = milestones.map((m: any) => m.date || [m.start, m.end]).flat(2)
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
    let modeWidth = getModeWidth(state.viewMode)

    let scrollWidth = modeWidth * diff
    if (scrollWidth < state.width) {
      scrollWidth = state.width
    }

    const ticks = []
    let step = 1
    if (state.viewMode == VIEW_MODE.FIT) {
      const stepDate = deinterpolate(scrollWidth, minDate, maxDate, 100)
      step = stepDate.diff(minDate, 'day')
      modeWidth = scrollWidth
    }

    let currentTick = nextDate(state.viewMode, minDate, step)
    const referenceDate = state.viewMode == VIEW_MODE.FIT ? maxDate : currentTick.clone()
    const years = []
    while (interpolate(modeWidth, minDate, referenceDate, currentTick) < scrollWidth) {
      ticks.push(currentTick)
      const nextTick = nextDate(state.viewMode, currentTick, step)

      if (nextTick.year() != currentTick.year()) years.push(nextTick.year())
      currentTick = nextTick
    }

    store.dispatch(setX(modeWidth, minDate, referenceDate))
    store.dispatch(setScrollWidth(scrollWidth))
    store.dispatch(setDates(minDate, maxDate))
    store.dispatch(updateTicks(ticks))
    store.dispatch(setYears(years))
  }, [state.tasks, state.width, state.viewMode])

  return <Fragment>{props.children}</Fragment>
}
