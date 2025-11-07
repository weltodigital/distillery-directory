'use client'

import { useState, useEffect, use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Establishment } from '@/types/establishment'
import { csvToEstablishments } from '@/lib/csvParser'
import { organizeByLocation } from '@/lib/locationUtils'
import EstablishmentCard from '@/components/EstablishmentCard'
import EstablishmentMap from '@/components/EstablishmentMap'

interface CountyPageProps {
  params: Promise<{
    county: string
  }>
}

export default function VineyardCountyPage({ params }: CountyPageProps) {
  const resolvedParams = use(params)
  const [vineyards, setVineyards] = useState<Establishment[]>([])
  const [loading, setLoading] = useState(true)
  const [countyName, setCountyName] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const loadVineyardsForCounty = async () => {
      try {
        const response = await fetch('/establishments.csv')
        const csvContent = await response.text()
        const allEstablishments = csvToEstablishments(csvContent)
        const vineyardData = allEstablishments.filter(est =>
          est.categoryName === 'Winery' || est.categoryName === 'Vineyard'
        )
        const organizedData = organizeByLocation(vineyardData)

        const countySlug = resolvedParams.county
        let foundVineyards: Establishment[] = []
        let foundCountyName = ''

        Object.entries(organizedData).forEach(([country, counties]) => {
          Object.entries(counties).forEach(([county, establishments]) => {
            const countySlugToMatch = county.toLowerCase().replace(/\s+/g, '-')
            if (countySlugToMatch === countySlug) {
              foundVineyards = establishments
              foundCountyName = county
            }
          })
        })

        setVineyards(foundVineyards)
        setCountyName(foundCountyName || `No vineyards found for ${countySlug}`)
        setLoading(false)
      } catch (error) {
        console.error('Error loading vineyards:', error)
        setLoading(false)
      }
    }

    loadVineyardsForCounty()
  }, [mounted, resolvedParams.county])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading vineyards...</p>
        </div>
      </div>
    )
  }

  // Generate JSON-LD schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Best Vineyards in ${countyName} | ${countyName} Vineyard & Winery Directory`,
    "description": `Discover ${vineyards.length} exceptional vineyards and wineries in ${countyName}. Complete directory of English sparkling wine producers, Welsh vineyards, and boutique wineries with locations, reviews and wine tasting experiences.`,
    "url": `https://british-spirits-ales.com/vineyards/${resolvedParams.county}`,
    "mainEntity": {
      "@type": "ItemList",
      "name": `${countyName} Vineyards Directory`,
      "description": `Comprehensive listing of vineyards and wineries in ${countyName}`,
      "numberOfItems": vineyards.length,
      "itemListElement": vineyards.map((vineyard, index) => ({
        "@type": "LocalBusiness",
        "position": index + 1,
        "name": vineyard.title,
        "description": `${vineyard.categoryName} located in ${vineyard.city}, ${countyName}`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": vineyard.street,
          "addressLocality": vineyard.city,
          "addressRegion": countyName,
          "addressCountry": "GB"
        },
        "url": vineyard.website,
        "telephone": vineyard.phone,
        "aggregateRating": vineyard.totalScore > 0 ? {
          "@type": "AggregateRating",
          "ratingValue": vineyard.totalScore,
          "reviewCount": vineyard.reviewsCount,
          "bestRating": 5,
          "worstRating": 1
        } : undefined
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://british-spirits-ales.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Vineyards",
          "item": "https://british-spirits-ales.com/vineyards"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": countyName,
          "item": `https://british-spirits-ales.com/vineyards/${resolvedParams.county}`
        }
      ]
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading {countyName} vineyards...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 via-red-600 to-purple-600 py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-block mb-6">
              <div className="text-6xl mb-4">🍷</div>
              <div className="h-px w-24 bg-white/30 mx-auto"></div>
            </div>

            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Best Vineyards in {countyName} Near You
            </h1>

            <p className="text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Discover {vineyards.length} exceptional vineyards and wineries in {countyName}. From award-winning English sparkling wines
              rivaling Champagne to boutique Welsh vineyards producing unique terroir-driven wines.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                📍 {countyName}
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                🍷 {vineyards.length} Vineyards
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                ⭐ {vineyards.reduce((acc, v) => acc + v.reviewsCount, 0)} Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Vineyards Listings */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm mb-8">
              <Link href="/" className="text-slate-500 hover:text-slate-700">Home</Link>
              <span className="text-slate-400">/</span>
              <Link href="/vineyards" className="text-slate-500 hover:text-slate-700">Vineyards</Link>
              <span className="text-slate-400">/</span>
              <span className="text-slate-900 font-medium">{countyName}</span>
            </nav>

            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-8">
              All {vineyards.length} Vineyards in {countyName}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {vineyards.map((establishment, index) => (
                <EstablishmentCard key={index} establishment={establishment} />
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Map Section */}
        <div className="bg-slate-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-serif font-bold text-slate-800 text-center mb-12">
              {countyName} Vineyard Locations
            </h2>

            <EstablishmentMap establishments={vineyards} className="mb-8" />

            <p className="text-center text-slate-600">
              Interactive map showing all {vineyards.length} vineyards and wineries in {countyName}.
              Click on markers to view establishment details and contact information.
            </p>
          </div>
        </div>

        {/* County Information Section */}
        <div className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6">
                {countyName} Vineyards & Wine Region Guide
              </h2>

              <p className="text-slate-600 leading-relaxed mb-6">
                {countyName} stands as one of Britain's premier wine-producing regions, home to {vineyards.length} exceptional
                vineyards and wineries that represent the pinnacle of English and Welsh viticulture. This comprehensive guide
                explores the best vineyards in {countyName}, featuring award-winning English sparkling wines, boutique wineries,
                and family-run estates that have established the region as a world-class wine destination.
              </p>

              <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
                Best Vineyards in {countyName} - Complete Directory
              </h3>

              <p className="text-slate-600 leading-relaxed mb-6">
                Our curated selection of {countyName} vineyards includes both established wine estates and innovative newcomers,
                each offering unique tasting experiences and exceptional wines. From traditional methods champagne-style sparkling
                wines to award-winning still wines, these {countyName} wineries showcase the diverse terroir and microclimate
                advantages that make this region ideal for premium wine production.
              </p>

              {vineyards.length > 0 && (
                <div className="grid md:grid-cols-2 gap-8 my-12">
                  <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                    <h3 className="text-xl font-serif font-semibold text-purple-900 mb-4 flex items-center">
                      🍷 Wine Styles & Production
                    </h3>
                    <p className="text-purple-800 text-sm">
                      {countyName} vineyards specialize in premium English sparkling wines, elegant Pinot Noir, crisp
                      Chardonnay, and innovative blends. Many estates utilize traditional méthode champenoise techniques
                      alongside modern sustainable viticulture practices, creating wines that rival the best from Champagne
                      and other prestigious wine regions.
                    </p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 className="text-xl font-serif font-semibold text-green-900 mb-4 flex items-center">
                      🌿 Terroir & Growing Conditions
                    </h3>
                    <p className="text-green-800 text-sm">
                      The {countyName} wine region benefits from optimal soil composition, favorable microclimates, and
                      ideal topography for grape cultivation. The combination of chalky soils, southern exposure, and
                      protective geography creates perfect conditions for growing premium wine grapes, particularly
                      Chardonnay, Pinot Noir, and Pinot Meunier.
                    </p>
                  </div>
                </div>
              )}

              <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
                Wine Tourism & Vineyard Experiences in {countyName}
              </h3>

              <p className="text-slate-600 leading-relaxed mb-6">
                {countyName} offers exceptional wine tourism experiences with guided vineyard tours, professional wine
                tastings, and immersive educational programs available year-round. Visitors can explore state-of-the-art
                winemaking facilities, participate in harvest activities, enjoy wine and food pairing sessions, and learn
                about sustainable viticulture practices from expert winemakers.
              </p>

              <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
                {countyName} Wine Trail & Tasting Routes
              </h3>

              <p className="text-slate-600 leading-relaxed mb-6">
                The {countyName} wine trail connects multiple award-winning vineyards and wineries, creating an ideal
                itinerary for wine enthusiasts. This carefully curated route allows visitors to experience diverse wine
                styles, compare different winemaking approaches, and discover hidden gems among {countyName}'s wine
                producers. Many vineyards offer special packages for wine trail visitors, including group tastings,
                cellar door sales, and exclusive vineyard experiences.
              </p>

              <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
                Awards & Recognition for {countyName} Wines
              </h3>

              <p className="text-slate-600 leading-relaxed mb-6">
                {countyName} vineyards have received numerous prestigious awards from international wine competitions,
                including recognition from the Decanter World Wine Awards, International Wine Challenge, and regional
                wine competitions. These accolades highlight the exceptional quality and unique character of {countyName}
                wines, establishing the region's reputation among global wine critics and enthusiasts.
              </p>

              <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
                Sustainable Viticulture in {countyName}
              </h3>

              <p className="text-slate-600 leading-relaxed mb-6">
                Many {countyName} vineyards are committed to sustainable and organic farming practices, implementing
                environmentally responsible viticulture methods that preserve the natural ecosystem while producing
                exceptional wines. These practices include organic certification, biodynamic farming, carbon-neutral
                operations, and wildlife conservation initiatives that protect the unique terroir of {countyName}.
              </p>

              <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
                Planning Your {countyName} Vineyard Visit
              </h3>

              <p className="text-slate-600 leading-relaxed mb-6">
                When planning your visit to {countyName} vineyards, consider booking guided tours in advance, especially
                during peak seasons and harvest time. Many estates offer special events, seasonal tastings, and exclusive
                experiences that showcase the best of {countyName} wine culture. Check individual vineyard websites for
                opening hours, tasting fees, group bookings, and special events throughout the year.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <Link
                href="/vineyards"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-200 rounded-lg"
              >
                ← View All UK Vineyards
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}