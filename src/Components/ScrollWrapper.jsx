import React, { useRef, useEffect } from 'react'
import Scrollbar from 'smooth-scrollbar'

export default function ScrollWrapper({ children }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!scrollRef.current) return

    const scrollbar = Scrollbar.init(scrollRef.current, {
      damping: 0.1,
      continuousScrolling: false,
      renderByPixels: true,
      // wheel-параметры входят в ядро, можно указывать прямо здесь:
      plugins: {
        wheel: {
          speed: 0.1,
          normalizeWheel: true,
        },
      },
    })

    window.globalScrollbar = scrollbar

    return () => scrollbar.destroy()
  }, [])

  return (
    <div
      ref={scrollRef}
      id="scroll-container"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      <div style={{ minHeight: '100%' }}>
        {children}
      </div>
    </div>
  )
}
