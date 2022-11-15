import parse from 'html-react-parser'
import { useCallback, useEffect, useState } from 'react'

const Mea = () => {
  const [data, setData] = useState('<span>Aucun bandeau publicitaire.</span>')

  const getMea = useCallback(async () => {
    const res = await fetch(
      'https://api.atabulapp.synerghetic.net/v1/promotional-insert',
    )

    setData(await res.text())
  }, [])

  useEffect(() => {
    getMea()
  }, [getMea])

  return parse(data) as JSX.Element
}

export default Mea
