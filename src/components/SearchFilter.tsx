import { EstablishmentCategory } from '@/types/establishment'

interface SearchFilterProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategory: EstablishmentCategory | 'All'
  setSelectedCategory: (category: EstablishmentCategory | 'All') => void
  selectedRegion: string
  setSelectedRegion: (region: string) => void
  regions: string[]
}

export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedRegion,
  setSelectedRegion,
  regions
}: SearchFilterProps) {
  const categories: (EstablishmentCategory | 'All')[] = ['All', 'Brewery', 'Distillery', 'Winery']

  const getCategoryIcon = (category: EstablishmentCategory | 'All') => {
    switch (category) {
      case 'Brewery': return '🍺'
      case 'Distillery': return '🥃'
      case 'Winery': return '🍷'
      default: return '🔍'
    }
  }

  return (
    <div className="bg-white border border-slate-200 shadow-xl p-8 mb-12 relative overflow-hidden">
      {/* Decorative gradient border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500"></div>

      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-2">Refine Your Search</h2>
        <p className="text-slate-600">Discover exactly what you're looking for with our advanced filters</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
            Search Establishments
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="search"
              type="text"
              placeholder="Search by name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all duration-300 text-lg placeholder-slate-400"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
            Category
          </label>
          <div className="relative">
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as EstablishmentCategory | 'All')}
              className="w-full px-4 py-4 border-2 border-slate-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all duration-300 bg-white text-lg appearance-none cursor-pointer"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {getCategoryIcon(category)} {category === 'All' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Region Filter */}
        <div>
          <label htmlFor="region" className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
            Region
          </label>
          <div className="relative">
            <select
              id="region"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-4 py-4 border-2 border-slate-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all duration-300 bg-white text-lg appearance-none cursor-pointer"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  📍 {region === 'All' ? 'All Regions' : region}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-slate-600">
          <span className="font-medium">Active filters:</span>
          {searchTerm && <span className="ml-2 bg-amber-100 text-amber-800 px-2 py-1 rounded">"{searchTerm}"</span>}
          {selectedCategory !== 'All' && <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded">{selectedCategory}</span>}
          {selectedRegion !== 'All' && <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded">{selectedRegion}</span>}
        </div>

        <button
          onClick={() => {
            setSearchTerm('')
            setSelectedCategory('All')
            setSelectedRegion('All')
          }}
          className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 hover:text-slate-800 hover:border-slate-400 transition-all duration-200 font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear All Filters
        </button>
      </div>
    </div>
  )
}