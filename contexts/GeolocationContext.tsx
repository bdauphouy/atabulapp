import { createContext, useEffect, useState } from 'react'

interface ICoords {
  lat: number
  lon: number
}

export const GeolocationContext = createContext<ICoords>({
  lat: 0,
  lon: 0,
})

export const GeolocationContextProvider = ({ children }) => {
  const [coords, setCoords] = useState<ICoords>({
    lat: 0,
    lon: 0,
  })

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then(result => {
      if (result.state === 'prompt' || result.state === 'granted') {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          setCoords({
            lat: coords.latitude,
            lon: coords.longitude,
          })
        })
      }
    })
  }, [])

  return (
    <GeolocationContext.Provider value={coords}>
      {children}
    </GeolocationContext.Provider>
  )
}
