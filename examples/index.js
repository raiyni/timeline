var tasks = [
  {
    collapsible: true,
    plans: [
      [{
        start: '2020-04-03T05:00:00.000Z',
        end: '2021-04-25T05:00:00.000Z',
        progress: 15,
        progressStyle: {
          fill: '#f2c329'
        },
        name: {
          label: 'Donkey',
          labelStyle: {
            'font-family': 'Arial',
            'font-weight': 'bold'
          }
        },
        startText: {
          label: 'Boston',
          labelStyle: {
            fill: '#ffffff',
            'font-family': 'Arial',
            'font-weight': 'bold',
            'stroke': 'black',
            'stroke-width': '0.5px',
            'stroke-linecape': 'butt',
            'stroke-linejoin': 'miter',
            'font-size': '24px'
          }
        },
        endText: 'Jacoby'
      }],
      [{
        start: '2020-03-22T05:00:00.000Z',
        end: '2020-06-23T05:00:00.000Z',
        progress: 22,
        progressStyle: {
          fill: '#8fdaff',
          stroke: 'black',
          strokeWidth: '1px'
        }
      }]
    ],
    name: {
      label: 'Apply new styles'
    },
    id: 'Task 2',
    pieces: {
      label: 44,
      labelStyle: {
        color: 'white'
      }
    },
    area: {
      label: '232k',
      backgroundStyle: {
        'background-color': 'red'
      }
    },
    milestones: [
      {
        date: '2022-05-23T05:00:00.000Z',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-03-25T05:00:00.000Z',
      progress: 100,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: {
      label: 'Donkey dog',
      backgroundStyle: {
        'justify-content': 'flex-end'
      }
    },
    id: 'Task 2',
    pieces: 44,
    area: '232k',
    milestones: [
      {
        start: '2020-05-23T05:00:00.000Z',
        end: '2020-07-23T05:00:00.000Z'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-03-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [[
      {
        date: '2020-05-23T05:00:00.000Z',
        shape: 'square'
      },
      {
        date: '2020-07-23T05:00:00.000Z',
        shape: 'square',
        style: {
          'transform': 'skewX(15)'
        }
      }
    ]]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        shape: 'circle'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        shape: 'triangle',
        width: 30,
        height: 15,
        rotate: 90
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        shape: 'star',
        width: 30,
        height: 20,
        style: {
          fill: 'red',
          stroke: ''
        }
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-03-22T05:00:00.000Z',
      end: '2020-08-29T05:00:00.000Z',
      progress: 87,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Where',
    id: 'Task 2',
    pieces: 4.44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00.000Z',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  }
]

var gantt_chart = new Timeline('#abc123', tasks, {
  viewMode: 'month',
  highlights: [
    {
      start: '2021-02-03T05:00:00.000Z',
      end: '2021-03-28T05:00:00.000Z',
      fill: '#ff00ff'
    },
    {
      start: '2021-02-03T05:00:00.000Z',
      end: '2021-03-28T05:00:00.000Z',
      fill: '#000000',
      headerOnly: true
    }
],
  columns: [
    { text: 'Name', field: 'name', defaults: { labelStyle: { 'textAnchor': 'middle' } } },
    { text: 'Sq/ft', field: 'area' },
    {
      text: 'Pcs',
      field: 'pieces',
      defaults: {
        labelStyle: {
          'color': 'red',
          'font-weight': 'bold',
          'font-family': 'Arial',
          'font-size': '1.5em'
        },
        backgroundStyle: {
          'background-color': 'green'
        }
      }
    }
  ]
})
