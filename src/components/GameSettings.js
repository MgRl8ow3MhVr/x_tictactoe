import React, { useState } from 'react'
import thegrid from './TheGrid'

const GameSettings = ({ TTT, setTTT, ws, playersList, setInstruction }) => {
  const [step, setStep] = useState('chooseplayer')
  const [size, setSize] = useState(null)
  const [player, setPlayer] = useState(null)

  const onClickPlayer = player => {
    setPlayer(player)
    setInstruction(`You challenged ${player}. Now choose a board size`)
    setStep('choosesize')
  }

  const onClickSize = size => {
    setStep('choosevictory')
    setInstruction('Now how many rows align to win a point ?')
    setSize(size)
    setTTT({ ...TTT, grid: thegrid(size), size: size })
  }

  const onClickVictory = victory => {
    setTTT({
      ...TTT,
      opponent: player,
      player: 'O',
      stage: 'youwait',
      victory: victory
    })
    ws.send(
      JSON.stringify({
        object: 'challenge',
        challenger: TTT.username,
        opponent: player,
        boardSize: size,
        victory: victory
      })
    )
    setInstruction(
      `And so it begins... ${player} is X, you are O. ${victory} in a row makes one point. He plays first, wait for your turn`
    )
  }

  // # # # # # # # # # # # 1 CHOOSE PLAYER # # # # # # # # # #
  switch (step) {
    case 'chooseplayer':
      if (playersList.length < 2) {
        return (
          <div
            className='playerslist'
            onClick={() => {
              setInstruction(
                'Be patient, someone will woon connect in the room'
              )
            }}
          >
            <h5 style={{ fontsize: '10px' }}>You are all allone :(</h5>
          </div>
        )
      } else {
        return (
          <div className='playerslist'>
            {playersList.map((player, index) => {
              if (player !== TTT.username) {
                return (
                  <h4
                    key={index}
                    onClick={() => {
                      onClickPlayer(player)
                    }}
                  >
                    {player}
                  </h4>
                )
              } else {
                return null
              }
            })}
          </div>
        )
      }
      break
    // # # # # # # # # # # # 2 CHOOSE SIZE # # # # # # # # # #

    case 'choosesize':
      return (
        <div className='choosesize'>
          <div
            className='onesize'
            onClick={() => {
              onClickSize(5)
            }}
          >
            5x5
          </div>
          <div
            className='onesize'
            onClick={() => {
              onClickSize(8)
            }}
          >
            8x8
          </div>
          <div
            className='onesize'
            onClick={() => {
              onClickSize(10)
            }}
          >
            10x10
          </div>
          <div
            className='onesize'
            onClick={() => {
              onClickSize(12)
            }}
          >
            12x12
          </div>
        </div>
      )
      break
    // # # # # # # # # # # # 3 CHOOSE VICTORY AND SEND WS # # # # # # # # # #
    case 'choosevictory':
      return (
        <div className='choosesize'>
          <div
            className='onesize'
            onClick={() => {
              onClickVictory(3)
            }}
          >
            3
          </div>
          <div
            className='onesize'
            onClick={() => {
              onClickVictory(4)
            }}
          >
            4
          </div>
          <div
            className='onesize'
            onClick={() => {
              onClickVictory(5)
            }}
          >
            5
          </div>
        </div>
      )
      break
  }
}
export default GameSettings
