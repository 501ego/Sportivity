import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const SimpleMap = ({ center }) => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  }

  const defaultCenter = {
    lat: -34.397,
    lng: 150.644,
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyC4UxtyRHANih285JzIiah9sfdeSROOyAc">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={17}
        center={center || defaultCenter}
      >
        {center && <Marker position={center} />}
      </GoogleMap>
    </LoadScript>
  )
}

export default SimpleMap
