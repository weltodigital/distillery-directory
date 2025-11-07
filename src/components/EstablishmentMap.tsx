'use client'

import { useEffect, useRef } from 'react'
import { Establishment } from '@/types/establishment'
import { getEstablishmentCoordinates } from '@/lib/locationUtils'

interface EstablishmentMapProps {
  establishments: Establishment[]
  className?: string
}

export default function EstablishmentMap({ establishments, className = '' }: EstablishmentMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return

    const initMap = async () => {
      // Dynamically import Leaflet to avoid SSR issues
      const L = (await import('leaflet')).default

      // Fix for default markers in Leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      })

      // Get coordinates for establishments
      console.log('Establishments passed to map:', establishments.length)
      const validEstablishments = establishments
        .map(est => ({ ...est, coordinates: getEstablishmentCoordinates(est) }))
        .filter(est => est.coordinates !== null)

      console.log('Valid establishments with coordinates:', validEstablishments.length)
      console.log('Valid establishments:', validEstablishments.map(est => ({
        title: est.title,
        city: est.city,
        coordinates: est.coordinates
      })))

      if (validEstablishments.length === 0) {
        // Default to center of UK if no coordinates
        console.log('No valid coordinates found, showing default UK map')
        const map = L.map(mapRef.current!).setView([54.5, -3.0], 6)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map)
        mapInstanceRef.current = map
        return
      }

      // Calculate center and bounds
      const latitudes = validEstablishments.map(est => est.coordinates![0])
      const longitudes = validEstablishments.map(est => est.coordinates![1])

      const centerLat = latitudes.reduce((a, b) => a + b) / latitudes.length
      const centerLng = longitudes.reduce((a, b) => a + b) / longitudes.length

      // Create map
      const map = L.map(mapRef.current!).setView([centerLat, centerLng], 10)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map)

      // Add markers for each establishment
      validEstablishments.forEach(establishment => {
        const marker = L.marker(establishment.coordinates!).addTo(map)

        marker.bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold text-sm">${establishment.title}</h3>
            <p class="text-xs text-gray-600">${establishment.categoryName}</p>
            <p class="text-xs">${establishment.street}, ${establishment.city}</p>
            ${establishment.website ? `<a href="${establishment.website}" target="_blank" class="text-blue-600 text-xs">Visit Website</a>` : ''}
          </div>
        `)
      })

      // Fit map to show all markers
      if (validEstablishments.length > 1) {
        const group = new L.featureGroup(validEstablishments.map(est => L.marker(est.coordinates!)))
        map.fitBounds(group.getBounds().pad(0.1))
      }

      mapInstanceRef.current = map
    }

    initMap()

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [establishments])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
      <div
        ref={mapRef}
        className={`w-full h-96 rounded-lg border border-slate-200 ${className}`}
        style={{ minHeight: '384px' }}
      />
    </>
  )
}