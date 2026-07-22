import { useState, useRef, useEffect } from 'react'
import './App.css'

function App({ onSlideComplete }) {
  const [dragProgress, setDragProgress] = useState(0) // 0 to 1
  const [isUnlocked, setIsUnlocked] = useState(false)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const trackRef = useRef(null)
  const maxOffsetRef = useRef(170)

  useEffect(() => {
    const handleGlobalMove = (e) => {
      if (!isDragging.current || !trackRef.current) return
      if (e.stopPropagation) e.stopPropagation()

      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const deltaX = clientX - startX.current
      const trackWidth = trackRef.current.clientWidth
      const knobWidth = 72
      const maxDrag = Math.max(1, trackWidth - knobWidth - 8)
      maxOffsetRef.current = maxDrag

      let newProgress = Math.max(0, Math.min(1, deltaX / maxDrag))
      setDragProgress(newProgress)
    }

    const handleGlobalEnd = (e) => {
      if (!isDragging.current) return
      if (e.stopPropagation) e.stopPropagation()
      isDragging.current = false

      setDragProgress((prev) => {
        if (prev > 0.45) {
          setIsUnlocked(true)
          onSlideComplete?.()
          return 1
        } else {
          setIsUnlocked(false)
          return 0
        }
      })
    }

    window.addEventListener('mousemove', handleGlobalMove)
    window.addEventListener('mouseup', handleGlobalEnd)
    window.addEventListener('touchmove', handleGlobalMove, { passive: false })
    window.addEventListener('touchend', handleGlobalEnd)

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove)
      window.removeEventListener('mouseup', handleGlobalEnd)
      window.removeEventListener('touchmove', handleGlobalMove)
      window.removeEventListener('touchend', handleGlobalEnd)
    }
  }, [onSlideComplete])

  const handleStart = (e) => {
    e.stopPropagation()
    isDragging.current = true
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const trackWidth = trackRef.current ? trackRef.current.clientWidth : 250
    const knobWidth = 72
    const maxDrag = Math.max(1, trackWidth - knobWidth - 8)
    maxOffsetRef.current = maxDrag
    startX.current = clientX - dragProgress * maxDrag
  }

  const handleTrackClick = (e) => {
    e.stopPropagation()
    if (!isUnlocked) {
      setDragProgress(1)
      setIsUnlocked(true)
      onSlideComplete?.()
    } else {
      setDragProgress(0)
      setIsUnlocked(false)
    }
  }

  const knobTranslateX = dragProgress * (maxOffsetRef.current || 170)

  return (
    <main className="mobile-page-container">
      <div className="content-wrapper">
        {/* Top Header Logo Section */}
        <header className="brand-header">
          <img 
            src="/favicon.svg" 
            alt="BHARTIYA CONVERGE" 
            className="brand-logo" 
          />
        </header>

        {/* In Partnership With Section */}
        <section className="partnership-section">
          <p className="partnership-label">In Partnership with</p>
          <img 
            src="/partner.svg" 
            alt="Future of Retail" 
            className="partner-logo" 
          />
        </section>

        {/* Main Event Headline */}
        <section className="event-headline-section">
          <h2 className="event-title">
            An exclusive dinner for CXOs of the<br />
            UK retail &amp; fashion industry
          </h2>
        </section>

        {/* Description Paragraph */}
        <section className="event-description-section">
          <p className="event-description">
            Join us for an evening with industry leaders to explore how smarter decisions, greater agility, and future-ready thinking are shaping the next generation of retail businesses through Global Capability Center in India .
          </p>
        </section>

        {/* Interactive Slide Button Section */}
        <section className="slider-section" onClick={(e) => e.stopPropagation()}>
          <div 
            className={`slider-container ${isUnlocked ? 'unlocked' : ''}`}
            ref={trackRef}
            onClick={handleTrackClick}
          >
            <div 
              className="slider-knob"
              style={{ transform: `translateX(${knobTranslateX}px)` }}
              onMouseDown={handleStart}
              onTouchStart={handleStart}
            >
              <img src="/Slider button.svg" alt="Knob" className="slider-button-img" draggable="false" />
            </div>
          </div>

          <div className="slide-text-wrapper" onClick={handleTrackClick}>
            <span className="slide-text">
              {isUnlocked ? 'Welcome to Converge' : 'Slide To Know More'}
              <span className="arrows">
                <i>&gt;</i><i>&gt;</i><i>&gt;</i>
              </span>
            </span>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
