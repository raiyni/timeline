import * as d3 from 'd3';

import { Offset, PlanOptions, Sides, TaskOptions, TimelineOptions } from "./types"

import Task from "./task"
import dayjs from 'dayjs';
import deepmerge from './deepmerge';
import minMax from 'dayjs/plugin/minMax'

export default class View {
  private svg: any
  private x: any
  private y: any
  private groups: any

  private parent: HTMLElement
  private tasks: Task[]

  private minDate: dayjs.Dayjs
  private maxDate: dayjs.Dayjs

  private options: TimelineOptions

  constructor(selector: string, taskOptions: TaskOptions[], options: TimelineOptions) {
    dayjs.extend(minMax)
    this.options = options

    this.tasks = taskOptions.map(t => new Task(t))

    this.parent = document.body.querySelector(selector)
    const bounds = this.getBounds()

    this.svg = d3
      .select(this.parent)
      .append('svg')
      .attr('width', bounds.width)
      .attr('height', bounds.height)
      .append('g')
      .attr('transform', `translate(30, 30)`)

    this.computeBoundingDates()
    this.y = d3.scaleBand()
      .range([bounds.height, 0])
      .domain(this.tasks.map((c, i) => i + ''))
      .padding(0.1)
    this.x = d3.scaleTime()
      .range([0, bounds.width])
      .domain([this.minDate.add(-7, 'day').toDate(), this.maxDate.toDate()])
      .nice()

    this.svg
      .append('g')
      .call(d3.axisTop(this.x))

    this.svg.append('g')
      .call(d3.axisLeft(this.y).tickFormat(() => '').tickSize(0))


    console.log([this.minDate.toDate(), this.maxDate.toDate()])

    this.groups = this.svg.selectAll('.group')
      .data(this.tasks)
      .enter()
      .append('g')
      .classed('group', true)

    const offset: Offset = { x: 0, y: 0}
    this.groups.each((task: Task, idx: number, arr: SVGElement[]) => {
      const group = d3.select(arr[idx]);
      task.render(this.x, this.y, group, offset)
    });
  }

  private getBounds(): DOMRect {
    return this.parent.getBoundingClientRect()
  }

  private computeBoundingDates(): void {
    const dates = this.tasks.map(task => task.rows).flat(3)
    const startDates = dates.map(d => d.start)
    const endDates = dates.map(d => d.end)

    this.minDate = dayjs.min(startDates)
    this.maxDate = dayjs.max(endDates)
  }
}
