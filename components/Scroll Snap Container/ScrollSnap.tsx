import React, { useRef, useState, useEffect } from 'react'
import './ScrollSnap.scss'
import ChevronLeft from '../SvgIcons/ChevronLeft' // SVG ICON for left Arrow
import ChevronRight from '../SvgIcons/ChevronRight' // SVG ICON for right Arrow

interface ScrollSnapContainerProps {
  children: React.ReactNode
}

const ScrollSnapContainer: React.FC<ScrollSnapContainerProps> = ({
  children,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)
  const [allItemsInViewport, setAllItemsInViewport] = useState(false)

  const updateScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current

      const tolerance = 1

      setAllItemsInViewport(scrollWidth <= clientWidth)

      setIsAtStart(scrollLeft <= tolerance)

      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - tolerance)
    }
  }

  useEffect(() => {
    const handleResizeOrScroll = () => {
      requestAnimationFrame(updateScrollState)
    }

    // Initial calculation
    updateScrollState()

    const currentScrollRef = scrollRef.current
    window.addEventListener('resize', handleResizeOrScroll)
    currentScrollRef?.addEventListener('scroll', handleResizeOrScroll)

    return () => {
      window.removeEventListener('resize', handleResizeOrScroll)
      currentScrollRef?.removeEventListener('scroll', handleResizeOrScroll)
    }
  }, [children])

  const scrollToNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (scrollRef.current && !allItemsInViewport) {
      const { clientWidth } = scrollRef.current
      scrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' })
    }
  }

  const scrollToPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (scrollRef.current && !allItemsInViewport) {
      const { clientWidth } = scrollRef.current
      scrollRef.current.scrollBy({ left: -clientWidth, behavior: 'smooth' })
    }
  }

  return (
    <div className='scroll-snap-container' id='scroll-snap-container'>
      <button
        onClick={scrollToPrev}
        aria-label='Previous Slide'
        className={`scroll-button ${isAtStart ? 'disabled' : ''}`}
        disabled={isAtStart || allItemsInViewport}
      >
        <ChevronLeft />
      </button>
      <div className='scroll-snap-content' ref={scrollRef}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null

          return (
            <div className='scroll-snap-item' key={index}>
              {child}
            </div>
          )
        })}
      </div>
      <button
        onClick={scrollToNext}
        aria-label='Next Slide'
        className={`scroll-button ${isAtEnd ? 'disabled' : ''}`}
        disabled={isAtEnd || allItemsInViewport}
      >
        <ChevronRight />
      </button>
    </div>
  )
}

export default ScrollSnapContainer
