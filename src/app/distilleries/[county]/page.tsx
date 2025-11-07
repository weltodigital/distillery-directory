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

export default function DistilleryCountyPage({ params }: CountyPageProps) {
  const resolvedParams = use(params)
  const [distilleries, setDistilleries] = useState<Establishment[]>([])
  const [loading, setLoading] = useState(true)
  const [countyName, setCountyName] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const loadDistilleriesForCounty = async () => {
      try {
        const response = await fetch('/establishments.csv')
        const csvContent = await response.text()
        const allEstablishments = csvToEstablishments(csvContent)
        const distilleryData = allEstablishments.filter(est => est.categoryName === 'Distillery')
        const organizedData = organizeByLocation(distilleryData)

        const countySlug = resolvedParams.county
        let foundDistilleries: Establishment[] = []
        let foundCountyName = ''

        Object.entries(organizedData).forEach(([country, counties]) => {
          Object.entries(counties).forEach(([county, establishments]) => {
            const countySlugToMatch = county.toLowerCase().replace(/\s+/g, '-')
            if (countySlugToMatch === countySlug) {
              foundDistilleries = establishments
              foundCountyName = county
            }
          })
        })

        setDistilleries(foundDistilleries)
        setCountyName(foundCountyName || `No distilleries found for ${countySlug}`)
        setLoading(false)
      } catch (error) {
        console.error('Error loading distilleries:', error)
        setLoading(false)
      }
    }

    loadDistilleriesForCounty()
  }, [mounted, resolvedParams.county])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading distilleries...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading {countyName} distilleries...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Best Distilleries in {countyName} Near You
          </h1>
          <p className="text-xl text-amber-100 max-w-4xl mx-auto mb-8">
            Discover {distilleries.length} exceptional distilleries in {countyName}.
          </p>
        </div>
      </div>

      {/* Distilleries Listings */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Link href="/" className="text-slate-500 hover:text-slate-700">Home</Link>
            <span className="text-slate-400">/</span>
            <Link href="/distilleries" className="text-slate-500 hover:text-slate-700">Distilleries</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">{countyName}</span>
          </nav>

          <h2 className="text-3xl font-bold mb-8">All {distilleries.length} Distilleries in {countyName}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {distilleries.map((establishment, index) => (
              <EstablishmentCard key={index} establishment={establishment} />
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">
            {countyName} Distillery Locations
          </h2>

          <EstablishmentMap establishments={distilleries} className="mb-8" />

          <p className="text-center text-slate-600">
            Interactive map showing all {distilleries.length} distilleries in {countyName}.
            Click on markers to view establishment details and contact information.
          </p>
        </div>
      </div>

      {/* County Information Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              {countyName} Distilleries & Premium Spirits Guide
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {countyName} represents one of Britain's most distinguished spirits-producing regions, home to {distilleries.length} exceptional
              distilleries that showcase world-class whisky, gin, vodka, and specialty spirits production. This comprehensive guide explores
              the best distilleries in {countyName}, featuring award-winning single malt whiskies, premium craft gins, artisanal vodkas,
              and innovative spirits that have established the region as a premier destination for spirits enthusiasts worldwide.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Best Distilleries in {countyName} - Complete Directory
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              Our curated selection of {countyName} distilleries includes legendary Scotch whisky producers, innovative craft gin distillers,
              and artisanal spirits makers, each offering unique tasting experiences and exceptional products. From traditional copper pot
              still whisky distillation to modern botanical gin production, these {countyName} distilleries showcase centuries of heritage
              combined with cutting-edge distillation techniques and sustainable production methods.
            </p>

            {distilleries.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                  <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
                    🥃 Premium Spirit Production
                  </h3>
                  <p className="text-amber-800 text-sm">
                    {countyName} distilleries specialize in single malt Scotch whisky, premium gin with locally foraged botanicals,
                    craft vodka, aged rum, and innovative liqueurs. Many utilize traditional copper pot stills, column stills, and
                    hybrid distillation systems, combined with locally sourced water and carefully selected grains to create distinctive
                    spirits that reflect the unique character of {countyName}.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                    🏭 Heritage & Master Distillers
                  </h3>
                  <p className="text-blue-800 text-sm">
                    The {countyName} distilling tradition spans centuries, with master distillers passing down time-honored techniques
                    through generations. Many distilleries combine traditional Scottish methods with innovative approaches, utilizing
                    advanced aging techniques, unique cask selection, and proprietary yeast strains to create award-winning spirits
                    that capture the essence of {countyName}'s terroir.
                  </p>
                </div>
              </div>
            )}

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Whisky & Spirits Tourism in {countyName}
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              {countyName} offers world-class whisky and spirits tourism with guided distillery tours, master class tastings, and
              exclusive behind-the-scenes experiences available year-round. Visitors can explore historic distilleries, witness
              traditional mashing and fermentation processes, learn about cask maturation, and participate in professional spirit
              tastings led by expert distillers and brand ambassadors.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              {countyName} Whisky Trail & Distillery Routes
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              The {countyName} whisky trail connects historic and contemporary distilleries, creating an exceptional itinerary for
              spirits enthusiasts. This carefully planned route allows visitors to compare different distillation styles, explore
              diverse flavor profiles, and discover rare limited editions from {countyName}'s finest producers. Many distilleries
              offer exclusive bottlings, distillery-only releases, and personalized tasting experiences for whisky trail visitors.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Awards & International Recognition
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              {countyName} distilleries have earned prestigious awards from international spirits competitions, including recognition
              from the International Wine & Spirit Competition, World Whiskies Awards, San Francisco World Spirits Competition, and
              regional spirits awards. These accolades confirm the exceptional quality and innovative character of {countyName} spirits,
              establishing the region's reputation among global spirits critics, collectors, and connoisseurs.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Craft Gin & Botanical Distilling in {countyName}
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              {countyName} has emerged as a leading region for craft gin production, with distilleries utilizing locally foraged
              botanicals, traditional juniper, and innovative flavor combinations. Many gin producers focus on small-batch production,
              seasonal botanical variations, and unique distillation techniques that highlight the natural ingredients available in
              {countyName}'s diverse landscapes and ecosystems.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Sustainable Distilling & Environmental Practices
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              Many {countyName} distilleries are committed to sustainable production methods, implementing environmentally responsible
              practices including renewable energy usage, water conservation, waste reduction, and carbon-neutral operations. These
              initiatives include local sourcing, organic grain selection, eco-friendly packaging, and community partnership programs
              that support the long-term sustainability of {countyName}'s spirits industry.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Planning Your {countyName} Distillery Experience
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              When planning your visit to {countyName} distilleries, consider booking tours and tastings in advance, especially during
              peak seasons and special events. Many distilleries offer VIP experiences, master class sessions, blending workshops,
              and exclusive tastings that showcase rare expressions and limited releases. Check individual distillery websites for
              opening hours, tour schedules, tasting fees, and special events throughout the year.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link
              href="/distilleries"
              className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors duration-200 rounded-lg"
            >
              ← View All UK Distilleries
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
