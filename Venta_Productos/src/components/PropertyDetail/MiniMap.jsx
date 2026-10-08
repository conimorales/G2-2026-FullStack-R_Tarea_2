import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

function MiniMap({ ubicacion, name }) {
  return (
    <div className="gallery-map-cell">
      <MapContainer
        center={[ubicacion.lat, ubicacion.lng]}
        zoom={14}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        doubleClickZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[ubicacion.lat, ubicacion.lng]}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
      <span className="gallery-map-label">Mapa Referencial</span>
    </div>
  )
}

export default MiniMap