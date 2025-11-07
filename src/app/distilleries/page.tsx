'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Establishment } from '@/types/establishment'
import { csvToEstablishments } from '@/lib/csvParser'
import { organizeByLocation } from '@/lib/locationUtils'
import EstablishmentCard from '@/components/EstablishmentCard'

export default function DistilleriesPage() {
  const [distilleries, setDistilleries] = useState<Establishment[]>([])
  const [organizedDistilleries, setOrganizedDistilleries] = useState<Record<string, Record<string, Establishment[]>>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDistilleries = async () => {
      try {
        const response = await fetch('/establishments.csv')
        const csvContent = await response.text()
        const allEstablishments = csvToEstablishments(csvContent)
        const distilleryData = allEstablishments.filter(est => est.categoryName === 'Distillery')

        setDistilleries(distilleryData)
        setOrganizedDistilleries(organizeByLocation(distilleryData))
      } catch (error) {
        console.error('Error loading distilleries:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDistilleries()
  }, [])

  // Generate JSON-LD schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Best Distilleries in the UK | Scottish Whisky & English Gin Distilleries",
    "description": "Discover the finest distilleries across Scotland, England, Wales and Northern Ireland. Complete directory of whisky distilleries, gin producers, and spirit makers with locations, reviews and tasting notes.",
    "url": "https://british-spirits-ales.com/distilleries",
    "mainEntity": {
      "@type": "ItemList",
      "name": "UK Distilleries Directory",
      "description": "Comprehensive listing of distilleries in the United Kingdom",
      "numberOfItems": distilleries.length,
      "itemListElement": distilleries.slice(0, 10).map((distillery, index) => ({
        "@type": "LocalBusiness",
        "position": index + 1,
        "name": distillery.title,
        "description": `${distillery.categoryName} located in ${distillery.city}`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": distillery.street,
          "addressLocality": distillery.city,
          "addressCountry": "GB"
        },
        "url": distillery.website,
        "telephone": distillery.phone,
        "aggregateRating": distillery.totalScore > 0 ? {
          "@type": "AggregateRating",
          "ratingValue": distillery.totalScore,
          "reviewCount": distillery.reviewsCount,
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
          "name": "Distilleries",
          "item": "https://british-spirits-ales.com/distilleries"
        }
      ]
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading distilleries...</p>
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
        <div className="bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-block mb-6">
              <div className="text-6xl mb-4">🥃</div>
              <div className="h-px w-24 bg-white/30 mx-auto"></div>
            </div>

            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Best Distilleries in the UK
            </h1>

            <p className="text-xl text-amber-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Explore {distilleries.length}+ exceptional distilleries across Scotland's whisky regions, England's gin country,
              and beyond. From Highland single malts to artisan gin distilleries crafting award-winning spirits with centuries
              of heritage and innovation.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scottish Whisky Regions
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                🌿 English Gin Distilleries
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                ⭐ {distilleries.reduce((acc, d) => acc + d.reviewsCount, 0)} Reviews
              </span>
            </div>
          </div>
        </div>

        {/* County Links by Country */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-serif font-bold text-slate-800 text-center mb-12">
              Browse Distilleries by County
            </h2>

            {Object.entries(organizedDistilleries).map(([country, counties]) => (
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
                      href={`/distilleries/${county.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block p-3 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all duration-200 text-center"
                    >
                      <div className="font-semibold text-slate-800 text-sm">{county}</div>
                      <div className="text-xs text-slate-600">{establishments.length} distilleries</div>
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
              The Ultimate Guide to UK Distilleries
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The United Kingdom is home to some of the world's most prestigious distilleries, with Scotland's whisky regions
              leading the global spirits industry for centuries. From the Highland's majestic single malts to Islay's peated
              whiskies, and England's gin renaissance to Wales' emerging whisky scene, British distilleries represent the
              pinnacle of spirits craftsmanship.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-12">
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h3 className="text-xl font-serif font-semibold text-amber-900 mb-4 flex items-center">
                  🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scottish Whisky
                </h3>
                <p className="text-amber-800 text-sm">
                  Discover single malt and blended Scotch whiskies from Highland, Speyside, Islay,
                  Lowland, and Campbeltown regions. Each region offers distinct flavor profiles shaped
                  by local terroir and centuries-old traditions.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-serif font-semibold text-green-900 mb-4 flex items-center">
                  🌿 English Gin
                </h3>
                <p className="text-green-800 text-sm">
                  Experience the craft gin revolution with innovative botanicals, traditional London Dry
                  styles, and contemporary flavored gins from England's artisan distilleries leading
                  global gin innovation.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-xl font-serif font-semibold text-purple-900 mb-4 flex items-center">
                  🏴󠁧󠁢󠁷󠁬󠁳󠁿 Welsh & Northern Irish
                </h3>
                <p className="text-purple-800 text-sm">
                  Explore emerging whisky scenes in Wales and Northern Ireland, plus unique regional
                  spirits that showcase local ingredients and innovative distillation techniques.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              Types of British Distilleries
            </h3>

            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-amber-500 pl-6">
                <h4 className="font-semibold text-slate-800 mb-2">Single Malt Whisky Distilleries</h4>
                <p className="text-slate-600 text-sm">
                  Traditional Scottish distilleries producing single malt whiskies using malted barley,
                  pot stills, and aging in oak casks for a minimum of three years.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="font-semibold text-slate-800 mb-2">Gin Distilleries</h4>
                <p className="text-slate-600 text-sm">
                  Modern craft gin producers using copper stills, vapor infusion, and unique botanical
                  combinations to create distinctive London Dry, Navy Strength, and flavored gins.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="font-semibold text-slate-800 mb-2">Blended Whisky Operations</h4>
                <p className="text-slate-600 text-sm">
                  Large-scale operations combining malt and grain whiskies to create consistent,
                  accessible blended Scotch whiskies enjoyed worldwide.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              Scottish Whisky Regions & Characteristics
            </h3>

            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-amber-500 pl-6">
                <h4 className="font-semibold text-slate-800 mb-2">Speyside - The Heart of Scotch</h4>
                <p className="text-slate-600 text-sm">
                  Home to over 60 active distilleries including Macallan, Glenfiddich, and Glenlivet. Known for
                  elegant, complex single malts with apple, pear, and honey notes. The River Spey provides
                  pristine water essential for premium whisky production.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="font-semibold text-slate-800 mb-2">Islay - Peated Whisky Capital</h4>
                <p className="text-slate-600 text-sm">
                  Eight active distilleries producing intensely smoky, maritime whiskies using local peat.
                  Ardbeg, Lagavulin, and Laphroaig represent the pinnacle of peated single malt production,
                  with flavors ranging from medicinal to sweet smoke.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="font-semibold text-slate-800 mb-2">Highland - Diverse Expressions</h4>
                <p className="text-slate-600 text-sm">
                  Scotland's largest region encompasses varied sub-regions from coastal to mountain distilleries.
                  Produces everything from light, floral whiskies to rich, sherried expressions. Notable
                  distilleries include Dalmore, Glenmorangie, and Oban.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              UK Gin Renaissance & Craft Distilling
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              The UK gin industry has experienced explosive growth with over 500 gin distilleries now operating,
              compared to just 12 in 2010. Annual gin sales exceed £3 billion, making Britain the world's largest
              gin market. Craft distilleries utilize innovative botanicals from local forage to exotic imports,
              creating unique flavor profiles that define modern gin categories beyond traditional London Dry.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              Economic Impact & Heritage Tourism
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              UK distilleries contribute over £7 billion annually to the economy, supporting 75,000+ jobs across
              rural and urban areas. Whisky tourism alone attracts 2.5 million visitors yearly, generating £80
              million in revenue. Heritage distilleries offer immersive experiences including cask ownership,
              master distiller programs, and exclusive bottlings, positioning spirits tourism as a premium
              cultural attraction comparable to wine regions.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              Innovation & Sustainable Distilling
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              Modern UK distilleries lead in sustainable production, utilizing renewable energy, waste reduction,
              and circular economy principles. Many operate carbon-neutral facilities using biomass from production
              waste. Innovation includes alternative grains, experimental cask maturation, and precision
              fermentation technology. New distilleries integrate visitor experiences from conception, creating
              architectural landmarks that celebrate both heritage and innovation.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-4">
              Global Influence & Export Markets
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              British spirits export to over 200 countries, with Scotch whisky representing 75% of UK food and
              drink exports. Premium categories drive growth as global consumers seek authentic, craft-produced
              spirits. UK distilleries increasingly focus on single cask bottlings, limited editions, and
              provenance storytelling to command premium pricing in international markets, establishing British
              spirits as luxury goods comparable to fine wines and cognacs.
            </p>
          </div>
        </div>

      </div>
    </>
  )
}