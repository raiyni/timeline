// import * as d3 from 'd3'

import { Events, Priority } from './EventBus'
import { Highlight, Offset, Rect, TaskOptions, TimelineOptions } from './types'
import { Selection, axisTop, scaleBand, scaleTime, select, timeDay, timeMonth, timeWeek, timeYear } from 'd3'

import Columns from './columns'
import ResizeObserver from 'resize-observer-polyfill'
import Task from './task'
import { VIEW_MODE as VM } from './types'
import dayjs from 'dayjs'
import { debounce } from './util';
// @ts-ignore
import flat from 'core-js-pure/features/array/flat'
import minMax from 'dayjs/plugin/minMax'

export default class View {
  private x: any
  private y: any
  private groups: any

  private parent: Selection<any, any, any, any>
  private tasks: Task[]

  private minDate: dayjs.Dayjs
  private maxDate: dayjs.Dayjs

  private config: TimelineOptions

  private columns: Columns

  private left: any
  private right: any
  private border: any

  private bodyHeader: any
  private headerSvg: any

  private bodyHolder: any

  private columnsBody: any
  private columnsHeader: any

  private highlights: any

  constructor(selector: string, taskOptions: TaskOptions[], config: TimelineOptions) {
    dayjs.extend(minMax)
    console.log(dayjs)
    if (!Array.isArray(taskOptions) || taskOptions.length == 0) {
      console.warn('Tasks required to be an array of data')
      return
    }

    this.config = config

    this.tasks = taskOptions.map((t) => new Task(t, this.config))
    this.columns = new Columns(this.tasks, this.config)

    const owner = select(document.body.querySelector(selector))
    owner.html("")

    this.parent = owner
      .append('div')
      .style('display', 'flex')
      .style('flex-direction', 'row')
      .style('align-items', 'stretch')
      .style('width', '100%')
      .style('height', '100%')
      .style('overflow', 'hidden')
      .style('background-color', 'white')

    config.wrapper = this.parent

    const updateHeight = () => {
      const heights = this.tasks.map(t => t.getHeight())
      const a = heights.reduce((a, b) => a + b)
      const b = this.tasks.length * this.config.taskMargin

      if (this.config.highlights && this.config.highlights.length > 0) {
        this.highlights.attr('height', a + b)
      }

      this.border.style('height', a + b + 30)
    }

    this.config.eventbus.on(Events.TOGGLE, updateHeight, Priority.LOW)
    this.config.eventbus.on(Events.COLLAPSE, updateHeight, Priority.LOW)

    const renderer = debounce(() => this.render(), 150)
    const obeserver = new ResizeObserver(() => renderer())
    obeserver.observe(owner.node())
  }

  private createDom() {
    this.parent.html("")

    this.left = this.parent
      .append('div')
      .style('display', 'flex')
      .style('flex-direction', 'column')
      .style('overflow', 'hidden')
      .style('flex-shrink', 0)

    this.columnsHeader = this.left.append('div')
      .style('min-height', 30)
      .style('display', 'flex')
      .style('background-color', '#fff')

    this.columnsBody = this.left.append('div')
      .style('flex-direction', 'row')
      .style('display', 'flex')
      .style('overflow', 'hidden')

    const rightWrapper = this.parent
      .append('div')
      .style('display', 'flex')
      .style('flex', 1)
      .style('overflow', 'hidden')

    this.border = rightWrapper
      .append('div')
      .style('position', 'relative')
      .style('border-right', '1px solid black')
      .style('overflow', 'hidden')
      .style('display', this.columns.length() > 0 ? 'visible' : 'none')

    this.right = rightWrapper
      .append('div')
      .style('position', 'relative')
      .style('flex', 1)
      .style('display', 'flex')
      .style('flex-direction', 'column')
      .style('align-items', 'stretch')
      .style('overflow', 'hidden')

    this.bodyHeader = this.right.append('div')
      .style('overflow', 'hidden')
      .style('padding-right', '18px')
      .style('background-color', '#fff')

    this.headerSvg = this.bodyHeader.append('svg')
      .attr('height', 30)

    this.bodyHolder = this.right.append('div')
      .style('flex', 1)
      .style('overflow-y', 'auto')
      .style('position', 'relative')

    this.highlights = this.bodyHolder
      .append('svg')
      .style('position', 'absolute')
      .style('left', 0)
      .style('top', 0)
      .style('pointer-events', 'none')

    this.bodyHolder.node().addEventListener('scroll', (event: any) => {
      this.updateScroll(event.target.scrollLeft, event.target.scrollTop);
    })
  }

