import React from 'react'
import OneBox from './OneBox'

console.log('h', window.innerHeight)
console.log(window.innerWidth)

const OneLine = props => {
  const { TTT, setTTT, size, line, ws, boxSize } = props

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
        boxSize={boxSize}
      ></OneBox>
    )
  }

  return <section>{tab}</section>
}

const CreateGrid = props => {
  const { TTT, setTTT, ws, boxSize } = props
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
        boxSize={boxSize}
      ></OneLine>
    )
  }
  return tab
}

export default CreateGrid
