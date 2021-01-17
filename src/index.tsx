// Must be the first import

import 'preact/debug'

import { TimelineOptions } from './types'
import { View } from './view'
import dayjs from 'dayjs'
import { h } from 'preact'
import minMax from 'dayjs/plugin/minMax'
import { render } from 'preact'

export default class Timeline {
  target: any
  data: any[]
  config: TimelineOptions

  constructor(id: string, data: any[], config: TimelineOptions) {
    dayjs.extend(minMax)
    this.data = data
    this.config = config || {}
    this.target = document.getElementById(id)

    this.forceRender()
  }

  forceRender() {
    render(null, this.target)
    render(<View data={this.data} config={this.config}/>, this.target)
  }

  updateData(data: any[]) {
    this.data = data
    this.forceRender()
  }
}
