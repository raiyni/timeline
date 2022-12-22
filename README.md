# Timeline

## An open-source, semi-opinionated timeline view of schedules/itineraries powered by [Preact](https://preactjs.com/)

#### Note: anything about this library is subject to change as it is in development

This project is built with TypeScript for ease of development and can be transpiled to support IE11.

Timeline aims to be data driven with little intervention from developers without having to include css files.

Date parsing is powered by a tiny library [dayjs](https://github.com/iamkun/dayjs)

# Using

1. Create a `div` to target

```html
<div id="abc123" style="height: 100%; width: 100%;"></div>
```

2. Create your data and timeline configuration

```js
// Plans and milestones are multi-dimensional arrays to support multiple bars within a task view
var tasks = [
  [
    {
      name: [
        label: 'Task 1'
        ],
      plans: [
        [
          {
            start: '2012-05-22',
            end: '2012-06-25'
          }
        ]
      ],
      milestones: []
    }
  ]
]

var timelineOptions = {
  viewMode: 'Day',
  planDefaults: [
    {
      height: 20,
      progress: 100,
      backgroundStyle: {
        fill: 'red',
        stroke: 'black'
      },
      progressStyle: {
        stroke: 'black',
        fill: 'rgb(189, 215, 238)'
      }
    }
  ],
  columns: [
    {
      text: 'Task Name',
      field: 'name',
      defaults: [
        {
          alignment: 'center',
          backgroundStyle: {
            background: 'rgb(255,192,0)'
          }
        }
      ]
    }
  ]
}
```

3. Pass your css selector to identify your div and options to a timeline object

```js
var timeline = new Timeline('#abc123', tasks)

or

var timeline = new Timeline('#abc123', tasks, timelineOptions)
```

#### See the [example](https://github.com/raiyni/timeline-preact/tree/master/public) for more thourough usage

Additional config options can be seen within each class.

# Contributing

1. Clone this repo.
2. `cd` into project directory
3. `yarn`
4. `yarn run dev`

License: ISC

---

Project maintained by [Ron Young](https://github.com/raiyni)
