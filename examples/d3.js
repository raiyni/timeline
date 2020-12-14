var data = [
  { plans: [
    [{start: '2020-05-02T15:00:00', end: '2020-05-21T05:00:00', height: 30}],
    [{start: '2020-05-19T05:00:00', end: '2020-05-26T05:00:00'}, {start: '2020-05-02T05:00:00', end: '2020-05-10T05:00:00'}]]
  },
  { plans: [[{start: '2020-05-02T15:00:00', end: '2020-05-21T05:00:00'}]] },
  { plans: [[{start: '2020-04-19T05:00:00', end: '2020-05-01T05:00:00'}]] }
]

var tasks = [
  {
    plans: [
      [
        {
          start: '2020-05-19T05:00:00',
          end: '2020-05-26T05:00:00',
          progress: 18,
          height: 22,
          label: 'Plan bar 1',
          progressStyle: {
            fill: '#f2c329'
          },
          labelStyle: {
            fill: 'black',
            fontWeight: 'bold'
          }
        }
      ],
      [
        {
          start: '2020-05-21T05:00:00',
          end: '2020-06-26T05:00:00',
          progress: 100,
          label: 'Plan bar 2',
          height: 22,
          progressStyle: {
            fill: '#8fdaff',
            stroke: 'black',
            strokeWidth: '1px'
          }
        }
      ],
      [
        {
          start: '2020-05-22T05:00:00',
          end: '2020-06-20T05:00:00',
          progress: 100,
          height: 22,
          label: 'Plan bar 4',
          progressStyle: {
            fill: '#8fdaff',
            stroke: 'black',
            strokeWidth: '1px'
          }
        }
      ],
      [
        {
          start: '2020-05-02T05:00:00',
          end: '2020-06-02T05:00:00',
          progress: 100,
          height: 22,
          progressStyle: {
            fill: '#8fdaff',
            stroke: 'black',
            strokeWidth: '1px'
          }
        }
      ]
    ],
    name: {
      label: 'Redesign website',
      horizontalAlign: 'right'
    },
    id: 'Task 0',
    pieces: [200, 34],
    area: '2k',
    collapsible: true,
    milestones: [
      [
        {
          date: '2020-05-7',
          href: 'https://image.flaticon.com/icons/svg/67/67354.svg'
        },
        {
          date: '2020-05-13',
          href:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/512px-Star_icon_stylized.svg.png'
        }
      ]
    ]
  },
  {
    plans: [
      [
        {
          start: '2020-05-20T05:00:00',
          end: '2020-05-23T05:00:00',
          progress: 10,
          height: 50,
          progressStyle: {
            fill: '#f2c329'
          }
        },
        {
          start: '2020-05-15T05:00:00',
          end: '2020-05-18T05:00:00',
          height: 20,
          progressStyle: {
            fill: '#f2c329'
          }
        }
      ],
      [
        {
          start: '2020-05-15T05:00:00',
          end: '2020-05-18T05:00:00',
          height: 30,
          label: 'Plan bar 7',
          progressStyle: {
            fill: '#68de84'
          }
        },
        {
          start: '2020-05-21T05:00:00',
          end: '2020-06-18T05:00:00',
          height: 30,
          progressStyle: {
            fill: '#8fdaff'
          }
        }
      ]
    ],
    name: [
      {
        label: 'Hannah 1',
        labelStyle: {
          fill: 'red',
          fontWeight: 'bold',
          fontFamily: 'Arial',
          fontSize: '2em'
        },
        backgroundStyle: {
          fill: 'blue'
        }
      },
      {
        label: 'Boston 24',
        verticalAlign: 'bottom',
        backgroundStyle: {
          fill: 'pink'
        },
        horizontalAlign: 'right'
      }
    ],
    id: 'Task 1',
    pieces: 444,
    area: '22k',
    milestones: [
      [],
      [
        {
          date: '2020-05-15',
          width: 32,
          href:
            'https://lh3.googleusercontent.com/proxy/HrXl9HSIeI_YZODEC09H_YHi9VcLT69nTfVoIUFHCiF578n7FrrvRi40Toggq5cEUcDaC2chmADXnqPqIRJfsEFh7CV6yHXj7-N9QURwoebXPY4Fg1fJpDWoyshfHbz5VH8tTYvqzzUxXZNZaI4veAIAU-OqVX32Zw'
        }
      ]
    ]
  },

  {
    plan: {
      start: '2020-05-22T05:00:00',
      end: '2020-05-25T05:00:00',
      progress: 87,
      height: 10,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: {
      label: 'Hannah 1',
      verticalAlign: 'bottom',
      horizontalAlign: 'center',
      labelStyle: {
        fill: 'red',
        fontWeight: 'bold',
        fontFamily: 'Arial'
      }
    },
    collapsible: true,
    id: 'Task 2',
    pieces: 44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-05-22T05:00:00',
      end: '2020-05-25T05:00:00',
      progress: 87,
      height: 10,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Apply new styles',
    id: 'Task 2',
    pieces: 44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-05-22T05:00:00',
      end: '2020-05-25T05:00:00',
      progress: 87,
      height: 10,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Apply new styles',
    id: 'Task 2',
    pieces: 44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  },
  {
    plan: {
      start: '2020-05-22T05:00:00',
      end: '2020-05-25T05:00:00',
      progress: 87,
      height: 10,
      progressStyle: {
        fill: '#f2c329'
      }
    },
    name: 'Apply new styles',
    id: 'Task 2',
    pieces: 44,
    area: '232k',
    milestones: [
      {
        date: '2020-05-23T05:00:00',
        href: 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png'
      }
    ]
  }
]

var options = {
  viewMode: 30,
  columns: [
    { text: 'Name', field: 'name' },
    { text: 'Sq/ft', field: 'area', defaults: { horizontalAlign: 'center' } },
    {
      text: 'Pcs',
      field: 'pieces',
      defaults: {
        labelStyle: {
          fill: 'red',
          fontWeight: 'bold',
          fontFamily: 'Arial',
          fontSize: '2em'
        },
        horizontalAlign: 'right'
      }
    }
  ]
}

tasks.forEach(function(t) {
  if (t.plan) {
    t.plans = [[t.plan]]
  }

  if (!Array.isArray(t.plans)) {
    console.error('Plans object is not an array')
    return
  }

  t.plans = t.plans.map(function(p) {
    if (!Array.isArray(p)) {
      return [p]
    }

    return p
  })
})

data.forEach(function(d) {
  d.plans.flat(1).forEach(function(dd) {
    dd.start = new Date(dd.start);
    dd.end = new Date(dd.end);
  });
});

const starts = data.flatMap(a => a.plans.flat(1).map(c => c.start))
const ends = data.flatMap(a => a.plans.flat(1).map(c => c.end))

const min = d3.min(starts)
const max = d3.max(ends)

const day = 60 * 60 * 24
const seconds = (max.getTime() - min.getTime()) / 1000
const weeks = Math.ceil(seconds / (day * 7))
console.log(weeks)

// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 30, left: 40 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom

// set the ranges
var y = d3.scaleBand().range([height, 0]).padding(0.1)

var x = d3.scaleTime().range([0, width*(weeks / 3)])

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3
  .select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .call(d3.zoom().on("zoom", function(e) {
    console.log(e)
    svg.attr('transform', 'translate(' + e.transform.x + ',' + margin.top + ')')
  })
)

x.domain([min, max]).nice()


y.domain(data.map(function (d, idx) {
    return idx
  }))

const groups = svg.selectAll('.group')
  .data(data)
  .enter()
  .append('g')
  .classed('group', true);

function getRowHeight(p) {
  const arr = p.map(a => a.height || 20)
  return Math.max.apply(null, arr)
}

let c = 5;
groups.each(function(_, i) {
  const group = d3.select(this);
  _.plans.forEach((p, i2) => {
    const height = getRowHeight(p)
    group.selectAll('bar')
      .data(d => p)
      .enter()
      .append('rect')
      .attr('x', (d, i3) => {
        console.log(d, i3)
        return x(d.start)
      })
      .attr('width', d => x(d.end) - x(d.start))
      .attr('y', c)
      .attr('height', height);

      c += height + 5
  })

})

// svg.append('image')
//   .attr('x', x(4))
//   .attr('y', 3 * y.bandwidth())
//   .attr('width', 20)
//   .attr('height', 20)
//   .attr('href', 'https://upload.wikimedia.org/wikipedia/commons/5/51/Star_full.svg')
// add the x Axis
svg
  .append('g')
  .call(d3.axisTop(x))

svg.append('g')
  .call(d3.axisLeft(y).tickFormat(() => '').tickSize(0))

const labels = svg.append('g')
  .attr('class', 'group-labels')

options.columns.forEach(function(c, i) {
  const col = labels.append('g')
    .attr('class', 'column')
    .attr('data-column', c.field)
})

// add the y Axis
// svg.append('g').call(d3.axisLeft(y))
