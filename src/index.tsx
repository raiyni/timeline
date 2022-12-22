// Must be the first import
import 'preact/debug'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import minMax from 'dayjs/plugin/minMax'
import { h, render } from 'preact'
import { PointerCallback, TimelineOptions } from './types'
import Wrapper from './wrapper'

const addStyle = (() => {
  const style = document.createElement('style')
  document.head.appendChild(style)
  return (styleString: string) => (style.textContent = styleString)
})()

export default class Timeline {
  target: any
  wrapper: any

  static version: string = process.env.VERSION
  static git: any = {
    sha: process.env.SHA,
    tag: process.env.TAG,
    date: process.env.COMMIT_DATE
  }
  static SHA: string = process.env.GIT

  constructor(id: string, data: any[] = [], config: TimelineOptions = {}) {
    dayjs.extend(minMax)
    dayjs.extend(customParseFormat)

    if (id.indexOf('.') === 0) {
    } else {
      this.target = document.getElementById(id)
    }

    this.target.innerHTML = ''

    addStyle(`
      .timeline-plan:hover {
        filter: opacity(0.75);
        pointer-events: fill;
      }

      .timeline-milestone {
        pointer-events: visible;
      }

      .timeline-milestone:hover {
        filter: opacity(0.65) drop-shadow(0 0 4px rgba(235, 210, 52, 1));

      }
    `)

    this.initialRender(data, config)
    console.log(this)
  }

  initialRender(data: any[], config: TimelineOptions) {
    render(<Wrapper ref={(wrapper: any) => (this.wrapper = wrapper)} data={data} config={config} />, this.target)
  }

  updateConfig(config: TimelineOptions) {
    if (this.wrapper) {
      this.wrapper.setState({
        config: config || {}
      })
    }
  }

  updateData(data: any[]) {
    if (this.wrapper) {
      this.wrapper.setState({
        data: data
      })
    }
  }

  update(data: any[], config: TimelineOptions) {
    if (this.wrapper) {
      this.wrapper.setState({
        data: data,
        config: config || {}
      })
    }
  }

  on(key: string, callback: PointerCallback) {
    if (this.wrapper) {
      this.wrapper.setState((state: any) => {
        const events = {
          ...state.events
        }

        events[key] = callback
        return {
          ...state,
          events
        }
      })
    }
  }
}
