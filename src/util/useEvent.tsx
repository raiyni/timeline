import { Ref, useEffect } from "preact/hooks";
import { PointerCallback, POINTER_EVENT } from "../types";

export const useEvent = (ref: Ref<any>, event: keyof typeof POINTER_EVENT, callback: PointerCallback) => {
  useEffect(() => {
    if (!callback) {
      return
    }

    ref.current.addEventListener(event, callback)

    return () => ref.current.removeEventListener(event)
  }, [callback])
}
