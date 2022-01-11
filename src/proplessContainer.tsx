import { h } from 'preact'
import { Propless } from './propless'
import { useConfig } from './util/useConfig'

export const ProplessContainer = () => {
  const store = useConfig()
  const state = store.state

  return (
    <div  style={{
      width: '100%'
    }}>
      {state.array.map((o, idx) => <Propless obj={o} idx={idx} key={`propless-${idx}`} />)}
    </div>
  )
}
