import { LabelOptions, PlanOptions, Style } from "./types";
import { applyStyle, clamp, getLabelOptions } from "./util";

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
  name?: LabelOptions
  startText?: LabelOptions
  endText?: LabelOptions

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

    if (options.name) {
      this.name = getLabelOptions(options.name)
    }

    if (options.startText) {
      this.startText = getLabelOptions(options.startText)
    }

    if (options.endText) {
      this.endText = getLabelOptions(options.endText)
    }
  }

  render(parent: any, x: any) {
    const layer = parent.append('g').attr('class', 'plan')
    this.drawBackground(layer, x)
    this.drawProgress(layer, x)

    if (this.name) {
      this.drawName(layer, x)
    }

    if (this.startText || this.endText) {
      this.drawSideText(layer, x)
    }
  }

  private drawBackground(group: any, x: any): void {
    const rect = group
      .append('rect')
      .attr('x', x(this.start))
      .attr('y', 0)
      .attr('height', this.height)
      .attr('width', x(this.end) - x(this.start))
    applyStyle(rect, this.backgroundStyle)
  }

  private drawProgress(group: any, x: any): void {
    const rect = group
      .append('rect')
      .attr('x', x(this.start.toDate()))
      .attr('y', 0)
      .attr('height', this.height)
      .attr('width', (x(this.end) - x(this.start)) * clamp(this.progress / 100, 0, 1))
    applyStyle(rect, this.progressStyle)
  }

  private drawName(group: any, x: any) {
    const text = group
      .append('text')
      .attr('x', x(this.start))
      .attr('y', 0)
      .text(this.name.label)

    if (this.name.labelStyle) {
      applyStyle(text, this.name.labelStyle, false)
    }

    const bbox = text.node().getBoundingClientRect()
    const y = this.height / 2 + bbox.height / 2
    text.attr('y', y)

    const planWidth = x(this.end) - x(this.start)
    if (bbox.width + 5 < planWidth) {
      const newX = planWidth / 2 - bbox.width / 2 + x(this.start)
      text.attr('x', newX)
    } else {
      text.attr('x', x(this.end) + 5)
    }
  }

  drawSideText(layer: any, x: any) {
    let startLabel,
      endLabel,
      startBBox,
      endBBox

    if (this.startText) {
      startLabel = layer.append('text')
        .attr('x', x(this.start))
        .text(this.startText.label)

      if (this.startText.labelStyle) {
        applyStyle(startLabel, this.startText.labelStyle, false)
      }

      startBBox = startLabel.node().getBoundingClientRect()

      const y = this.height / 2  + startBBox.height / 4
      startLabel.attr('y', y)
    }

    if (this.endText) {
      endLabel = layer.append('text')
        .attr('x', x(this.end))
        .text(this.endText.label)

      if (this.endText.labelStyle) {
        applyStyle(endLabel, this.endText.labelStyle, false)
      }

      endBBox = endLabel.node().getBoundingClientRect()
      const y = this.height / 2  + endBBox.height / 4
      endLabel.attr('y', y)
    }

    const planWidth = x(this.end) - x(this.start)
    if (startLabel && endLabel) {
      if (!(startBBox.width + endBBox.width + 5 < planWidth)) {
        startLabel.attr('x', x(this.start) - startBBox.width)
      } else {
        endLabel.attr('x', x(this.end) - endBBox.width)
      }
    } else if (startLabel) {
      if (!(startBBox.width + 5 < planWidth)) {
        startLabel.attr('x', x(this.start) - startBBox.width)
      }
    } else {
      if ((endBBox.width + 5 < planWidth)) {
        endBBox.attr('x', x(this.end) - startBBox.width)
      }
    }
  }
}
