import dayjs from 'dayjs'

export type Style = {[key: string]: any;}

export interface PlanOptions {
  start: string | dayjs.Dayjs
  end: string | dayjs.Dayjs
  progress: number
  height?: number
  label?: string
  progressStyle?: Style
  backgroundStyle?: Style
  labelStyle?: Style
}

export interface TaskOptions {
  plan ?: PlanOptions
  plans : PlanOptions[] | PlanOptions[][]
  marginTop?: number
  marginBottom?: number
}

export interface ColumnOptions {
  text: string
  field: string
  defaults?: object
}

export interface Sides {
  left: number
  right: number
  top: number
  bottom: number
}

export interface TimelineOptions {
  columns: Array<ColumnOptions>
  planDefaults?: PlanOptions
}

export interface Offset {
  x: number,
  y: number
}
