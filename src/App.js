import React, { useState } from 'react'
import CreateGrid from './components/CreateGrid'
import Communicate from './components/Communicate'
import thegrid from './components/TheGrid'
import './App.css'

const App = () => {
  const [ws, setWs] = useState(null)
  const [instruction, setInstruction] = useState(
    'Type UserName and press Enter'
  )
  const [TTT, setTTT] = useState({
    grid: thegrid(12),
    player: null,
    size: 12,
    victory: 4,
    scoreX: 0,
    scoreO: 0,
    stage: 'entername',
    username: 'NoUsername Yet',
    opponent: 'NoOpponent Yet'
  })

  // taille des cases en fonction de leur nombre
  const boxSize =
    window.innerWidth > 850
      ? Math.floor((window.innerWidth * 0.38) / TTT.size)
      : Math.floor((window.innerWidth - 30) / TTT.size)

  console.log(TTT)

  return (
    <div className='App'>
      <header>
        <span>GIANT TIC TAC TOE</span>
        <span>Challenge your friends online</span>
      </header>
      <Communicate
        TTT={TTT}
        setTTT={setTTT}
        ws={ws}
        setWs={setWs}
        instruction={instruction}
        setInstruction={setInstruction}
      />
      <div className='game'>
        <div className='board'>
          <CreateGrid
            TTT={TTT}
            setTTT={setTTT}
            ws={ws}
            setInstruction={setInstruction}
            boxSize={boxSize}
          />
        </div>
      </div>
      <footer />
    </div>
  )
}

export default App
