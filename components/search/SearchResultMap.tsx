import api from '@/lib/api'
import { divIcon, DragEndEvent, icon, Map } from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import useSupercluster from 'use-supercluster'

type SearchResultMapProps = {
  center?: [number, number]
  centerDelta?: number
}

const MapControls = () => {
  const [bounds, setBounds] = useState(null)
  const [zoom, setZoom] = useState(12)
  const [restaurants, setRestaurants] = useState([])
  const [activeMarker, setActiveMarker] = useState(null)

  const markerIcon = icon({
    iconUrl: '/markers/marker.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  })

  const clusterIcon = (count: number) => {
    const size = Math.min(Math.max(count / 2, 40), 80) * (zoom / 10)
    const opacity = Math.min(Math.max(count, 60), 80)
    const fontSize = Math.min(Math.max(count / 5, 16), 24) * (zoom / 10)

    return divIcon({
      html: `<div style="width: ${size}px; height: ${size}px; opacity: ${opacity}%; font-size: ${fontSize}px" class="-translate-x-1/2 -translate-y-1/2 bg-scarlet rounded-full flex justify-center items-center text-white">
        ${count}
      </div>`,
      iconSize: [0, 0],
    })
  }

  const loadRestaurants = async (e: DragEndEvent | { target: Map }) => {
    const bounds = map.getBounds()
    setBounds([
      bounds.getSouthWest().lng,
      bounds.getSouthWest().lat,
      bounds.getNorthEast().lng,
      bounds.getNorthEast().lat,
    ])

    setZoom(map.getZoom())
  }

  const map = useMapEvents({
    moveend: loadRestaurants,
  })

  useEffect(() => {
    ;(async () => {
      const response = await api.getRestaurantsIntoBounds(map.getBounds())

      if (!response.error) {
        setRestaurants(response.restaurants)
      }
    })()
    loadRestaurants({ target: map })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const points = restaurants.map((restaurant, i) => ({
    type: 'Feature',
    properties: { cluster: false, restaurantId: i },
    geometry: {
      type: 'Point',
      coordinates: [
        restaurant.fields.coordonnees_geo[1],
        restaurant.fields.coordonnees_geo[0],
      ],
    },
  }))

  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: {
      radius: 75,
      maxZoom: 20,
    },
  })

  const handleMarkerClick = (coords: [number, number]) => {
    map.setView([coords[0] - 0.0025, coords[1]], 15, {
      animate: true,
    })
  }

  return (
    <>
      {clusters.map((cluster, i) => {
        const [longitude, latitude] = cluster.geometry.coordinates
        const {
          cluster: isCluster,
          point_count: pointCount,
          restaurantId,
        } = cluster.properties

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${i}`}
              position={[latitude, longitude]}
              icon={clusterIcon(pointCount)}
              eventHandlers={{
                click: () => {
                  handleMarkerClick([latitude, longitude])
                },
              }}
            />
          )
        }

        return (
          <Marker
            opacity={restaurantId === activeMarker ? 1 : 0.5}
            key={`marker-${restaurantId}`}
            position={[latitude, longitude]}
            icon={markerIcon}
            eventHandlers={{
              click: () => {
                handleMarkerClick([latitude, longitude])
                setActiveMarker(restaurantId)
              },
            }}
          />
        )
      })}
    </>
  )
}

const SearchResultMap = ({
  center = [48.8566, 2.3522],
}: SearchResultMapProps) => {
  return (
    <>
      <MapContainer center={center} zoom={13} scrollWheelZoom minZoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={process.env.NEXT_PUBLIC_MAPBOX_URL}
        />
        <MapControls />
      </MapContainer>
    </>
  )
}

export default SearchResultMap
