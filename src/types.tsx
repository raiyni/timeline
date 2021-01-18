import dayjs from "dayjs"

export enum VIEW_MODE {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  FILL = 'fill',
}

export type Style = {[key: string]: any;}
export type obj = { [key: string]: any }
export type Tick = dayjs.Dayjs

export interface BasePlanOptions {
  height?: number
  progressStyle?: Style
  backgroundStyle?: Style
  labelStyle?: Style
}

export type PlanOptions = BasePlanOptions & {
  start?: Tick
  end?: Tick
  progress?: Tick
  label?: LabelOptions
  startText?: LabelOptions
  endText?: LabelOptions
}

export type PlanInputOptions = BasePlanOptions & {
  start?: string
  end?: string
  progress?: number | string
  label?: LabelOptions
  startText?: LabelOptions
  endText?: LabelOptions
}

export enum ShapeType {
  SQUARE = 'square',
  CIRCLE = 'circle',
  TRIANGLE = 'triangle',
  ARROW = 'arrow',
  STAR = 'star',
  DASH = 'dash'
}

export interface Image {
  date?: string | Tick
  href?: string
  width?: number
  height?: number
  style?: Style
  skew?: 'left' | 'right'
}

export const isImage = (obj: any): obj is Image => {
  return 'href' in obj
}

export interface Arrow {
  shape?: ShapeType.ARROW
  start?: string | Tick
  end?: string | Tick
  startIcon?: Icon
  endIcon?: Icon,
  style?: Style
}

export const isArrow = (obj: any): obj is Shape => {
  return obj.shape === ShapeType.ARROW
}

export interface Shape  {
  date?: string | Tick
  shape?: ShapeType
  width?: number
  height?: number
  rotate?: number
  skew?: 'left' | 'right'
  style?: Style
}

export const isShape = (obj: any): obj is Shape => {
  return 'shape' in obj && obj.shape != ShapeType.ARROW
}

export interface Line {
  start?: string | Tick
  end?: string | Tick
  style?: Style
}

export const isLine = (obj: any): obj is Line => {
  return 'start' in obj && 'end' in obj && !('shape' in obj)
}

export type Icon = Image | Shape

export type MilestoneOptions = {
  x?: number
  y?: number
} & (Icon | Line | Arrow)

export type TaskOptions  = obj & {
  collapsible?: boolean
  collapsed?: boolean
  heights?: number[]
  plans?: PlanOptions[][]
  milestones?: MilestoneOptions[][]
  id?: string
  labels?: { [key: string]: LabelOptions[] }
}

export type TaskInputOptions = obj & {
  collapsible?: boolean
  collapsed?: boolean
  plan ?: PlanInputOptions
  plans ?: PlanInputOptions[] | PlanInputOptions[][]
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
  start: Tick | string
  end: Tick | string
  fill: string
  headerOnly?: boolean
}

export interface TimelineOptions {
  columns?: Array<ColumnOptions>
  planDefaults?: BasePlanOptions | BasePlanOptions[]
  viewMode ?: VIEW_MODE,
  taskMargin ?: number
  wrapper?: any
  highlights?: Highlight[]
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
  icons?: Icon | Icon[]
}

export interface ViewProps {
  data?: TaskInputOptions[]
  config?: TimelineOptions
}
