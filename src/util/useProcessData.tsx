import { Action, setHeight, setHighlights, setTasks } from '../actions'
import {
  Arrow,
  BasePlanOptions,
  ColumnOptions,
  Highlight,
  Icon,
  LabelOptions,
  Line,
  MilestoneOptions,
  PlanInputOptions,
  Shape,
  ShapeType,
  Text,
  TaskInputOptions,
  TaskOptions,
  TimelineOptions,
  isArrow,
  isImage,
  isLine,
  isShape,
  obj,
  isText
} from './../types'
import { clamp, uid } from './math'

import { PlanOptions } from '../types'
import { changeView } from './../actions'
import dayjs from 'dayjs'
import { useEffect } from 'preact/hooks'

const dayjsF = (input: string, format: string) => {
  if (format) {
    return dayjs(input, format)
  }

  return dayjs(input)
}

const prepareLabel = (input: string | LabelOptions, defaults: LabelOptions, config: TimelineOptions): LabelOptions => {
  if (typeof input == 'string') {
    return {
      ...defaults,
      label: input,
      alignmentStyle: {
        ...defaults.alignmentStyle
      },
      labelStyle: {
        ...defaults.labelStyle
      },
      backgroundStyle: {
        ...defaults.backgroundStyle
      }
    }
  }

  const obj: LabelOptions = {
    alignment: 'left',
    ...defaults,
    ...input,
    alignmentStyle: {
      ...defaults.alignmentStyle,
      ...input.alignmentStyle
    },
    labelStyle: {
      ...defaults.labelStyle,
      ...input.labelStyle
    },
    backgroundStyle: {
      ...defaults.backgroundStyle,
      ...input.backgroundStyle
    }
  }

  if (input.icons || defaults.icons) {
    let icons = input.icons || defaults.icons
    if (!Array.isArray(icons)) {
      icons = [icons]
    }

    obj.icons = icons.map((i: Icon) => prepareIcon(i, config))
  }

  return obj
}

const preparePlan = (options: PlanInputOptions, defaults: PlanInputOptions, config: TimelineOptions): PlanOptions => {
  const plan: PlanOptions = {
    start: dayjsF(options.start, options.dateFormat || defaults.dateFormat || config.dateFormat),
    end: dayjsF(options.end, options.dateFormat || defaults.dateFormat || config.dateFormat),
    height: options.height || defaults.height || 30,
    y: options.y || defaults.y || 0,
    progressStyle: {
      fill: '#f2c329',
      ...defaults.progressStyle,
      ...options.progressStyle
    },
    backgroundStyle: {
      fill: '#acacac',
      ...defaults.backgroundStyle,
      ...options.backgroundStyle
    }
  }

  const progress = options.progress || defaults.progress || 0
  if (typeof progress == 'number') {
    const diff = clamp(progress / 100, 0, 1) * (plan.end.unix() - plan.start.unix())
    plan.progress = dayjs.unix(plan.start.unix() + diff)
  } else {
    plan.progress = dayjsF(options.progress as string, options.dateFormat || defaults.dateFormat || config.dateFormat)
  }

  return plan
}

const prepareIcon = (source: Icon, config: TimelineOptions): Icon => {
  const copy: Icon = {
    width: 15,
    height: 15,
    rotate: 0,
    ...source
  }

  if (source.date) {
    copy.date = dayjsF(source.date as string, source.dateFormat || config.dateFormat)
  }

  return copy
}

const prepareLine = (source: Line, config: TimelineOptions): Line => {
  return {
    style: {
      stroke: 'black',
      strokeWidth: 2,
      ...source.style
    },
    start: dayjsF(source.start as string, source.dateFormat || config.dateFormat),
    end: dayjsF(source.end as string, source.dateFormat || config.dateFormat)
  }
}

const prepareArrow = (source: Arrow, config: TimelineOptions): Arrow => {
  const arrow: Arrow = {
    shape: ShapeType.ARROW,
    style: {
      stroke: 'black',
      strokeWidth: 2,
      ...source.style
    },
    start: dayjsF(source.start as string, source.dateFormat || config.dateFormat),
    end: dayjsF(source.end as string, source.dateFormat || config.dateFormat)
  }

  return arrow
}

