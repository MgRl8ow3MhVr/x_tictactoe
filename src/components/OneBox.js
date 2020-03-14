import React from 'react'
import checkWin from './CheckWin'

const OneBox = props => {
  const { TTT, setTTT, r, c, ws } = props
  let state = TTT.grid[r][c]
  let grid = TTT.grid
  let player = TTT.player

  const handleClick = () => {
    if (!TTT.allowedToPlay) {
      return
    }
    grid[r][c] = player
    const gridwin = checkWin(grid, r, c, player, TTT.victory)
    let newTTT
    if (gridwin) {
      newTTT = {
        ...TTT,
        grid: gridwin,
        scoreX: player === 'X' ? TTT.scoreX + 1 : TTT.scoreX,
        scoreO: player === 'O' ? TTT.scoreO + 1 : TTT.scoreO,
        allowedToPlay: false,
        stage: 'youwait'
      }
    } else {
      newTTT = {
        ...TTT,
        grid: grid,
        allowedToPlay: false,
        stage: 'youwait'
      }
    }
    setTTT(newTTT)
    ws.send(JSON.stringify(newTTT))
  }

  switch (state) {
    case -10:
      return (
        <div
          onClick={() => {
            handleClick()
          }}
          className={TTT.allowedToPlay ? 'box empty' : 'box empty notallowed'}
        ></div>
      )
    case 'WinR_O':
    case 'WinC_O':
    case 'WinD1_O':
    case 'WinD2_O':
      return <div className='box WinO'>O</div>
    case 'WinR_X':
    case 'WinC_X':
    case 'WinD1_X':
    case 'WinD2_X':
      return <div className='box WinX'>X</div>
    case 'O':
      return <div className='box O'>O</div>
    case 'X':
      return <div className='box X'>X</div>
    default:
      return <div className='box empty'>error</div>
  }
}

export default OneBox
