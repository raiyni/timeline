import EventBus from './EventBus';
import dayjs from 'dayjs'

export type Style = {[key: string]: any;}
export type obj = { [key: string]: any }

export interface PlanOptions {
  start: string | dayjs.Dayjs
  end: string | dayjs.Dayjs
  progress: number
  height?: number
  label?: string
  progressStyle?: Style
  backgroundStyle?: Style
  labelStyle?: Style
  name?: LabelOptions
  startText?: LabelOptions
  endText?: LabelOptions
}

export interface MilestoneOptions {
  date: string | dayjs.Dayjs
  href?: string
  width: number
  height: number
  y?: number
  style?: Style
}

export interface TaskOptions {
  collapsible?: boolean
  collapsed?: boolean
  plan ?: PlanOptions
  plans : PlanOptions[] | PlanOptions[][]
  milestones ?: MilestoneOptions[] | MilestoneOptions[][]
}

export interface ColumnOptions {
  text: string
  field: string
  padding?: number
  defaults?: obj
  taskMargin?: number
}

export interface Sides {
  left: number
  right: number
  top: number
  bottom: number
}

export interface Highlight {
  start: dayjs.Dayjs | string
  end: dayjs.Dayjs | string
  fill: string
  headerOnly?: boolean
}

export interface TimelineOptions {
  columns: Array<ColumnOptions>
  planDefaults?: PlanOptions
  viewMode ?: VIEW_MODE,
  taskMargin ?: number
  wrapper?: any
  highlights?: Highlight[]
  eventbus: EventBus
}

export interface Rect {
  width?: number
  height?: number
  x?: number
  y?: number
}

export interface Offset {
  x: number,
  y: number
}

export interface LabelOptions {
  label: string
  labelStyle?: any
  backgroundStyle?: any
}

export enum VIEW_MODE {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  FILL = 'fill'
}