const prepareShape = (source: Shape, config: TimelineOptions): Shape => {
  return {
    width: 15,
    height: 15,
    ...source,
    date: dayjsF(source.date as string, source.dateFormat || config.dateFormat),
    style: {
      stroke: '#000',
      fill: '#fff',
      strokeWidth: 2,
      strokeLinejoin: 'miter',
      ...source.style
    }
  }
}

const prepareText = (source: Text, config: TimelineOptions): Text => {
  return {
    ...source,
    date: dayjsF(source.date as string, source.dateFormat || config.dateFormat),
    style: {
      dominantBaseline: 'middle',
      textAnchor: 'middle',
      ...source.style
    }
  }
}

const prepareMilestone = (options: MilestoneOptions, config: TimelineOptions): MilestoneOptions => {
  if (isImage(options)) {
    return {
      x: options.x,
      y: options.y,
      ...prepareIcon(options, config)
    }
  }

  if (isLine(options)) {
    return prepareLine(options, config)
  }

  if (isArrow(options)) {
    return prepareArrow(options as Arrow, config)
  }

  if (isShape(options)) {
    return prepareShape(options, config)
  }

  if (isText(options)) {
    return prepareText(options, config)
  }

  return options
}

const prepareColumns = (task: TaskInputOptions, config: TimelineOptions): { [key: string]: LabelOptions[] } => {
  const labels: { [key: string]: LabelOptions[] } = {}
  const columns = config.columns

  columns.forEach((c: ColumnOptions) => {
    let options = task[c.field] || []

    if (!Array.isArray(options)) {
      options = [options]
    }

    ;(options as obj[]).forEach((v: any, idx: number) => {
      if (typeof v == 'string' || typeof v == 'number') {
        v = { label: v }
      }

      let defaults = c.defaults || {}
      if (Array.isArray(defaults)) {
        defaults = defaults[idx] || {}
      }

      options[idx] = prepareLabel(v, defaults as LabelOptions, config)
    })

    labels[c.field] = options
  })

  return labels
}

const prepareTask = (options: TaskInputOptions, config: TimelineOptions): TaskOptions => {
  const task: TaskOptions = {}
  task.properties = options

  const planDefaults: BasePlanOptions | BasePlanOptions[] = config.planDefaults || {}

  task.plans = []
  task.milestones = []

  if (config.prepareTask) {
    config.prepareTask(options)
  }

  if (options.plan) {
    task.plans = task.plans.concat([[preparePlan(options.plan, (planDefaults as BasePlanOptions[])[0] || {}, config)]])
  } else if (options.plans && Array.isArray(options.plans)) {
    // @ts-ignore
    task.plans = task.plans.concat(
      options.plans.map((p: PlanInputOptions | PlanInputOptions[], idx: number) => {
        if (!Array.isArray(p)) {
          if (Array.isArray(planDefaults)) {
            return [preparePlan(p, planDefaults[idx] || {}, config)]
          }

          return [preparePlan(p, planDefaults, config)]
        }

        return p.map((pl: PlanInputOptions) => {
          if (Array.isArray(planDefaults)) {
            return preparePlan(pl, planDefaults[idx] || {}, config)
          }

          return preparePlan(pl, planDefaults, config)
        })
      })
    )
  }

  if (options.milestones && Array.isArray(options.milestones)) {
    task.milestones = task.milestones.concat(
      (options.milestones as MilestoneOptions[]).map((m: MilestoneOptions) => {
        if (!Array.isArray(m)) {
          return [prepareMilestone(m, config)]
        }

        return m.map((ml: MilestoneOptions) => prepareMilestone(ml, config))
      })
    )
  }

  if (config.columns && config.columns.length > 0) {
    task.labels = prepareColumns(options, config)
  }

  if (config.processTask) {
    config.processTask(task)
  }

  fillPlans(task)
  fillMilestones(task)
  fillColumns(task, config)

  task.heights = createTaskHeights(task)

  task.collapsed = options.collapsed
  task.collapsible = options.collapsible
  task.id = uid()

  return task
}

