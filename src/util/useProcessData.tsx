import { Action, setTasks } from '../actions'
import {
  Arrow,
  BasePlanOptions,
  ColumnOptions,
  Icon,
  LabelOptions,
  Line,
  MilestoneOptions,
  PlanInputOptions,
  Shape,
  TaskInputOptions,
  TaskOptions,
  TimelineOptions,
  isArrow,
  isImage,
  isLine,
  isShape,
  obj,
} from './../types'

import { PlanOptions } from '../types'
import { changeView } from './../actions'
import { clamp } from './math'
import dayjs from 'dayjs'
// @ts-ignore
import flat from 'core-js-pure/features/array/flat'
// @ts-ignore
import from from 'core-js-pure/features/array/from'
import { useEffect } from 'preact/hooks'

const prepareLabel = (input: string | LabelOptions, defaults: LabelOptions = {} as LabelOptions): LabelOptions => {
  if (typeof input == 'string') {
    return {
      label: input,
      labelStyle: {
        ...defaults.labelStyle,
      },
      backgroundStyle: {
        ...defaults.backgroundStyle,
      },
    }
  }

  return {
    label: input.label,
    labelStyle: {
      ...defaults.labelStyle,
      ...input.labelStyle,
    },
    backgroundStyle: {
      ...defaults.backgroundStyle,
      ...input.backgroundStyle,
    },
  }
}

const preparePlan = (options: PlanInputOptions, defaults: PlanInputOptions): PlanOptions => {
  const plan: PlanOptions = {
    start: dayjs(options.start),
    end: dayjs(options.end),
    height: options.height || defaults.height || 30,
    progressStyle: {
      fill: '#f2c329',
      ...defaults.progressStyle,
      ...options.progressStyle,
    },
    backgroundStyle: {
      fill: '#acacac',
      ...defaults.backgroundStyle,
      ...options.backgroundStyle,
    },
  }

  if (options.label) {
    plan.label = prepareLabel(options.label, defaults.label)
  }

  if (options.startText) {
    plan.startText = prepareLabel(options.startText)
  }

  if (options.endText) {
    plan.endText = prepareLabel(options.endText)
  }

  const progress = options.progress || defaults.progress || 0
  if (typeof progress == 'number') {
    const diff = clamp(progress / 100, 0, 1) * (plan.end.unix() - plan.start.unix())
    plan.progress = dayjs.unix(plan.start.unix() + diff)
  } else {
    plan.progress = dayjs(options.progress)
  }

  return plan
}

const prepareIcon = (source: Icon): Icon => {
  const copy: Icon = {
    ...source,
  }

  if (source.date) {
    copy.date = dayjs(source.date)
  }

  return copy
}

const prepareLine = (source: Line): Line => {
  return {
    ...source,
    start: dayjs(source.start),
    end: dayjs(source.end),
  }
}

const prepareArrow = (source: Arrow): Arrow => {
  const arrow: Arrow = {
    ...source,
    start: dayjs(source.start),
    end: dayjs(source.end),
  }

  if (source.startIcon) {
    arrow.startIcon = prepareIcon(source.startIcon)
  }

  if (source.endIcon) {
    arrow.endIcon = prepareIcon(source.endIcon)
  }

  return arrow
}

const prepareShape = (source: Shape): Shape => {
  return {
    ...source,
    date: dayjs(source.date),
  }
}

const prepareMilestone = (options: MilestoneOptions, config: TimelineOptions): MilestoneOptions => {
  if (isImage(options)) {
    return {
      x: options.x,
      y: options.y,
      ...prepareIcon(options),
    }
  }

  if (isLine(options)) {
    return prepareLine(options)
  }

  if (isArrow(options)) {
    return prepareArrow(options as Arrow)
  }

  if (isShape(options)) {
    return prepareShape(options)
  }

  return options
}

const prepareColumns = (task: TaskInputOptions, config: ColumnOptions[], plans: number): { [key: string]: LabelOptions[] } => {
  const labels: { [key: string]: LabelOptions[] } = {}

  config.forEach((c: ColumnOptions) => {
    let options = task[c.field] || []

    if (!Array.isArray(options)) {
      options = [options]
    }

    if (options.length < plans) {
      options = options.concat((new Array(plans - options.length)).fill({}))
    }

    (options as obj[]).forEach((v: any, idx: number) => {
      if (typeof v == 'string' || typeof v == 'number') {
        v = { label: v }
      }

      options[idx] = v
      // if (v.icons) {
      //   if (!Array.isArray(v.icons)) {
      //     v.icons = [v.icons]
      //   }
      // }

      let defaults = c.defaults || {}
      if (Array.isArray(defaults)) {
        defaults = defaults[idx] || {}
      }

      v.labelStyle = {
        ...defaults.labelStyle,
        ...v.labelStyle
      }

      v.backgroundStyle = {
        ...defaults.backgroundStyle,
        ...v.backgroundStyle
      }
    })

    labels[c.field] = options
  })

  return labels
}

const prepareTask = (options: TaskInputOptions, config: TimelineOptions): TaskOptions => {
  const task: TaskOptions = {}

  const planDefaults: BasePlanOptions | BasePlanOptions[] = config.planDefaults || {}

  if (options.plan) {
    task.plans = [[preparePlan(options.plan, (planDefaults as BasePlanOptions[])[0] || {})]]
  } else if (options.plans && Array.isArray(options.plans)) {
    // @ts-ignore
    task.plans = options.plans.map((p: PlanInputOptions | PlanInputOptions[], idx: number) => {
      if (!Array.isArray(p)) {
        if (Array.isArray(planDefaults)) {
          return [preparePlan(p, planDefaults[idx] || {})]
        }

        return [preparePlan(p, planDefaults)]
      }

      return p.map((pl: PlanInputOptions) => {
        if (Array.isArray(planDefaults)) {
          return preparePlan(pl, planDefaults[idx] || {})
        }

        return preparePlan(pl, planDefaults)
      })
    })
  } else if (options.plans) {
    console.error('Plans object is not an array')
  }

  task.milestones = []
  if (options.milestones && Array.isArray(options.milestones)) {
    task.milestones = (options.milestones as MilestoneOptions[]).map((m: MilestoneOptions) => {
      if (!Array.isArray(m)) {
        return [prepareMilestone(m, config)]
      }

      return m.map((ml: MilestoneOptions) => prepareMilestone(ml, config))
    })
  }

  if (task.milestones.length > task.plans.length) {
    const fill: PlanOptions[][] = from({ length: task.milestones.length - task.plans.length }, (): PlanOptions[] => [])
    task.plans = (task.plans as PlanOptions[][]).concat(fill)
  } else if (task.plans.length > task.milestones.length) {
    const fill: MilestoneOptions[][] = from({ length: task.plans.length - task.milestones.length }, (): MilestoneOptions[] => [])
    task.milestones = (task.milestones as MilestoneOptions[][]).concat(fill)
  }

  task.heights = task.plans.map((pos: PlanOptions[]) => Math.max.apply(null, pos.map((p: PlanOptions) => p.height)))

  if (config.columns && config.columns.length > 0) {
    task.labels = prepareColumns(options, config.columns, task.plans.length)
  }

  // TODO: apply default heights to missing plans

  return task
}

export const useProcessData = (dispatch: (_action: Action) => void, data: TaskInputOptions[], config: TimelineOptions) => {
  useEffect(() => {
    if (config.viewMode) {
      dispatch(changeView(config.viewMode))
    }

    const tasks = data.map((t) => prepareTask(t, config))
    // tasks.push({planes: [], labels: {}})

    dispatch(setTasks(tasks))
  }, [data, config])
}
