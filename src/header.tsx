import dayjs from 'dayjs'
import { h, Ref } from 'preact'
import { useContext } from 'preact/hooks'
import { Axis } from './axis'
import { Config } from './store'


export const Header = ({ forwardedRef }: { forwardedRef: Ref<any> }) => {
  const store = useContext(Config)
  const state = store.state

  const ticks = state.ticks
  const years = state.years
  const height = 30

  return (
    <div
      ref={forwardedRef}
      style={{
        overflow: 'hidden',
        'padding-right': '18px',
        'background-color': 'white',
        height
      }}
    >
      <Axis>
        <svg width={state.scrollWidth} height={height}>
          <g transform={`translate(-1, 15)`}  fill="none" font-size="10" font-family="sans-serif"  text-anchor="middle">
            {years.map((y) => {
              const tick = dayjs(new Date(y, 0, 0))
              return (
                <g class="tick" opacity="1" transform={`translate(${state.x(tick)},0)`}>
                  <line stroke="black" y1="3" y2="15"></line>
                  <text fill="black" >{y}</text>
                </g>
              )
            })}
          </g>
          <g transform={`translate(-1, 30)`} fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
            <path class="domain" stroke="currentColor" d={`M0.5,-6V0.5H${state.scrollWidth}.5V-6`}></path>
            {ticks.map((t: dayjs.Dayjs) => {
              return (
                <g class="tick" opacity="1" transform={`translate(${state.x(t)},0)`}>
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
