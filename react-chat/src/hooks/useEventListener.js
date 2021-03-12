import { useRef, useEffect } from 'react'

const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    if (!element || !element.on) return

    const eventListener = event => savedHandler.current(event)
    element.on(eventName, eventListener)

    return () => element.removeListener(eventName, eventListener)
  }, [eventName, element])
}

export default useEventListener
