import { h } from 'preact'
import { useConfig } from './util/useConfig';

export const Highlights = () => {
  const store = useConfig()
  const state = store.state
  const highlights = state.highlights
  return (
    <svg style={{
      position: 'absolute',
      left: 0,
      top: 0,
      pointerEvents: 'none',
      height: state.height - 58,
      width: state.scrollWidth
    }
  }
    >
      {highlights.map((hl) => <rect x={state.x(hl.start)} y={0} width={state.x(hl.end) - state.x(hl.start)} height='100%' style={{
        fill: hl.fill,
        opacity: 0.125
        }} />)}
    </svg>
  )
}
