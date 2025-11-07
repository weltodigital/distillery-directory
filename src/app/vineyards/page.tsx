'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Establishment } from '@/types/establishment'
import { csvToEstablishments } from '@/lib/csvParser'
import { organizeByLocation } from '@/lib/locationUtils'
import EstablishmentCard from '@/components/EstablishmentCard'

export default function VineyardsPage() {
  const [vineyards, setVineyards] = useState<Establishment[]>([])
  const [organizedVineyards, setOrganizedVineyards] = useState<Record<string, Record<string, Establishment[]>>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadVineyards = async () => {
      try {
        const response = await fetch('/Distill Directory - Sheet1.csv')
        const csvContent = await response.text()
        const allEstablishments = csvToEstablishments(csvContent)
        const vineyardData = allEstablishments.filter(est =>
          est.categoryName === 'Winery' || est.categoryName === 'Vineyard'
        )

        setVineyards(vineyardData)
        setOrganizedVineyards(organizeByLocation(vineyardData))
      } catch (error) {
        console.error('Error loading vineyards:', error)
      } finally {
        setLoading(false)
      }
    }

    loadVineyards()
  }, [])

  // Generate JSON-LD schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Best Vineyards & Wineries in the UK | English & Welsh Wine Producers",
    "description": "Discover the finest vineyards and wineries across England and Wales. Complete directory of English sparkling wine producers, Welsh vineyards, and boutique wineries with locations, reviews and wine tasting experiences.",
    "url": "https://british-spirits-ales.com/vineyards",
    "mainEntity": {
      "@type": "ItemList",
      "name": "UK Vineyards & Wineries Directory",
      "description": "Comprehensive listing of vineyards and wineries in the United Kingdom",
      "numberOfItems": vineyards.length,
      "itemListElement": vineyards.slice(0, 10).map((vineyard, index) => ({
        "@type": "LocalBusiness",
        "position": index + 1,
        "name": vineyard.title,
        "description": `${vineyard.categoryName} located in ${vineyard.city}`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": vineyard.street,
          "addressLocality": vineyard.city,
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
        }
      ]
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading vineyards...</p>
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
              Best Vineyards & Wineries in the UK
            </h1>

            <p className="text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Discover {vineyards.length}+ exceptional vineyards and wineries across England and Wales.
              From award-winning English sparkling wines rivaling Champagne to boutique Welsh vineyards
              producing unique terroir-driven wines in Britain's emerging wine regions.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                🏴󠁧󠁢󠁥󠁮󠁧󠁿 English Sparkling Wine
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                🏴󠁧󠁢󠁷󠁬󠁳󠁿 Welsh Terroir
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                ⭐ {vineyards.reduce((acc, v) => acc + v.reviewsCount, 0)} Reviews
              </span>
            </div>
          </div>
        </div>

        {/* County Links by Country */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-serif font-bold text-slate-800 text-center mb-12">
              Browse Vineyards by County
            </h2>

            {Object.entries(organizedVineyards).map(([country, counties]) => (
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
                      href={`/vineyards/${county.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block p-3 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 transition-all duration-200 text-center"
                    >
                      <div className="font-semibold text-slate-800 text-sm">{county}</div>
                      <div className="text-xs text-slate-600">{establishments.length} vineyards</div>
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
              The Complete Guide to UK Vineyards & Wineries
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The United Kingdom's wine industry has undergone a remarkable transformation, with English and Welsh vineyards
              now producing world-class wines that compete on the international stage. From the chalky soils of the South Downs
              producing exceptional sparkling wines to Wales' unique terroir creating distinctive still wines, British viticulture
              represents one of the most exciting emerging wine regions in the world.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h3 className="text-xl font-serif font-semibold text-yellow-900 mb-4 flex items-center">
                  🥂 English Sparkling Wine
                </h3>
                <p className="text-yellow-800 text-sm">
                  England's sparkling wine industry has gained international recognition, with many producers
                  using traditional Champagne methods and the same grape varieties (Chardonnay, Pinot Noir, Pinot Meunier)
                  to create world-class sparkling wines.
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-xl font-serif font-semibold text-red-900 mb-4 flex items-center">
                  🍇 Welsh Wine Heritage
                </h3>
                <p className="text-red-800 text-sm">
                  Welsh vineyards showcase unique terroir and innovative winemaking, producing distinctive
                  still wines that reflect Wales' maritime climate and diverse geology, creating wines
                  with remarkable character and complexity.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              British Wine Regions & Styles
            </h3>

            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-yellow-500 pl-6">
                <h4 className="font-semibold text-slate-800 mb-2">South East England</h4>
                <p className="text-slate-600 text-sm">
                  Home to the majority of English vineyards, with chalk soils similar to Champagne producing
                  exceptional sparkling wines. Counties include Kent, East Sussex, West Sussex, and Hampshire.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="font-semibold text-slate-800 mb-2">South West England</h4>
                <p className="text-slate-600 text-sm">
                  Warmer climate suitable for both sparkling and still wines. Cornwall, Devon, and Somerset
                  produce diverse wine styles including some excellent Pinot Noir and Chardonnay.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h4 className="font-semibold text-slate-800 mb-2">Wales</h4>
                <p className="text-slate-600 text-sm">
                  Emerging wine region with unique terroir producing distinctive still wines. Welsh vineyards
                  are pioneering sustainable viticulture and creating wines that reflect local character.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="font-semibold text-slate-800 mb-2">Other English Regions</h4>
                <p className="text-slate-600 text-sm">
                  Emerging regions in the Midlands, North England, and East Anglia experimenting with
                  cool-climate varieties and innovative winemaking techniques.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              UK Wine Production & Quality Recognition
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              British wine production has achieved international recognition, with English sparkling wines consistently
              winning awards against French Champagne in blind tastings. The UK now produces over 8 million bottles
              annually across 500+ commercial vineyards, with climate change creating increasingly favorable conditions
              for viticulture. Protected designation of origin (PDO) status for English and Welsh wines ensures
              quality standards that rival traditional European wine regions.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              Investment & Sustainability in UK Viticulture
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              The UK wine industry represents over £200 million in investment, with sustainable farming practices
              becoming standard across British vineyards. Many producers employ organic viticulture, minimal
              intervention winemaking, and carbon-neutral production methods. Government support through agricultural
              grants and tourism initiatives has accelerated growth, making British wine tourism a £100+ million
              annual market contributing significantly to rural economies.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              Wine Tourism & Experiences
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              UK vineyard tourism offers diverse experiences from harvest participation to exclusive wine dinners.
              Professional sommelier-led tastings, behind-the-scenes production tours, and seasonal events like
              harvest festivals attract over 2 million visitors annually. Many vineyards provide luxury accommodation,
              Michelin-recommended restaurants, and corporate event facilities, establishing wine tourism as a
              premium sector of British hospitality.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              Future of British Wine Industry
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              Industry projections indicate UK vineyard acreage will double by 2030, with particular growth in
              premium sparkling wine production. New plantings focus on climate-adapted varieties, advanced
              irrigation systems, and precision viticulture techniques. Export markets are expanding rapidly,
              with British wines now sold in over 30 countries, establishing the UK as a serious player in
              global wine markets alongside traditional producers.
            </p>
          </div>
        </div>

      </div>
    </>
  )
}