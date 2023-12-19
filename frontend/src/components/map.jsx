import React from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>

export default function SimpleMap({ center, zoom, text }) {
  // Valores predeterminados para el centro y el zoom del mapa
  const defaultCenter = {
    lat: 59.955413,
    lng: 30.337844,
  }
  const defaultZoom = 11

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC4UxtyRHANih285JzIiah9sfdeSROOyAc' }}
        defaultCenter={center || defaultCenter}
        defaultZoom={zoom || defaultZoom}
      >
        <AnyReactComponent
          lat={center ? center.lat : defaultCenter.lat}
          lng={center ? center.lng : defaultCenter.lng}
          text={text || 'My Marker'}
        />
      </GoogleMapReact>
    </div>
  )
}
