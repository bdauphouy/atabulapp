import { MapContainer, Marker, TileLayer } from 'react-leaflet'

type SearchResultMapProps = {
  position: [number, number]
}

const MapControls = ({ position }) => {
  return <Marker position={position} />
}

const RouteMap = ({ position }: SearchResultMapProps) => {
  return (
    <>
      <MapContainer center={position} zoom={13} scrollWheelZoom minZoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={process.env.NEXT_PUBLIC_MAPBOX_URL}
        />
        <MapControls position={position} />
      </MapContainer>
    </>
  )
}

export default RouteMap
