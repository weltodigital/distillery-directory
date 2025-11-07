import { Establishment } from '@/types/establishment'
import Image from 'next/image'
import { useState } from 'react'

interface EstablishmentCardProps {
  establishment: Establishment
}

export default function EstablishmentCard({ establishment }: EstablishmentCardProps) {
  const [imageError, setImageError] = useState(false)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Brewery':
        return '🍺'
      case 'Distillery':
        return '🥃'
      case 'Winery':
      case 'Vineyard':
        return '🍷'
      default:
        return '🍻'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Brewery':
        return 'from-amber-600 to-orange-600'
      case 'Distillery':
        return 'from-amber-700 to-yellow-600'
      case 'Winery':
      case 'Vineyard':
        return 'from-purple-600 to-red-600'
      default:
        return 'from-slate-600 to-slate-700'
    }
  }

  const formatAddress = () => {
    const parts = [establishment.street, establishment.city].filter(Boolean)
    return parts.join(', ')
  }

  const renderStars = (score: number) => {
    const fullStars = Math.floor(score)
    const hasHalfStar = score % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center">
        <div className="flex mr-3">
          {[...Array(fullStars)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
          ))}
          {hasHalfStar && (
            <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="currentColor"/>
                  <stop offset="50%" stopColor="#e2e8f0"/>
                </linearGradient>
              </defs>
              <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-slate-300 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
          ))}
        </div>
        <div className="text-sm">
          <span className="font-semibold text-slate-800">{score.toFixed(1)}</span>
          <span className="text-slate-500 ml-1">({establishment.reviewsCount} reviews)</span>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative bg-white border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:border-amber-300">
      {/* Gradient top bar */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getCategoryColor(establishment.categoryName)} z-10`}></div>

      <div className="relative h-64 overflow-hidden">
        {establishment.imageUrl && !imageError ? (
          <>
            <Image
              src={establishment.imageUrl}
              alt={establishment.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <span className="text-6xl opacity-50">{getCategoryIcon(establishment.categoryName)}</span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className={`bg-gradient-to-r ${getCategoryColor(establishment.categoryName)} text-white px-4 py-2 text-sm font-semibold tracking-wide shadow-lg backdrop-blur-sm border border-white/20`}>
            {establishment.categoryName}
          </span>
        </div>

        {/* Rating badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border border-white/50">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <span className="text-sm font-bold text-slate-800">{establishment.totalScore.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-serif font-bold text-slate-800 mb-4 leading-tight group-hover:text-amber-700 transition-colors duration-300">
          {establishment.title}
        </h3>

        <div className="mb-5">
          {renderStars(establishment.totalScore)}
        </div>

        <div className="flex items-center mb-6 text-slate-600">
          <svg className="w-4 h-4 mr-2 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm leading-relaxed">{formatAddress()}</span>
        </div>

        <div className="flex flex-col space-y-3">
          {establishment.website && (
            <a
              href={establishment.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center text-amber-700 hover:text-amber-600 font-medium transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit Website
              <svg className="w-3 h-3 ml-1 group-hover/link:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          )}

        </div>
      </div>

      {/* Subtle hover effect border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-300/30 transition-colors duration-500 pointer-events-none"></div>
    </div>
  )
}