const maxRows = (task: TaskOptions): number => {
  let max = Math.max(task.plans.length, task.milestones.length)
  if (task.labels) {
    const maxRows = Math.max.apply(
      null,
      Object.values(task.labels).map((o) => o.length)
    )
    return Math.max(max, maxRows)
  }

  return max
}

const fill = <T extends unknown>(length: number, filler: () => T): T[] => {
  return Array.from({ length }, filler)
}

const fillPlans = (task: TaskOptions) => {
  const max = maxRows(task)

  if (max > task.plans.length) {
    task.plans = task.plans.concat(fill(max - task.plans.length, () => []))
  }
}

const fillMilestones = (task: TaskOptions) => {
  const max = maxRows(task)

  if (max > task.milestones.length) {
    task.milestones = task.milestones.concat(fill(max - task.milestones.length, () => []))
  }
}

const fillColumns = (task: TaskOptions, config: TimelineOptions) => {
  if (!task.labels) {
    return
  }

  const max = maxRows(task)

  const columnOptions: { [key: string]: ColumnOptions } = {}
  config.columns.forEach((c) => (columnOptions[c.field] = c))

  Object.entries(task.labels).forEach(([key, value]) => {
    const options = columnOptions[key]
    if (value.length < max) {
      const diff = max - value.length
      const startIdx = value.length

      task.labels[key] = value.concat(fill(diff, () => ({} as LabelOptions)))
      for (let idx = startIdx; idx < task.labels[key].length; idx++) {
        let defaults = options.defaults || {}
        if (Array.isArray(defaults)) {
          defaults = defaults[idx] || {}
        }

        task.labels[key][idx] = prepareLabel(task.labels[key][idx], defaults as LabelOptions, config)
      }
    }
  })
}

const createTaskHeights = (task: TaskOptions): number[] => {
  const planHeights = task.plans.map((pos: PlanOptions[]) =>
    Math.max.apply(
      null,
      pos.map((p: PlanOptions) => (p.y ? p.height + p.y : p.height))
    )
  )

  const milestoneHeights = task.milestones.map((pos: MilestoneOptions[]) =>
    Math.max.apply(
      null,
      pos.map((p: any) => p.height || 20)
    )
  )

  return planHeights.map((n: number, idx: number) => Math.max(clampHeight(n), clampHeight(milestoneHeights[idx])))
}

const prepareHighlights = (config: TimelineOptions): Highlight[] => {
  if (!config.highlights || !Array.isArray(config.highlights)) {
    return []
  }

  return config.highlights.map((h: Highlight) => {
    return {
      fill: h.fill,
      headerOnly: !!h.headerOnly,
      start: dayjs(h.start, h.dateFormat || config.dateFormat),
      end: dayjs(h.end, h.dateFormat || config.dateFormat)
    }
  })
}

const clampHeight = (h: number) => {
  if (h < 0) {
    return 20
  }

  return h
}

export const calculateHeight = (tasks: TaskOptions[]) => {
  // 68 = header (30) + fake row (20) + scrollbar (18)
  return (
    68 +
    tasks
      .map((t: TaskOptions) => (t.collapsed ? [t.heights[0]] : t.heights))
      .flat(3)
      .reduce((a: number, b: number) => a + b, 0) +
    tasks.length * 2
  )
}

export const useProcessData = (dispatch: (_action: Action) => void, data: TaskInputOptions[], config: TimelineOptions) => {
  useEffect(() => {
    if (config.viewMode) {
      dispatch(changeView(config.viewMode))
    }

    const tasks = data.map((t) => prepareTask(t, config))
    const height = calculateHeight(tasks)

    dispatch(setTasks(tasks))
    dispatch(setHeight(height))

    const highlights = prepareHighlights(config)
    dispatch(setHighlights(highlights))
  }, [data, config])
}
