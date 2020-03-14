import React from 'react'
import OneBox from './OneBox'

const OneLine = props => {
  const { TTT, setTTT, size, line, ws } = props

  let tab = []
  for (let i = 0; i < size; i++) {
    tab.push(
      <OneBox
        TTT={TTT}
        setTTT={setTTT}
        r={line}
        c={i}
        ws={ws}
        key={[line, i]}
      ></OneBox>
    )
  }

  return <section>{tab}</section>
}

const CreateGrid = props => {
  const { TTT, setTTT, ws } = props
  let size = TTT.size
  let tab = []
  for (let i = 0; i < size; i++) {
    tab.push(
      <OneLine
        key={i}
        TTT={TTT}
        setTTT={setTTT}
        size={size}
        line={i}
        ws={ws}
      ></OneLine>
    )
  }
  return tab
}

export default CreateGrid
