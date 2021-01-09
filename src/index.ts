import './gant.scss'

import { TaskOptions, TimelineOptions } from './types';

import EventBus from './EventBus';
import View from './view';
import deepmerge from './deepmerge';

export default class Timeline {
  private view: View

  private config: TimelineOptions

  constructor(selector: string, taskOptions: TaskOptions[], config: TimelineOptions ) {
    this.config = deepmerge({
      columns: [],
      padding: {},
      taskMargin: 2
    }, config)

    this.config.eventbus = new EventBus()

    this.view = new View(selector, taskOptions, this.config)
    this.view.render()

    console.log(this)
  }
}