  private updateScroll(left: number, top: number): void {
    this.columnsBody.node().scrollTop = top;
    this.bodyHeader.node().scrollLeft = left;
  }

  private computeBoundingDates(): void {
    const startDates = this.tasks.map((d) => d.minDate)
    const endDates = this.tasks.map((d) => d.maxDate)

    this.minDate = dayjs.min(startDates)
    this.maxDate = dayjs.max(endDates)
    switch (this.config.viewMode || VM.WEEK) {
      case VM.DAY:
        this.maxDate = this.maxDate.add(1, 'day')
        break
      case VM.MONTH:
        this.maxDate = this.maxDate.add(1, 'month')
        break
      case VM.YEAR:
        this.maxDate = this.maxDate.add(1, 'year')
        break
      case VM.FILL:
        this.maxDate = this.maxDate.add(1, 'day')
        break
      case VM.WEEK:
      default:
        this.maxDate = this.maxDate.add(1, 'week')
        break
    }
  }

  private getDateDiff(): number {
    switch (this.config.viewMode || VM.WEEK) {
      case VM.DAY:
        return Math.ceil(this.maxDate.diff(this.minDate, 'day'))
      case VM.MONTH:
        return Math.ceil(this.maxDate.diff(this.minDate, 'month'))
      case VM.YEAR:
        return Math.ceil(this.maxDate.diff(this.minDate, 'year'))
      case VM.FILL:
        return 1
      case VM.WEEK:
      default:
        return Math.ceil(this.maxDate.diff(this.minDate, 'week'))
    }
  }

  private getDateWidth(): number {
    switch (this.config.viewMode || VM.WEEK) {
      case VM.DAY:
        return 30
        case VM.WEEK:
          return 80
      case VM.MONTH:
          return 100
      case VM.YEAR:
        return 365
      default:
        return 1
    }
  }

  private computeSize(viewport: number): Rect {
    const bounds = this.parent.node().getBoundingClientRect()

    const diff = this.getDateDiff()
    const width = this.getDateWidth() * diff

    const height = flat(this.tasks
      .map((task) => [5].concat(task.heights)), 3)
      .reduce((a, b) => a + b)

    return {
      width: (this.config.viewMode == VM.FILL ? 1 : width),
      height: Math.max(height, bounds.height)
    }
  }

  private getDateType(): dayjs.OpUnitType {
    switch (this.config.viewMode || VM.WEEK) {
      case VM.DAY:
        return 'day'
      case VM.MONTH:
        return 'month'
      case VM.WEEK:
        return 'week'
      case VM.YEAR:
        return 'year'
    }

    return 'year'
  }

  private getAxis(): any {
    const width = this.getDateWidth()
    let day = dayjs()

    switch (this.config.viewMode || VM.WEEK) {
      case VM.DAY:
        day = this.minDate.add(1, 'day')
        break
      case VM.MONTH:
        day = this.minDate.add(1, 'month')
        break
      case VM.WEEK:
        day = this.minDate.add(1, 'week')
        break
      case VM.YEAR:
        day = this.minDate.add(1, 'year')
        break
      default:
        return 1
    }

    return scaleTime().range([0, width]).domain([this.minDate, day])
  }

