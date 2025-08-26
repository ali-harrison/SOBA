'use client'

import { useEffect } from 'react'
import OpeningSection from '@/components/manifesto/OpeningSection'

export default function SOBAManifesto() {
  // Disable scroll restoration to ensure smooth experience
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <main className="bg-shadow text-light">
      {/* SEO/Meta would go in layout.tsx or head */}

      {/* Section 1: Deep Shadow Opening */}
      <OpeningSection />

      {/* Future sections will be added here */}
      {/* Section 2: Shadow Truth Recognition */}
      {/* Section 3: First Light Breakthrough */}
      {/* Section 4: Stepping Into Light */}
      {/* Section 5: Golden Transformation Call */}

      {/* Temporary placeholder for future sections */}
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gold mb-4">
            More Sections Coming...
          </h2>
          <p className="text-gray-400">
            This manifesto experience will continue to unfold
          </p>
        </div>
      </div>
    </main>
  )
}
