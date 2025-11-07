import Link from 'next/link'

export default function Sitemap() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-serif font-bold text-slate-800 mb-8">Sitemap</h1>

          <p className="text-slate-600 mb-12">
            Find all the pages on The Drinks Map website. Discover breweries, distilleries, and vineyards
            across the UK with our comprehensive directory.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Main Pages */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">Main Pages</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Homepage
                  </Link>
                </li>
                <li>
                  <Link href="/breweries" className="text-amber-700 hover:text-amber-600 transition-colors">
                    All Breweries
                  </Link>
                </li>
                <li>
                  <Link href="/distilleries" className="text-amber-700 hover:text-amber-600 transition-colors">
                    All Distilleries
                  </Link>
                </li>
                <li>
                  <Link href="/vineyards" className="text-amber-700 hover:text-amber-600 transition-colors">
                    All Vineyards
                  </Link>
                </li>
              </ul>
            </div>

            {/* Popular Brewery Locations */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">Popular Brewery Locations</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/breweries/hampshire" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Hampshire Breweries
                  </Link>
                </li>
                <li>
                  <Link href="/breweries/cumbria" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Cumbria Breweries
                  </Link>
                </li>
                <li>
                  <Link href="/breweries/london" className="text-amber-700 hover:text-amber-600 transition-colors">
                    London Breweries
                  </Link>
                </li>
                <li>
                  <Link href="/breweries/kent" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Kent Breweries
                  </Link>
                </li>
                <li>
                  <Link href="/breweries/essex" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Essex Breweries
                  </Link>
                </li>
              </ul>
            </div>

            {/* Popular Distillery Locations */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">Popular Distillery Locations</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/distilleries/highland" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Highland Distilleries
                  </Link>
                </li>
                <li>
                  <Link href="/distilleries/speyside" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Speyside Distilleries
                  </Link>
                </li>
                <li>
                  <Link href="/distilleries/islay" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Islay Distilleries
                  </Link>
                </li>
                <li>
                  <Link href="/distilleries/lowland" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Lowland Distilleries
                  </Link>
                </li>
                <li>
                  <Link href="/distilleries/campbeltown" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Campbeltown Distilleries
                  </Link>
                </li>
              </ul>
            </div>

            {/* Popular Vineyard Locations */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">Popular Vineyard Locations</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/vineyards/kent" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Kent Vineyards
                  </Link>
                </li>
                <li>
                  <Link href="/vineyards/surrey" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Surrey Vineyards
                  </Link>
                </li>
                <li>
                  <Link href="/vineyards/west-sussex" className="text-amber-700 hover:text-amber-600 transition-colors">
                    West Sussex Vineyards
                  </Link>
                </li>
                <li>
                  <Link href="/vineyards/hampshire" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Hampshire Vineyards
                  </Link>
                </li>
                <li>
                  <Link href="/vineyards/cornwall" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Cornwall Vineyards
                  </Link>
                </li>
              </ul>
            </div>

            {/* English Regions */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">English Regions</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/breweries/yorkshire" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Yorkshire Breweries
                  </Link>
                </li>
                <li>
                  <Link href="/breweries/devon" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Devon Breweries
                  </Link>
                </li>
                <li>
                  <Link href="/breweries/cornwall" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Cornwall Breweries
                  </Link>
                </li>
                <li>
                  <Link href="/distilleries/london" className="text-amber-700 hover:text-amber-600 transition-colors">
                    London Distilleries
                  </Link>
                </li>
                <li>
                  <Link href="/vineyards/east-sussex" className="text-amber-700 hover:text-amber-600 transition-colors">
                    East Sussex Vineyards
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Information */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-800 mb-4">Legal & Information</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Sitemap
                  </Link>
                </li>
                <li>
                  <a href="mailto:thedrinksmap@weltodigital.com" className="text-amber-700 hover:text-amber-600 transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-16 p-8 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="text-xl font-bold text-amber-900 mb-4">About The Drinks Map</h3>
            <p className="text-amber-800 leading-relaxed">
              The Drinks Map is the UK's most comprehensive directory of breweries, distilleries, and vineyards.
              We help you discover amazing drinks destinations across England, Scotland, Wales, and Northern Ireland.
              From traditional Scottish whisky distilleries to innovative English vineyards and historic breweries,
              find your next great drinks experience with detailed information, ratings, and location maps.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}