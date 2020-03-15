import React, { useState, useEffect } from 'react'
import GameSettings from './GameSettings'
import Connexion from './Connexion'
import ScoreMenu from './ScoreMenu'
import TypeMe from './TypeMe'
import thegrid from './TheGrid'

const Communicate = ({
  TTT,
  setTTT,
  ws,
  setWs,
  instruction,
  setInstruction
}) => {
  const [playersList, setPlayersList] = useState([])

  // # # # # # # # # # # # Connexion at WS Server on page landing # # # # # # # # # # #
  useEffect(() => {
    const connection = async () => {
      const NewWs = new WebSocket('wss://backendtictactoe.herokuapp.com/')
      // const NewWs = new WebSocket('ws://localhost:8080')
      setWs(NewWs)

      //ping the server otherwise heroku goes to sleep and the game is lost after 30s of inactivity
      setTimeout(() => {
        setInterval(() => {
          NewWs.send(JSON.stringify({ object: 'ping', player: TTT.username }))
        }, 15000)
      }, 1000)
    }
    connection()
  }, [])

  // # # # # # # # # # # # Handling WS received messages # # # # # # # # # # #
  const handleReceive = event => {
    const response = JSON.parse(event.data)
    switch (response.object) {
      case 'ping':
        ws.send(JSON.stringify('pong ' + TTT.username))
        break
      case 'newUser':
        setPlayersList(response.playersList)
        break
      case 'challenged':
        console.log('challenged', response)
        setInstruction(
          `you've been challenged by ${response.challenger}. Win 1 point when align ${response.victory}. You are X. You START`
        )
        setTTT({
          ...TTT,
          grid: thegrid(response.boardSize),
          size: response.boardSize,
          victory: response.victory,
          opponent: response.challenger,
          allowedToPlay: true,
          player: 'X',
          stage: 'youplay'
        })
        break
      // On a CurrentGame
      default:
        const TTTcopy = { ...TTT }
        TTTcopy.allowedToPlay = true
        TTTcopy.grid = response.grid
        TTTcopy.scoreX = response.scoreX
        TTTcopy.scoreO = response.scoreO
        setTTT(TTTcopy)
        TTTcopy.stage = 'youplay'
        break
    }
  }
  // # # # # # # # # # # # Kill handler and create new one every message # # # # # # # # # # #
  useEffect(() => {
    if (ws) {
      ws.addEventListener('message', handleReceive)
    }
    return () => {
      if (ws) {
        ws.removeEventListener('message', handleReceive)
      }
    }
  }, [handleReceive])

  // # # # # # # # # # # # Instructions On Game # # # # # # # # # # #

  useEffect(() => {
    if (TTT.stage === 'youplay') {
      setInstruction('Your Turn')
    }
    if (TTT.stage === 'youwait') {
      setInstruction('Wait')
    }
  }, [TTT])

  // # # # # # # # # # # # R E N D E R # # # # # # # # # # #
  return (
    <>
      <div className='menu'>
        {/* Instructions side - menuleft */}
        <div className='menuleft'>
          <TypeMe aText={instruction} />
        </div>
        {/* # # # # # # CONNEXION # # # # #  */}
        <div className='menuright'>
          {TTT.stage === 'entername' && (
            <Connexion
              TTT={TTT}
              setTTT={setTTT}
              ws={ws}
              setInstruction={setInstruction}
            />
          )}
          {/* # # # # # # PLAYERS LIST # # # # #  */}
          {TTT.stage === 'findaplayer' && playersList && (
            <GameSettings
              TTT={TTT}
              setTTT={setTTT}
              ws={ws}
              playersList={playersList}
              setInstruction={setInstruction}
            />
          )}
          {/* # # # # # # GAME IS ON # # # # #  */}
          {(TTT.stage === 'youplay' || TTT.stage === 'youwait') && (
            <ScoreMenu TTT={TTT} />
          )}
        </div>
      </div>
    </>
  )
}
export default Communicate
