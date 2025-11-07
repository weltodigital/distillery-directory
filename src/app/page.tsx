'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Establishment } from '@/types/establishment'
import { csvToEstablishments } from '@/lib/csvParser'
import EstablishmentCard from '@/components/EstablishmentCard'

export default function Home() {
  const [featuredVenues, setFeaturedVenues] = useState<Establishment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFeaturedVenues = async () => {
      try {
        const response = await fetch('/Distill Directory - Sheet1.csv')
        const csvContent = await response.text()
        const allEstablishments = csvToEstablishments(csvContent)

        // Get top 3 from each category by weighted rating (score * review count)
        const calculateWeightedScore = (establishment: Establishment) => {
          // Weight the score by the number of reviews, with a minimum threshold
          const minReviews = 5
          const reviewWeight = Math.min(establishment.reviewsCount, 100) // Cap at 100 reviews for weight
          const scoreWeight = establishment.totalScore

          // Only consider establishments with at least some reviews
          if (establishment.reviewsCount < minReviews) {
            return establishment.totalScore * 0.5 // Penalize low review count
          }

          return scoreWeight * (1 + (reviewWeight / 100))
        }

        const breweries = allEstablishments
          .filter(est => est.categoryName === 'Brewery')
          .sort((a, b) => calculateWeightedScore(b) - calculateWeightedScore(a))
          .slice(0, 3)

        const distilleries = allEstablishments
          .filter(est => est.categoryName === 'Distillery')
          .sort((a, b) => calculateWeightedScore(b) - calculateWeightedScore(a))
          .slice(0, 3)

        const vineyards = allEstablishments
          .filter(est => est.categoryName === 'Winery' || est.categoryName === 'Vineyard')
          .sort((a, b) => calculateWeightedScore(b) - calculateWeightedScore(a))
          .slice(0, 3)

        // Combine and shuffle for variety
        const featured = [...breweries, ...distilleries, ...vineyards]

        // Shuffle the array to mix categories
        for (let i = featured.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [featured[i], featured[j]] = [featured[j], featured[i]];
        }

        setFeaturedVenues(featured)
        setLoading(false)
      } catch (error) {
        console.error('Error loading featured venues:', error)
        setLoading(false)
      }
    }

    loadFeaturedVenues()
  }, [])
  return (
    <div className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-slate-900">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center mb-20">

            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-8 tracking-tight leading-tight">
              Find Amazing Vineyards, Breweries and Distilleries To Enjoy In The UK
            </h1>

            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
              A curated collection of Britain's most distinguished distilleries, breweries, and vineyards.
              <br className="hidden md:block" />
              Discover centuries of tradition, unparalleled craftsmanship, and the art of exceptional beverages.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/breweries"
                className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-black bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 rounded-lg"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                🍺 Breweries
              </Link>

              <Link
                href="/distilleries"
                className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-black bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 rounded-lg"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-700 to-yellow-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                🥃 Distilleries
              </Link>

              <Link
                href="/vineyards"
                className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-black bg-gradient-to-r from-purple-500 to-red-500 hover:from-purple-400 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 rounded-lg"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-red-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                🍷 Vineyards
              </Link>
            </div>
          </div>
          {/* Featured Venues Section */}
          <div className="py-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-white mb-4">Featured Venues</h2>
              <p className="text-xl text-slate-200 max-w-2xl mx-auto">
                Discover the highest-rated breweries, distilleries, and vineyards across Britain
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredVenues.map((venue, index) => (
                  <EstablishmentCard key={index} establishment={venue} />
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/breweries"
                  className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold hover:bg-white/30 transition-all duration-200 rounded-lg shadow-lg border border-white/30"
                >
                  View All Breweries
                </Link>
                <Link
                  href="/distilleries"
                  className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold hover:bg-white/30 transition-all duration-200 rounded-lg shadow-lg border border-white/30"
                >
                  View All Distilleries
                </Link>
                <Link
                  href="/vineyards"
                  className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold hover:bg-white/30 transition-all duration-200 rounded-lg shadow-lg border border-white/30"
                >
                  View All Vineyards
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative bg-gradient-to-b from-slate-50 via-white to-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-slate-800 mb-4">Distinguished Categories</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Each category represents generations of British craftsmanship and tradition
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Link href="/distilleries" className="group">
              <div className="relative bg-white border border-slate-200 hover:border-amber-300 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-600 to-yellow-500"></div>
                <div className="p-10 text-center">
                  <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-4xl">🥃</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-slate-800 mb-6">Distilleries</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    From Highland single malts to London dry gins, explore Scotland's whisky heritage
                    and England's gin renaissance. Each distillery tells a story of tradition and innovation.
                  </p>
                  <div className="inline-flex items-center text-amber-700 font-semibold group-hover:text-amber-600 transition-colors">
                    Explore Distilleries
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/breweries" className="group">
              <div className="relative bg-white border border-slate-200 hover:border-amber-300 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-600 to-yellow-500"></div>
                <div className="p-10 text-center">
                  <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-4xl">🍺</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-slate-800 mb-6">Breweries</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Traditional ales and modern craft beers from historic breweries and
                    innovative microbreweries across Britain. Taste the evolution of British brewing.
                  </p>
                  <div className="inline-flex items-center text-amber-700 font-semibold group-hover:text-amber-600 transition-colors">
                    Explore Breweries
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/vineyards" className="group">
              <div className="relative bg-white border border-slate-200 hover:border-amber-300 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-600 to-yellow-500"></div>
                <div className="p-10 text-center">
                  <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-4xl">🍷</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-slate-800 mb-6">Vineyards</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    English sparkling wines and Welsh vineyard treasures showcasing
                    Britain's emerging wine culture. Experience the new world of British viticulture.
                  </p>
                  <div className="inline-flex items-center text-amber-700 font-semibold group-hover:text-amber-600 transition-colors">
                    Explore Vineyards
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Heritage Section */}
      <div id="heritage" className="relative bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 py-24">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-6">
                <span className="text-amber-400 font-medium tracking-wider text-sm uppercase border border-amber-400 px-4 py-2">
                  British Heritage
                </span>
              </div>
              <h2 className="text-5xl font-serif font-bold text-white mb-8 leading-tight">
                A Legacy of
                <span className="block text-amber-400">Excellence</span>
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                From ancient monasteries brewing ales to modern craft distilleries pushing
                boundaries, Britain's beverage heritage spans centuries. Our directory celebrates
                both time-honored traditions and innovative newcomers.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed mb-10">
                Each establishment is meticulously curated with detailed information, authentic reviews,
                and direct contact details to help you discover your next favorite drink and experience
                the stories behind every sip.
              </p>
              <Link
                href="/breweries"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-semibold hover:from-amber-500 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Your Journey
              </Link>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-amber-900 via-slate-800 to-slate-900 p-10 shadow-2xl border border-amber-800">
                <h3 className="text-2xl font-serif font-bold text-amber-400 mb-8 text-center">
                  Directory at a Glance
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                    <span className="text-slate-300 text-lg">Total Establishments</span>
                    <span className="text-3xl font-bold text-amber-400">750+</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                    <span className="text-slate-300 text-lg">Historic Breweries</span>
                    <span className="text-3xl font-bold text-amber-400">450+</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                    <span className="text-slate-300 text-lg">Renowned Distilleries</span>
                    <span className="text-3xl font-bold text-amber-400">200+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-lg">Prestigious Vineyards</span>
                    <span className="text-3xl font-bold text-amber-400">100+</span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-700 text-center">
                  <p className="text-slate-400 text-sm">
                    Covering every corner of England, Scotland, Wales & Northern Ireland
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}