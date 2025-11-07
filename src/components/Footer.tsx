import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg shadow-lg">
                <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-white">
                  The Drinks Map
                </h3>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Discover Britain's finest distilleries, breweries, and vineyards.
              Your guide to exceptional drinks and heritage locations across the UK.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/breweries" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Breweries
                </Link>
              </li>
              <li>
                <Link href="/distilleries" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Distilleries
                </Link>
              </li>
              <li>
                <Link href="/vineyards" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Vineyards
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="text-lg">🍺</span>
                <span className="text-slate-400">450+ Breweries</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-lg">🥃</span>
                <span className="text-slate-400">200+ Distilleries</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-lg">🍷</span>
                <span className="text-slate-400">100+ Vineyards</span>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal & Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="mailto:thedrinksmap@weltodigital.com" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2025 The Drinks Map. Discovering Britain's finest drinks heritage.
          </p>
        </div>
      </div>
    </footer>
  )
}