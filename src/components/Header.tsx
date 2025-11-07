import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg shadow-lg group-hover:from-amber-300 group-hover:to-yellow-400 transition-all duration-300">
              <svg className="w-6 h-6 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div>
              <span className="text-xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors">
                The Drinks Map
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/breweries"
              className="text-slate-300 hover:text-amber-400 transition-colors font-medium"
            >
              Breweries
            </Link>
            <Link
              href="/distilleries"
              className="text-slate-300 hover:text-amber-400 transition-colors font-medium"
            >
              Distilleries
            </Link>
            <Link
              href="/vineyards"
              className="text-slate-300 hover:text-amber-400 transition-colors font-medium"
            >
              Vineyards
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-slate-300 hover:text-amber-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}