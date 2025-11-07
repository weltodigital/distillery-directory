'use client'

import { useState, useEffect } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Establishment } from '@/types/establishment'
import { csvToEstablishments } from '@/lib/csvParser'
import { organizeByLocation } from '@/lib/locationUtils'
import EstablishmentCard from '@/components/EstablishmentCard'

export default function BreweriesPage() {
  const [breweries, setBreweries] = useState<Establishment[]>([])
  const [organizedBreweries, setOrganizedBreweries] = useState<Record<string, Record<string, Establishment[]>>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBreweries = async () => {
      try {
        const response = await fetch('/Distill Directory - Sheet1.csv')
        const csvContent = await response.text()
        const allEstablishments = csvToEstablishments(csvContent)
        const breweryData = allEstablishments.filter(est => est.categoryName === 'Brewery')

        setBreweries(breweryData)
        setOrganizedBreweries(organizeByLocation(breweryData))
      } catch (error) {
        console.error('Error loading breweries:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBreweries()
  }, [])

  // Generate JSON-LD schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Best Breweries in the UK | British Breweries Directory",
    "description": "Discover the finest breweries across England, Scotland, Wales and Northern Ireland. Complete directory of craft breweries, traditional ale houses, and beer producers with locations, reviews and contact details.",
    "url": "https://british-spirits-ales.com/breweries",
    "mainEntity": {
      "@type": "ItemList",
      "name": "UK Breweries Directory",
      "description": "Comprehensive listing of breweries in the United Kingdom",
      "numberOfItems": breweries.length,
      "itemListElement": breweries.slice(0, 10).map((brewery, index) => ({
        "@type": "LocalBusiness",
        "position": index + 1,
        "name": brewery.title,
        "description": `${brewery.categoryName} located in ${brewery.city}`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": brewery.street,
          "addressLocality": brewery.city,
          "addressCountry": "GB"
        },
        "url": brewery.website,
        "telephone": brewery.phone,
        "aggregateRating": brewery.totalScore > 0 ? {
          "@type": "AggregateRating",
          "ratingValue": brewery.totalScore,
          "reviewCount": brewery.reviewsCount,
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
          "name": "Breweries",
          "item": "https://british-spirits-ales.com/breweries"
        }
      ]
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading breweries...</p>
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
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-block mb-6">
              <div className="text-6xl mb-4">🍺</div>
              <div className="h-px w-24 bg-white/30 mx-auto"></div>
            </div>

            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Best Breweries in the UK
            </h1>

            <p className="text-xl text-orange-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Discover {breweries.length}+ exceptional breweries across England, Scotland, Wales, and Northern Ireland.
              From traditional ale houses with centuries of heritage to innovative craft breweries pushing the boundaries of modern brewing.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                🏴󠁧󠁢󠁥󠁮󠁧󠁿 {Object.keys(organizedBreweries).length} Countries
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                📍 {Object.values(organizedBreweries).reduce((acc, counties) => acc + Object.keys(counties).length, 0)} Counties
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                ⭐ {breweries.reduce((acc, b) => acc + b.reviewsCount, 0)} Reviews
              </span>
            </div>
          </div>
        </div>

        {/* County Links by Country */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-serif font-bold text-slate-800 text-center mb-12">
              Browse Breweries by County
            </h2>

            {Object.entries(organizedBreweries).map(([country, counties]) => (
              <div key={country} className="mb-8 last:mb-0">
                <h3 className="text-xl font-serif font-semibold text-slate-800 mb-4 flex items-center">
                  {country === 'England' && '🏴󠁧󠁢󠁥󠁮󠁧󠁿'}
                  {country === 'Scotland' && '🏴󠁧󠁢󠁳󠁣󠁴󠁿'}
                  {country === 'Wales' && '🏴󠁧󠁢󠁷󠁬󠁳󠁿'}
                  {country === 'Northern Ireland' && '🇮🇪'}
                  <span className="ml-2">{country}</span>
                  <span className="ml-auto text-sm text-slate-600 font-normal">
                    {Object.keys(counties).length} counties
                  </span>
                </h3>

                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Object.entries(counties).map(([county, establishments]) => (
                    <Link
                      key={county}
                      href={`/breweries/${county.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block p-3 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all duration-200 text-center"
                    >
                      <div className="font-semibold text-slate-800 text-sm">{county}</div>
                      <div className="text-xs text-slate-600">{establishments.length} breweries</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6">
              The Complete Guide to UK Breweries
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The United Kingdom boasts one of the world's richest brewing traditions, spanning over a millennium of craftsmanship.
              From the historic ale houses of medieval England to Scotland's innovative craft beer scene, British breweries represent
              the perfect marriage of time-honored techniques and cutting-edge innovation.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-serif font-semibold text-slate-800 mb-4">Traditional British Ales</h3>
                <p className="text-slate-600">
                  Experience authentic bitter, mild, and IPA from breweries that have perfected their recipes
                  over generations. These establishments maintain the classic British brewing methods that made
                  UK ales world-famous.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-serif font-semibold text-slate-800 mb-4">Modern Craft Revolution</h3>
                <p className="text-slate-600">
                  Discover the new wave of British craft breweries experimenting with unique flavors, sustainable
                  practices, and innovative brewing techniques while respecting traditional foundations.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              British Beer Styles & Brewing Heritage
            </h3>

            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-amber-500 pl-6">
                <h4 className="font-semibold text-slate-800 mb-2">Traditional Bitter & Mild</h4>
                <p className="text-slate-600 text-sm">
                  Britain's signature beer styles include hoppy bitter ales and darker mild ales, traditionally
                  served from cask at cellar temperature. These session beers range from 3-5% ABV and showcase
                  British hop varieties like Fuggles, Goldings, and modern cultivars.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="font-semibold text-slate-800 mb-2">IPA Revival & Innovation</h4>
                <p className="text-slate-600 text-sm">
                  Originally brewed for British troops in India, IPA has been revolutionized by craft breweries
                  using American hops and modern techniques. British brewers now produce everything from
                  session IPAs to double IPAs with tropical fruit characteristics.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="font-semibold text-slate-800 mb-2">Stouts & Porters</h4>
                <p className="text-slate-600 text-sm">
                  London porter birthed an entire beer category, evolving into imperial stouts and modern
                  interpretations. British breweries produce complex dark beers featuring chocolate, coffee,
                  and roasted malt flavors, often aged in spirits barrels.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              Craft Beer Revolution & Market Growth
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              The UK craft beer market has grown from fewer than 300 breweries in 2000 to over 2,500 today,
              representing the highest brewery density per capita globally. Annual craft beer sales exceed £1.5
              billion, with microbreweries and brewpubs driving innovation in flavors, styles, and brewing
              techniques. The movement emphasizes local ingredients, seasonal variations, and experimental
              approaches that challenge traditional brewing conventions.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              Pub Culture & Real Ale Tradition
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              British pub culture centers around cask-conditioned real ale, served without artificial carbonation
              through traditional hand pumps. CAMRA (Campaign for Real Ale) has preserved this unique brewing
              tradition, supporting over 1,000 breweries producing live, unfiltered beers. Pub ownership models
              range from tied houses owned by large breweries to independent free houses showcasing local and
              guest ales, creating diverse drinking experiences across regions.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              Regional Brewing Identities & Ingredients
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              Each British region maintains distinct brewing characteristics shaped by local water, ingredients,
              and traditions. Yorkshire breweries favor dry, hoppy bitters using hard water, while Burton-on-Trent's
              sulfate-rich water creates perfect conditions for pale ales. Scottish breweries traditionally produce
              malty, less-hopped beers suited to cooler climates, while West Country breweries often incorporate
              local fruits and botanicals into seasonal specialties.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              Sustainability & Future Brewing Trends
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              Modern British breweries lead sustainability initiatives through renewable energy adoption, water
              conservation, and waste reduction programs. Many operate zero-waste facilities, using spent grain
              for animal feed and anaerobic digestion. Emerging trends include low-alcohol and alcohol-free beers,
              wild fermentation, and hybrid beer-wine styles. Climate change considerations drive selection of
              drought-resistant hop varieties and alternative grains, ensuring brewing tradition continuity.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              Beer Tourism & Brewery Experiences
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              UK brewery tourism generates over £500 million annually, with ale trails, brewery tours, and
              beer festivals attracting domestic and international visitors. Many breweries offer comprehensive
              experiences including brewing courses, food pairings, and accommodation. The Great British Beer
              Festival, local CAMRA festivals, and brewery open days create year-round celebration of British
              brewing culture, establishing beer tourism as a significant cultural and economic force.
            </p>
          </div>
        </div>

      </div>
    </>
  )
}