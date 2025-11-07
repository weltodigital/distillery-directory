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

export default function BreweryCountyPage({ params }: CountyPageProps) {
  const resolvedParams = use(params)
  const [breweries, setBreweries] = useState<Establishment[]>([])
  const [loading, setLoading] = useState(true)
  const [countyName, setCountyName] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const loadBreweriesForCounty = async () => {
      try {
        console.log('Starting brewery data loading for county:', resolvedParams.county)

        const response = await fetch('/establishments.csv')
        const csvContent = await response.text()
        console.log('CSV loaded, length:', csvContent.length)

        // Process CSV data
        const allEstablishments = csvToEstablishments(csvContent)
        const breweryData = allEstablishments.filter(est => est.categoryName === 'Brewery')
        const organizedData = organizeByLocation(breweryData)

        const countySlug = resolvedParams.county
        let foundBreweries: Establishment[] = []
        let foundCountyName = ''

        Object.entries(organizedData).forEach(([country, counties]) => {
          Object.entries(counties).forEach(([county, establishments]) => {
            const countySlugToMatch = county.toLowerCase().replace(/\s+/g, '-')
            if (countySlugToMatch === countySlug) {
              foundBreweries = establishments
              foundCountyName = county
            }
          })
        })

        setBreweries(foundBreweries)
        setCountyName(foundCountyName || `No breweries found for ${countySlug}`)
        setLoading(false)
        console.log('Loading complete')

      } catch (error) {
        console.error('Error loading breweries:', error)
        setLoading(false)
      }
    }

    loadBreweriesForCounty()
  }, [mounted, resolvedParams.county])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading breweries...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading {countyName} breweries...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Best Breweries in {countyName} Near You
          </h1>
          <p className="text-xl text-orange-100 max-w-4xl mx-auto mb-8">
            Discover {breweries.length} exceptional breweries in {countyName}.
          </p>
        </div>
      </div>

      {/* Breweries Listings */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Link href="/" className="text-slate-500 hover:text-slate-700">Home</Link>
            <span className="text-slate-400">/</span>
            <Link href="/breweries" className="text-slate-500 hover:text-slate-700">Breweries</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">{countyName}</span>
          </nav>

          <h2 className="text-3xl font-bold mb-8">All {breweries.length} Breweries in {countyName}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {breweries.map((establishment, index) => (
              <EstablishmentCard key={index} establishment={establishment} />
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">
            {countyName} Brewery Locations
          </h2>

          <EstablishmentMap establishments={breweries} className="mb-8" />

          <p className="text-center text-slate-600">
            Interactive map showing all {breweries.length} breweries in {countyName}.
            Click on markers to view establishment details and contact information.
          </p>
        </div>
      </div>

      {/* County Information Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              {countyName} Breweries & Craft Beer Guide
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {countyName} stands as one of Britain's premier craft beer destinations, home to {breweries.length} exceptional
              breweries that represent the pinnacle of British brewing excellence. This comprehensive guide explores the best
              breweries in {countyName}, featuring award-winning craft ales, innovative IPAs, traditional bitters, artisanal
              lagers, and specialty beers that have established the region as a world-class brewing destination for beer
              enthusiasts and ale connoisseurs worldwide.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Best Breweries in {countyName} - Complete Directory
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              Our curated selection of {countyName} breweries includes historic family-run establishments, innovative microbreweries,
              and award-winning craft beer producers, each offering unique tasting experiences and exceptional beers. From traditional
              cask-conditioned ales and heritage brewing methods to cutting-edge hop utilization and experimental brewing techniques,
              these {countyName} breweries showcase centuries of brewing heritage combined with modern innovation and sustainable
              production practices.
            </p>

            {breweries.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                  <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center">
                    🍺 Craft Beer Styles & Production
                  </h3>
                  <p className="text-orange-800 text-sm">
                    {countyName} breweries specialize in traditional British bitter, hoppy IPAs, smooth milds, robust stouts,
                    crisp lagers, and innovative seasonal brews. Many utilize traditional mash tuns, copper kettles, and
                    fermentation vessels alongside modern equipment, creating distinctive beers through carefully controlled
                    brewing processes, unique yeast strains, and creative hop combinations that showcase {countyName}'s brewing expertise.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                    🌾 Local Ingredients & Terroir
                  </h3>
                  <p className="text-green-800 text-sm">
                    Many {countyName} breweries prioritize locally sourced ingredients including regional hops, malted barley,
                    specialty grains, and pure local water sources. This commitment to local sourcing creates beers that truly
                    reflect the character and terroir of {countyName}, while supporting local farmers, hop growers, and
                    maltsters in sustainable agricultural partnerships.
                  </p>
                </div>
              </div>
            )}

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Brewery Tourism & Taproom Experiences in {countyName}
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              {countyName} offers exceptional brewery tourism with guided tours, professional beer tastings, and immersive
              educational experiences available year-round. Visitors can explore traditional brewhouses, witness the brewing
              process from grain to glass, participate in cask tapping ceremonies, and enjoy fresh beer straight from the source
              in welcoming taprooms that showcase the best of {countyName}'s brewing culture and hospitality.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              {countyName} Beer Trail & Brewery Routes
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              The {countyName} beer trail connects historic and contemporary breweries, creating an ideal itinerary for craft
              beer enthusiasts. This carefully curated route allows visitors to compare different brewing styles, explore diverse
              flavor profiles, and discover limited edition beers from {countyName}'s finest producers. Many breweries offer
              special packages for beer trail visitors, including flight tastings, brewery-exclusive releases, and behind-the-scenes
              access to brewing operations.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Awards & Recognition for {countyName} Beers
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              {countyName} breweries have earned prestigious awards from international beer competitions, including recognition
              from the Great British Beer Festival, World Beer Awards, International Beer Challenge, and regional CAMRA awards.
              These accolades highlight the exceptional quality and innovative character of {countyName} beers, establishing
              the region's reputation among global beer critics, industry professionals, and craft beer enthusiasts.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Traditional Ale & Heritage Brewing in {countyName}
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              {countyName} maintains strong connections to traditional British brewing heritage, with many breweries producing
              classic cask-conditioned ales, traditional bitters, milds, and porters using time-honored brewing methods.
              These establishments preserve historic recipes, utilize traditional ingredients, and maintain the artisanal
              brewing techniques that have defined British beer culture for centuries while adapting to modern quality
              standards and sustainability practices.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Craft Beer Innovation & Experimental Brewing
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              {countyName} breweries are at the forefront of craft beer innovation, experimenting with unique hop varieties,
              specialty malts, wild yeasts, barrel aging, and creative flavor combinations. Many breweries focus on limited
              edition releases, seasonal collaborations, and experimental series that push the boundaries of traditional
              brewing while maintaining the high quality standards that define {countyName}'s brewing reputation.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Sustainable Brewing & Environmental Responsibility
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              Many {countyName} breweries are committed to sustainable brewing practices, implementing environmentally responsible
              methods including renewable energy usage, water conservation, waste reduction, and carbon-neutral operations.
              These initiatives include organic ingredient sourcing, eco-friendly packaging, spent grain recycling programs,
              and community partnerships that support the long-term sustainability of {countyName}'s brewing industry.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Planning Your {countyName} Brewery Experience
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              When planning your visit to {countyName} breweries, consider booking tours and tastings in advance, especially
              during popular events and festival periods. Many breweries offer special experiences including beer and food
              pairing sessions, meet-the-brewer events, seasonal celebrations, and exclusive tastings of limited releases.
              Check individual brewery websites for opening hours, tour schedules, taproom availability, and special events
              throughout the year to make the most of your {countyName} brewing adventure.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link
              href="/breweries"
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors duration-200 rounded-lg"
            >
              ← View All UK Breweries
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
