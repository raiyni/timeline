import EventBus from './EventBus';
import dayjs from 'dayjs'

export type Style = {[key: string]: any;}
export type obj = { [key: string]: any }

export interface BasePlanOptions {
  height?: number
  progressStyle?: Style
  backgroundStyle?: Style
  labelStyle?: Style
}

export type PlanOptions = BasePlanOptions & {
  start: string | dayjs.Dayjs
  end: string | dayjs.Dayjs
  progress: number
  label?: string
  name?: LabelOptions
  startText?: LabelOptions
  endText?: LabelOptions
}

export enum ShapeType {
  SQUARE = 'square',
  CIRCLE = 'circle',
  TRIANGLE = 'triangle',
  ARROW = 'arrow',
  STAR = 'star'
}

export interface Image {
  date: string | dayjs.Dayjs
  href: string
  width: number
  height: number
  style?: Style
}

export const isImage = (obj: any): obj is Image => {
  return 'href' in obj
}

export interface Shape  {
  date: string | dayjs.Dayjs
  shape: ShapeType
  width: number
  height: number
  rotate?: number
  style?: Style
}

export const isShape = (obj: any): obj is Shape => {
  return 'shape' in obj
}

export interface Line {
  start: string | dayjs.Dayjs
  end: string | dayjs.Dayjs
  style?: Style
}

export const isLine = (obj: any): obj is Line => {
  return 'start' in obj && 'end' in obj
}

export type MilestoneOptions = {
  x?: number
  y?: number
} & (Image | Shape | Line)

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
  defaults?: obj | obj[]
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
  planDefaults?: BasePlanOptions | BasePlanOptions[]
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
