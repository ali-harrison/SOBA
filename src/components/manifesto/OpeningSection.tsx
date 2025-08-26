'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface CustomCursorProps {
  mousePosition: { x: number; y: number }
}

function CustomCursor({ mousePosition }: CustomCursorProps) {
  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{
        left: mousePosition.x - 10,
        top: mousePosition.y - 10,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="w-5 h-5 bg-gold rounded-full animate-lightSpot" />
    </div>
  )
}

export default function OpeningSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showCursor, setShowCursor] = useState(false)

  // Track mouse movement for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setShowCursor(true)
    }

    const handleMouseLeave = () => {
      setShowCursor(false)
    }

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove)
      containerRef.current.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove)
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  // GSAP Animation on Mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50,
      })

      // Create dramatic entrance timeline
      const tl = gsap.timeline({ delay: 0.5 })

      // Animate title with stagger effect
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'power3.out',
      }).to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
        },
        '-=0.5'
      )

      // Add subtle background pulse
      gsap.to(containerRef.current, {
        backgroundColor: '#2C2F33',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      {showCursor && <CustomCursor mousePosition={mousePosition} />}

      {/* Opening Section */}
      <section
        ref={containerRef}
        className="relative min-h-screen w-full bg-shadow flex items-center justify-center cursor-light overflow-hidden"
      >
        {/* Background Texture/Grain (Optional) */}
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-transparent via-midnight to-transparent pointer-events-none" />

        {/* Main Content */}
        <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl mx-auto">
          {/* Main Dramatic Question */}
          <h1
            ref={titleRef}
            className="responsive-text-dramatic font-black leading-tight mb-8 tracking-tight"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 900,
              letterSpacing: '-0.02em',
            }}
          >
            Are you{' '}
            <span className="block text-gold animate-illuminateGold">
              sick of being
            </span>
            <span className="block text-6xl md:text-8xl mt-4">AVERAGE?</span>
          </h1>

          {/* Supporting Text */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-400 font-light leading-relaxed hover-illuminate max-w-2xl mx-auto"
          >
            Most people accept mediocrity as their ceiling.{' '}
            <span className="text-light font-medium">
              They settle into comfortable shadows,
            </span>{' '}
            never knowing what they could become in the light.
          </p>
        </div>

        {/* Bottom Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-midnight">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs uppercase tracking-wider opacity-60">
              Question Everything
            </span>
            <div className="w-px h-12 bg-midnight animate-shadowPulse" />
          </div>
        </div>

        {/* Interactive Light Spots */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gold rounded-full opacity-20 animate-lightSpot"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </section>
    </>
  )
}
