import { h } from 'preact'
import { setOver } from './actions'
import { useConfig } from './util/useConfig'

export const Propless = ({idx, obj}: any) => {
  const store = useConfig()

  return (
    <div style={{
      width: '100%'
    }}
      onPointerOver={(e) => { store.dispatch(setOver(idx, true))}}
      onPointerOut={(e) => { store.dispatch(setOver(idx, false))}}
    >
      {obj.text}
    </div>
  )
}
