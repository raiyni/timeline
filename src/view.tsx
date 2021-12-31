import { h } from 'preact'
import { useEffect, useReducer, useRef } from 'preact/hooks'
import { setEvents, setWidth } from './actions'
import { Column } from './column'
import { Grid } from './grid'
import { Header } from './header'
import { Config, DEFAULT_STATE, reducer } from './store'
import { ViewProps } from './types'
import { useDebounce } from './util/useDebounce'
import { useProcessData } from './util/useProcessData'
import { useResizeObserver } from './util/useResizeObserver'

export function View({ data, config, ...events }: ViewProps) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE)
  const store = { state, dispatch }

  const bodyRef = useRef(null)
  const leftRef = useRef(null)

  const gridRef = useRef(null)
  const headerRef = useRef(null)

  const columnsRef = useRef([])

  const width = useResizeObserver(bodyRef)

  useDebounce(() => {
      if (leftRef.current == null) {
        return
      }

      // subtract padding + columns width
      dispatch(setWidth(width - (leftRef.current.clientWidth + 18)))
    },
    150,
    [width, leftRef]
  )

  useEffect(() => {
    if (headerRef.current == null || gridRef.current == null) return () => {}

    const scroll = gridRef.current.addEventListener('scroll', (e: any) => {
      headerRef.current.scrollLeft = e.target.scrollLeft
      columnsRef.current.forEach((ref: any) => (ref.scrollTop = e.target.scrollTop))
    })
    return () => gridRef.current.removeEventListener('scroll', scroll)
  }, [headerRef, gridRef])


  useEffect(() => {
    dispatch(setEvents(events))
  }, Object.values(events))

  useProcessData(dispatch, data, config)

  const columns = config.columns || []

  return (
    <Config.Provider value={store}>
      <div
        ref={bodyRef}
        style={{
          width: '100%',
          height: '100vh',
          maxHeight: store.state.height,
          display: 'flex',
          'flex-direction': 'row',
          'align-items': 'stretch',
          overflow: 'hidden',
          'background-color': 'white',
        }}
      >
        {/* Left side */}
        <div
          ref={leftRef}
          style={{
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          {columns.map((c, idx) => (
            <Column gridRef={gridRef} forwardedRef={(dom: any) => (columnsRef.current[idx] = dom)} column={c} idx={idx} />
          ))}
        </div>

        {/* Right side */}
        <div
          style={{
            display: 'flex',
            flex: '1 1 0%',
            overflow: 'hidden',
          }}
        >
          <div
            className="column-border"
            style={{
              overflow: 'hidden',
              borderRight: '1px solid #000',
              position: 'relative',
            }}
          ></div>
          <div
            style={{
              position: 'relative',
              flex: '1 1 0%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              overflow: 'hidden',
            }}
          >
            <Header forwardedRef={headerRef} />
            <Grid forwardedRef={gridRef} />
          </div>
        </div>
      </div>
    </Config.Provider>
  )
}
