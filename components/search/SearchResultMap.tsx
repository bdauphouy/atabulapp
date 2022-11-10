import { icon } from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'

type SearchResultMapProps = {
  restaurantsCoords?: [number, number][]
  center?: [number, number]
  centerDelta?: number
}

const MapControls = ({ restaurantsCoords, activeMarker, centerDelta = 0 }) => {
  const map = useMap()

  useEffect(() => {
    map.setView(
      [
        restaurantsCoords[activeMarker][0] - centerDelta,
        restaurantsCoords[activeMarker][1],
      ],
      13,
    )
  }, [map, restaurantsCoords, activeMarker, centerDelta])

  return null
}

const SearchResultMap = ({
  restaurantsCoords = [
    [48.8566, 2.3522],
    [48.85, 2.35],
    [48.86, 2.32],
  ],
  center = [48.8566, 2.3522],
  centerDelta = 0,
}: SearchResultMapProps) => {
  const [activeMarker, setActiveMarker] = useState(0)

  const activeIcon = icon({
    iconUrl: '/images/active-map-marker.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  })

  const inactiveIcon = icon({
    iconUrl: '/images/inactive-map-marker.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  })

  const handleMarkerClick = (i: number) => {
    setActiveMarker(i)
  }

  return (
    <>
      <MapContainer center={center} zoom={13} scrollWheelZoom>
        <MapControls
          restaurantsCoords={restaurantsCoords}
          activeMarker={activeMarker}
          centerDelta={centerDelta}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={process.env.NEXT_PUBLIC_MAPBOX_URL}
        />
        {restaurantsCoords.map((coords, i) => (
          <Marker
            icon={i === activeMarker ? activeIcon : inactiveIcon}
            key={i}
            position={coords}
            eventHandlers={{
              click: () => handleMarkerClick(i),
            }}
          />
        ))}
      </MapContainer>
    </>
  )
}

export default SearchResultMap