  render() {
    this.createDom()

    this.columns.render(this.columnsHeader, this.columnsBody)

    this.computeBoundingDates()

    const bounds = this.bodyHolder.node().getBoundingClientRect()
    const viewport = bounds.width
    const size = this.computeSize(viewport)

    this.y = scaleBand()
      .range([size.height, 0])
      .domain(this.tasks.map((c, i) => i + ''))
      .padding(0.1)

    let endDate = this.maxDate
    // const referenceAxis = this.getAxis()
    // if (size.width < viewport && this.config.viewMode != VM.FILL) {
    //   let date = this.maxDate
    //   let w = size.width
    //   const unit = this.getDateType()
    //   while (w <= viewport) {
    //     date = date.add(1, unit)
    //     w += referenceAxis(date.toDate())
    //   }

    //   endDate = date
    // }

    let startDate = this.minDate
    switch (this.config.viewMode || VM.WEEK) {
      case VM.DAY:
        startDate = startDate.add(-1, 'day')
        break
      case VM.MONTH:
        startDate = startDate.add(-1, 'month')
        break
      case VM.YEAR:
        startDate = startDate.add(-1, 'year')
        break
      case VM.FILL:
        break
      case VM.WEEK:
      default:
        startDate = startDate.add(-1, 'week')
        break
    }

    const fullWidth = Math.max(size.width, viewport)
    this.highlights.attr('width', fullWidth)
    this.x = scaleTime().range([0, fullWidth]).domain([startDate, endDate])

    if (this.config.viewMode == VM.FILL) {
      this.x = this.x.nice()
    }

    let xAxis = axisTop(this.x)
    switch (this.config.viewMode || VM.WEEK) {
      case VM.DAY:
        xAxis = xAxis.ticks(timeDay.every(3))
        break
      case VM.MONTH:
        xAxis = xAxis.ticks(timeMonth.every(1))
        break
      case VM.YEAR:
        xAxis = xAxis.ticks(timeYear.every(1))
        break
      case VM.FILL:
        break
      case VM.WEEK:
      default:
        xAxis = xAxis.ticks(timeWeek.every(1))
        break
    }

    const xAxisSvg = this.headerSvg
      .append('g')
      .attr('transform', 'translate(-1, 30)')
      .attr('class', 'x axis')
      .call(xAxis)

    xAxisSvg.select('.tick:first-of-type').remove()

    this.headerSvg.attr('width', fullWidth)

    this.groups = this.bodyHolder
      .selectAll('.group')
      .data(this.tasks)
      .enter()
      .append('div')
      .classed('group', true)
      .style('width', fullWidth)
      .style('border-top', `${this.config.taskMargin}px solid black`)

    const offset: Offset = { x: fullWidth, y: 0 }
    this.groups.each((task: Task, idx: number, arr: SVGElement[]) => {
      const group = select(arr[idx])
      task.renderDivs(this.x, this.y, group, offset)
    })

    this.bodyHolder.append('div')
      .attr('class', 'group')
      .style('height', '20px')
      .text(' ')

    this.columnsBody.selectAll('.column')
      .append('div')
      .style('height', '40px')
      .text(' ')

    if (this.config.highlights) {
      this.config.highlights.forEach(h => {
        h.start = dayjs(h.start)
        h.end = dayjs(h.end)
      })

      this.highlights
        .selectAll('.highlight')
        .data(this.config.highlights.filter( h => !h.headerOnly))
        .enter()
        .append('rect')
        .classed('highlight', true)
        .attr('x', (obj: Highlight) => this.x((obj.start as dayjs.Dayjs).toDate()))
        .attr('y', 0)
        .attr('height', '100%')
        .attr('width', (obj: Highlight) => this.x((obj.end as dayjs.Dayjs).toDate()) - this.x((obj.start as dayjs.Dayjs).toDate()))
        .style('fill', (obj: Highlight) => obj.fill)

      this.headerSvg
        .selectAll('.highlight')
        .data(this.config.highlights)
        .enter()
        .append('rect')
        .classed('highlight', true)
        .attr('x', (obj: Highlight) => this.x((obj.start as dayjs.Dayjs).toDate()))
        .attr('y', 0)
        .attr('height', '100%')
        .attr('width', (obj: Highlight) => this.x((obj.end as dayjs.Dayjs).toDate()) - this.x((obj.start as dayjs.Dayjs).toDate()))
        .style('fill', (obj: Highlight) => obj.fill)
    }

    this.bodyHeader.node().scrollWidth = this.bodyHolder.node().scrollWidth
    this.config.eventbus.emit(Events.COLLAPSE)
  }
}
