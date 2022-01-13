import dayjs from "dayjs"

export enum VIEW_MODE {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  FIT = 'fit',
}

export enum POINTER_EVENT {
  pointerdown = 'pointerdown',
  pointerup = 'pointerup',
  pointermove = 'pointermove'
}


export type Style = {[key: string]: any;}
export type obj = { [key: string]: any }
export type Tick = dayjs.Dayjs

export interface BasePlanOptions {
  height?: number
  progressStyle?: Style
  backgroundStyle?: Style
  labelStyle?: Style
  dateFormat?: string
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
  dateFormat?: string
}

export const isImage = (obj: any): obj is Image => {
  return 'href' in obj
}

export interface Arrow {
  shape?: ShapeType.ARROW
  start?: string | Tick
  end?: string | Tick
  style?: Style
  dateFormat?: string
}

export const isArrow = (obj: any): obj is Arrow => {
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
  dateFormat?: string
}

export const isShape = (obj: any): obj is Shape => {
  return 'shape' in obj && obj.shape != ShapeType.ARROW
}

export interface Line {
  start?: string | Tick
  end?: string | Tick
  style?: Style
  dateFormat?: string
}

export const isLine = (obj: any): obj is Line => {
  return 'start' in obj && 'end' in obj && !('shape' in obj)
}

export interface Alignment {
  alignment?: 'left' | 'center' | 'right'
}

export type Icon = (Image | Shape) & Alignment

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
  padding?: Style
  id?: string
  labels?: { [key: string]: LabelOptions[] }
  properties?: any
}

export type TaskInputOptions = obj & {
  collapsible?: boolean
  collapsed?: boolean
  padding?: PaddingInput
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
  dateFormat?: string
}

export interface TimelineOptions {
  columns?: Array<ColumnOptions>
  planDefaults?: BasePlanOptions | BasePlanOptions[]
  taskDefaults ?: TaskOptions
  viewMode ?: VIEW_MODE
  wrapper?: any
  highlights?: Highlight[]
  dateFormat?: string
  hoverEffects?: boolean
  prepareTask?: (options: TaskInputOptions) => {}
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

export interface LabelBaseOptions {
  label: string
  labelStyle?: any
  backgroundStyle?: any
  icons?: Icon | Icon[]
}

export type PaddingInput = number | {[key: string]: number }

export type LabelOptions = LabelBaseOptions & Alignment

export type PointerCallback = (e: PointerEvent, task: TaskOptions) => {}

export type PointerEvents =  { [key in POINTER_EVENT]?: PointerCallback }

export type ViewProps = {
  data?: TaskInputOptions[]
  config?: TimelineOptions
} & PointerEvents

