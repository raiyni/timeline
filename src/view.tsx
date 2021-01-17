import { Config, DEFAULT_STATE, reducer } from "./store";
import { useEffect, useReducer, useRef, useState } from "preact/hooks";

import { Columns } from "./columns";
import { Grid } from "./grid";
import { Header } from "./header";
import { ViewProps } from "./types";
import { changeSize } from "./actions";
import { h } from 'preact'
import { useDebounce } from "./util/useDebounce";
import { useProcessData } from './util/useProcessData';
import { useResizeObserver } from './util/useResizeObserver';

export function View ({data, config}: ViewProps) {
    const [state, dispatch] = useReducer(reducer, DEFAULT_STATE)
    const store = {state, dispatch}

    const ref = useRef(null)
    const columnRef = useRef(null)

    const gridRef = useRef(null)
    const headerRef = useRef(null)

    const size = useResizeObserver(ref)
    useDebounce(() => {
      if (columnRef.current == null) {
        return
      }

      // subtract padding + columns width
      size[0] -= columnRef.current.clientWidth + 18
      dispatch(changeSize(size))
    }, 150, [size, columnRef])

    useEffect(() => {
      if (headerRef.current == null || gridRef.current == null) return;

      gridRef.current.base.addEventListener('scroll', (e: any) => headerRef.current.base.scrollLeft = e.target.scrollLeft)
      return () => gridRef.current.base.removeEventListener('scroll')
    }, [headerRef, gridRef])

    useProcessData(dispatch, data, config)

    return (
        <Config.Provider value={store}>
          <div ref={ref} style={{
            width: '100%',
            height: '100%',
            'display': 'flex',
            'flex-direction': 'row',
            'align-items': 'stretch',
            overflow: 'hidden',
            'background-color': 'white'
          }}>
            {/* Left side */}
            <div ref={columnRef} style={{
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden',
              flexShrink: 0
            }}
            >
              <Columns columns={config.columns || []}/>
            </div>

            {/* Right side */}
            <div style={{
              display: 'flex',
              'flex': '1 1 0%',
              'overflow': 'hidden'
            }}>
              <div className="column-border" style={{
                overflow: 'hidden',
                borderRight: '1px solid #000',
                position: 'relative'
              }}></div>
              <div style={{
                position: 'relative',
                flex: '1 1 0%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                overflow: 'hidden'
              }}>
                <Header ref={headerRef} />
                <Grid ref={gridRef} />
              </div>
            </div>

          </div>
        </Config.Provider>
    )
}
