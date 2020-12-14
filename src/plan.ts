import { Offset, PlanOptions, Style } from "./types";

import dayjs from "dayjs";
import deepmerge from "./deepmerge";

export default class Plan {
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
  progress: number;
  height?: number;
  label?: string;
  progressStyle: Style;
  backgroundStyle: Style
  labelStyle: Style

  constructor(options: PlanOptions) {
    this.start = dayjs(options.start)
    this.end = dayjs(options.end)
    this.progress = options.progress || 0
    this.height = options.height || 30
    this.label = options.label
    this.progressStyle = deepmerge({
      fill: '#f2c329'
    }, options.progressStyle || {})
    this.backgroundStyle = deepmerge({
      fill: '#acacac'
    }, options.backgroundStyle || {})
    this.labelStyle = deepmerge({}, options.labelStyle || {})
  }
}
