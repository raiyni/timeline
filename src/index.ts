import './gant.scss'
import 'core-js/stable'

import EventBus, { Events } from './EventBus';
import { TaskOptions, TimelineOptions } from './types';

import View from './view';
import deepmerge from './deepmerge';

export default class Timeline {
  private view: View

  private config: TimelineOptions

  constructor(selector: string, taskOptions: TaskOptions[], config: TimelineOptions ) {
    this.config = deepmerge({
      columns: [],
      padding: {},
      taskMargin: 5
    }, config)

    this.config.eventbus = new EventBus()

    this.config.eventbus.on(Events.COLLAPSE, () => true)
    this.view = new View(selector, taskOptions, this.config)

    console.log(this.config)
      // .call(d3.zoom().on("zoom", function(e) {
        // console.log(e)
        // svg.attr('transform', 'translate(' + e.transform.x + ',' + margin.top + ')')
      // })

    console.log(this)
  }
}
