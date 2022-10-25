import parse from 'html-react-parser'
import { useState } from 'react'

const Mea = () => {
  const [data, setData] = useState('<h1>test</h1>')

  const getMea = async () => {
    const res = await fetch(
      'https://api.atabulapp.synerghetic.net/v1/promotional-insert',
    )

    setData(await res.text())
  }

  getMea()

  return parse(data) as JSX.Element
}

export default Mea
