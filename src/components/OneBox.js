import React from 'react'
import checkWin from './CheckWin'

const OneBox = props => {
  const { TTT, setTTT, r, c, ws, boxSize } = props
  let state = TTT.grid[r][c]
  let grid = TTT.grid
  let player = TTT.player

  const handleClick = () => {
    if (!TTT.allowedToPlay) {
      return
    }

    grid[r][c] = player //Player, Loose (notwin), R,C,D1,D2
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

  switch (state[0]) {
    case 'E': //Empty Cell
      return (
        <div
          onClick={() => {
            handleClick()
          }}
          className={TTT.allowedToPlay ? 'box empty' : 'box empty notallowed'}
          style={{
            height: boxSize + 'px',
            width: boxSize + 'px'
          }}
        ></div>
      )

    case 'O':
      if (state === 'O') {
        //Case cochée mais pas gagnante
        return (
          <div
            className='box O'
            style={{
              height: boxSize + 'px',
              width: boxSize + 'px',
              fontSize: boxSize * 0.8 + 'px'
            }}
          >
            O
          </div>
        )
      } else {
        // on est dans un cas gagnant
        return (
          <div
            className='box WinO'
            style={{
              height: boxSize + 'px',
              width: boxSize + 'px',
              fontSize: boxSize * 0.8 + 'px'
            }}
          >
            {state.indexOf('C') !== -1 && <div className='barCol'></div>}
            {state.indexOf('R') !== -1 && <div className='barRow'></div>}
            {state.indexOf('D1') !== -1 && <div className='barD1'></div>}
            {state.indexOf('D2') !== -1 && <div className='barD2'></div>}O
          </div>
        )
      }

    case 'X':
      if (state === 'X') {
        return (
          <div
            className='box X'
            style={{
              height: boxSize + 'px',
              width: boxSize + 'px',
              fontSize: boxSize * 0.8 + 'px'
            }}
          >
            X
          </div>
        )
      } else {
        // on est dans un cas gagnant
        return (
          <div
            className='box WinX'
            style={{
              height: boxSize + 'px',
              width: boxSize + 'px',
              fontSize: boxSize * 0.8 + 'px'
            }}
          >
            {state.indexOf('C') !== -1 && <div className='barCol'></div>}
            {state.indexOf('R') !== -1 && <div className='barRow'></div>}
            {state.indexOf('D1') !== -1 && <div className='barD1'></div>}
            {state.indexOf('D2') !== -1 && <div className='barD2'></div>}X
          </div>
        )
      }
    default:
      return (
        <div
          className='box empty'
          style={{ height: boxSize + 'px', width: boxSize + 'px' }}
        >
          error
        </div>
      )
  }
}

export default OneBox
