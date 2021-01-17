import { Ref, h } from 'preact'

import { Axis } from './axis'
import { Config } from './store'
import dayjs from 'dayjs'
import { useContext } from 'preact/hooks'

export const Header = (props: any, ref: Ref<any>) => {
  const store = useContext(Config)
  const state = store.state

  const ticks = state.ticks
  const height = 30

  return (
    <div
      ref={ref}
      style={{
        overflow: 'hidden',
        'padding-right': '18px',
        'background-color': 'white',
        height
      }}
    >
      <Axis>
        <svg width={state.scrollWidth} height={height}>
          <g
            transform={`translate(-1, 30)`}
            fill="none"
            font-size="10"
            font-family="sans-serif"
            text-anchor="middle"
          >
            <path
              class="domain"
              stroke="currentColor"
              d={`M0.5,-6V0.5H${state.scrollWidth}.5V-6`}
            ></path>
            {ticks.map((t: dayjs.Dayjs) => {
              return (
                <g
                  class="tick"
                  opacity="1"
                  transform={`translate(${state.x(t)},0)`}
                >
                  <line stroke="black" y2="-6"></line>
                  <text fill="black" y="-9" dy="0em">
                    {t.format('MMM D')}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>
      </Axis>
    </div>
  )
}
