import React from 'react'
// import DisplayReset from "./DisplayReset";

const ScoreMenu = ({ TTT }) => {
  return (
    <>
      <div className='scoretitle'>Scores</div>
      <div className='scoremenu'>
        {TTT.player === 'X' ? (
          <>
            <div>{TTT.username}</div>
            <div>{TTT.scoreX}</div>
            <div>{TTT.scoreO}</div>
            <div>{TTT.opponent}</div>
          </>
        ) : (
          <>
            <div>{TTT.opponent}</div>
            <div>{TTT.scoreX}</div>
            <div>{TTT.scoreO}</div>
            <div>{TTT.username}</div>
          </>
        )}
      </div>
    </>
  )
}

export default ScoreMenu
