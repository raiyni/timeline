import { h } from 'preact'
import { useConfig } from './util/useConfig'

const Label  = ({obj, field}: any) => {
  return (
    <div style={{
      'background-color': obj.over ? 'blue' : 'inherit'
    }}>
      {obj[field]}
    </div>
  )
}

export const ProplessColumn = ({ field }: any) => {
  const store = useConfig()
  const state = store.state

  return (
    <div>
      {state.array.map((o, idx) => <Label obj={o} field={field} key={`${field}-col-${idx}`} />)}
    </div>
  )
}
