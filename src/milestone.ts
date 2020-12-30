import { MilestoneOptions } from "./types";
import  dayjs  from 'dayjs';

export default class Milestone {
  date: dayjs.Dayjs
  href?: string
  height: number
  width: number
  y?:number
  constructor(options: MilestoneOptions) {
    this.date = dayjs(options.date)
    this.href = options.href
    this.height = options.height || 15
    this.width = options.width || 15
    this.y = options.y
  }
}
