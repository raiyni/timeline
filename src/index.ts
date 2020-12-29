import './gant.scss'
import 'core-js/stable'

import { TaskOptions, TimelineOptions } from './types';

import View from './view';
import deepmerge from './deepmerge';

export default class Timeline {
  private view: View

  private options: TimelineOptions

  constructor(selector: string, taskOptions: TaskOptions[], options: TimelineOptions ) {
    this.options = deepmerge({
      columns: [],
      padding: {},
      taskMargin: 5
    }, options)

    this.view = new View(selector, taskOptions, this.options)
      // .call(d3.zoom().on("zoom", function(e) {
        // console.log(e)
        // svg.attr('transform', 'translate(' + e.transform.x + ',' + margin.top + ')')
      // })
  }
}
