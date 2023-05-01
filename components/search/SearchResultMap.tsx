import api from '@/lib/api'
import Cookie from 'js-cookie'
import { divIcon, DragEndEvent, icon, Map } from 'leaflet'
import { useEffect, useMemo, useRef, useState } from 'react'
import { RiFullscreenExitFill, RiFullscreenFill } from 'react-icons/ri'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import useSupercluster from 'use-supercluster'

type SearchResultMapProps = {
  center?: [number, number]
  centerDelta?: number
  onMarkerClick: (restaurantId: number) => void
}

type MapControlsProps = {
  onMarkerClick: (restaurantId: number) => void
}

const MapControls = ({ onMarkerClick }: MapControlsProps) => {
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
    const response = await api.getRestaurantsIntoBounds(e.target.getBounds())

    if (!response.error) {
      setRestaurants(response.restaurants)
    }

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

  const points = useMemo(
    () =>
      restaurants.map((restaurant, i) => ({
        type: 'Feature',
        properties: { cluster: false, restaurantId: restaurant.id },
        geometry: {
          type: 'Point',
          coordinates: [restaurant.longitude, restaurant.latitude],
        },
      })),
    [restaurants],
  )

  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: {
      radius: 75,
      maxZoom: 20,
    },
  })

  const handleClusterClick = (coords: [number, number]) => {
    map.setView(
      [
        coords[0] - (Cookie.get('deviceType') !== 'desktop' ? 0.0025 : 0),
        coords[1],
      ],
      zoom + 2,
      {
        animate: true,
      },
    )
  }

  const handleMarkerClick = (coords: [number, number]) => {
    map.setView(
      [
        coords[0] - (Cookie.get('deviceType') !== 'desktop' ? 0.0025 : 0),
        coords[1],
      ],
      zoom,
      {
        animate: true,
      },
    )
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
                  handleClusterClick([latitude, longitude])
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
                onMarkerClick(restaurantId)
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
  onMarkerClick,
}: SearchResultMapProps) => {
  const mapRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen()
    } else {
      mapRef.current._container.requestFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  return (
    <>
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={13}
        scrollWheelZoom
        minZoom={6}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={process.env.NEXT_PUBLIC_MAPBOX_URL}
        />
        <MapControls onMarkerClick={onMarkerClick} />
        <button
          onClick={handleFullscreen}
          className="absolute right-0 top-0 mt-2 mr-2 grid h-10 w-10 cursor-pointer place-items-center rounded-md bg-white"
        >
          {isFullscreen ? (
            <RiFullscreenExitFill size={24} className="text-black" />
          ) : (
            <RiFullscreenFill size={24} className="text-black" />
          )}
        </button>
      </MapContainer>
    </>
  )
}

export default SearchResultMap
