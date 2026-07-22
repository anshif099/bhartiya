import { useState, useRef, useEffect } from 'react'
import App from './App'
import BhartiyaPage from './BhartiyaPage'
import AboutGccsPage from './AboutGccsPage'
import SpeakersPage from './SpeakersPage'
import EventPage from './EventPage'
import './PageFlipContainer.css'

// Page order: 0=Home, 1=Bhartiya, 2=About, 3=Speakers, 4=Event
const TAB_PAGE_MAP = {
  bhartiya: 1,
  about: 2,
  speakers: 3,
  event: 4,
}

const MAX_PAGE = 4

// Very slow realistic 2.2-second page flip transition for graceful scrolling down & up
const FLIP_TRANSITION = 'transform 2.2s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 2.2s ease'

function PageFlipContainer() {
  const [currentPage, setCurrentPage] = useState(0)
  const [dragProgress, setDragProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  const dragStartX = useRef(null)
  const currentPageRef = useRef(0)
  const lastWheelTime = useRef(0)

  useEffect(() => {
    currentPageRef.current = currentPage
  }, [currentPage])

  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(MAX_PAGE, idx))
    if (clamped === currentPageRef.current) return
    setCurrentPage(clamped)
    setDragProgress(0)
    setIsDragging(false)
    if (clamped === 0) setTimeout(() => setResetKey((k) => k + 1), 2200)
  }

  const next = () => goTo(currentPageRef.current + 1)
  const prev = () => goTo(currentPageRef.current - 1)

  /* ── Mouse Wheel Slow Page Turning ── */
  const handleWheel = (e) => {
    const now = Date.now()
    if (now - lastWheelTime.current < 1400 || Math.abs(e.deltaY) < 10) return
    lastWheelTime.current = now
    if (e.deltaY > 0) next()
    else prev()
  }

  /* ── Interactive Turn.js Touch/Mouse Drag Physics ── */
  const handlePointerDown = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    dragStartX.current = clientX
    setIsDragging(true)
  }

  const handlePointerMove = (e) => {
    if (!isDragging || dragStartX.current === null) return
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const deltaX = clientX - dragStartX.current
    const viewportWidth = 360

    if (deltaX < 0 && currentPageRef.current < MAX_PAGE) {
      // Dragging left to turn forward
      const progress = Math.min(1, Math.max(0, -deltaX / viewportWidth))
      setDragProgress(progress)
    } else if (deltaX > 0 && currentPageRef.current > 0) {
      // Dragging right to turn back
      const progress = Math.min(1, Math.max(0, deltaX / viewportWidth))
      setDragProgress(-progress)
    }
  }

  const handlePointerUp = () => {
    if (!isDragging) return
    dragStartX.current = null
    setIsDragging(false)

    if (dragProgress > 0.28) {
      next()
    } else if (dragProgress < -0.28) {
      prev()
    }
    setDragProgress(0)
  }

  const handleTabChange = (tabId) => {
    const idx = TAB_PAGE_MAP[tabId]
    if (idx !== undefined) goTo(idx)
  }

  /* Calculate rotation angle & layer styles for page index `p` */
  const getPageStyle = (p) => {
    let angle = 0
    const transition = isDragging ? 'none' : FLIP_TRANSITION

    if (p < currentPage) {
      // Previously flipped page
      if (p === currentPage - 1 && dragProgress < 0) {
        angle = -180 + Math.abs(dragProgress) * 180
      } else {
        angle = -180
      }
    } else if (p === currentPage) {
      // Current top active page
      if (dragProgress > 0) {
        angle = -dragProgress * 180
      } else {
        angle = 0
      }
    } else {
      // Page underneath waiting
      angle = 0
    }

    // Determine zIndex
    let zIndex = 1
    if (p === currentPage) zIndex = 10
    else if (p === currentPage - 1 && dragProgress < 0) zIndex = 12
    else if (p < currentPage) zIndex = 2
    else zIndex = 5 - p

    return {
      transform: `rotateY(${angle}deg)`,
      transition,
      zIndex,
      visibility: (p <= currentPage + 1 && p >= currentPage - 1) || p === 0 ? 'visible' : 'hidden',
    }
  }

  return (
    <div
      className="flip-viewport"
      onWheel={handleWheel}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      <div className="flip-book">

        {/* ── Page 5: Event ── */}
        <div className={`page-layer ${currentPage >= 4 ? 'is-flipped' : ''}`} style={getPageStyle(4)}>
          <EventPage
            onBack={() => goTo(3)}
            onTabChange={handleTabChange}
          />
        </div>

        {/* ── Page 4: Speakers ── */}
        <div className={`page-layer ${currentPage >= 3 ? 'is-flipped' : ''}`} style={getPageStyle(3)}>
          <SpeakersPage
            onBack={() => goTo(2)}
            onTabChange={handleTabChange}
          />
        </div>

        {/* ── Page 3: About GCCs ── */}
        <div className={`page-layer ${currentPage >= 2 ? 'is-flipped' : ''}`} style={getPageStyle(2)}>
          <AboutGccsPage
            onBack={() => goTo(1)}
            onTabChange={handleTabChange}
          />
        </div>

        {/* ── Page 2: Bhartiya ── */}
        <div className={`page-layer ${currentPage >= 1 ? 'is-flipped' : ''}`} style={getPageStyle(1)}>
          <BhartiyaPage
            onBack={() => goTo(0)}
            onTabChange={handleTabChange}
          />
        </div>

        {/* ── Page 1: Home ── */}
        <div className={`page-layer page-front ${currentPage >= 1 ? 'is-flipped' : ''}`} style={getPageStyle(0)}>
          <App key={resetKey} onSlideComplete={() => goTo(1)} />
        </div>

      </div>
    </div>
  )
}

export default PageFlipContainer
