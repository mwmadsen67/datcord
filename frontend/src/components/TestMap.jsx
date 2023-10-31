import { Wrapper } from '@googlemaps/react-wrapper'
import { useEffect, useRef, useState } from 'react'

const TestMap = (props) => {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!map) {
      const center = { lat: 37.7989666, lng: -122.4035458 };
      const zoom = 13;
      setMap(new window.google.maps.Map(mapRef.current, {center, zoom}))
    }
  }, [map])

  return (
    <div className="map" ref={mapRef}>
      MAP
    </div>
  )
}

const MapWrapper = () => {
  return (
    <Wrapper apiKey={process.env.VITE_MAPS_API_KEY}>
      <TestMap />
    </Wrapper>
  )
}

export default MapWrapper;