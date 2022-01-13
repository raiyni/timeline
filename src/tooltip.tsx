import { h } from 'preact'
import { useCallback, useState } from 'preact/hooks'
import { EventCallback, useEventBus } from './eventbus'

export const Tooltip = () => {
  const eventBus = useEventBus()
  const [state, setState] = useState({
    x: 0,
    y: 0,
    display: 'none',
    content: '',
    html: '',
    style: {}
  })

  const moveTooltip = useCallback((e: any) => {
    setState((s) => ({ ...s, x: e.detail.clientX, y: e.detail.clientY }))
  }, [])

  const toggleTooltip = useCallback((e: any) => {
    setState((s) => ({ ...s, display: s.display == 'none' ? 'block' : 'none' }))
  }, [])

  const tooltipContent = useCallback((e: any) => {
    if (typeof e.detail == 'string') {
      setState((s) => ({ ...s, html: e.detail }))
    } else {
      setState((s) => ({ ...s, content: e.detail }))
    }
  }, [])

  const tooltipStyle = useCallback((e: any) => {
    setState((s) => ({ ...s, style: { ...e.detail } }))
  }, [])

  eventBus.useEvent('moveTooltip', moveTooltip as EventCallback)
  eventBus.useEvent('toggleTooltip', toggleTooltip as EventCallback)
  eventBus.useEvent('tooltipContent', tooltipContent as EventCallback)
  eventBus.useEvent('tooltipStyle', tooltipStyle as EventCallback)

  return (
    <div
      style={{
        position: 'absolute',
        left: state.x + 20,
        top: state.y + 20,
        display: state.display,
        backgroundColor: 'white',
        ...state.style
      }}
      {...(state.html ? { dangerouslySetInnerHTML: { __html: state.html } } : {})}
    >
      {state.content}
    </div>
  )
}
