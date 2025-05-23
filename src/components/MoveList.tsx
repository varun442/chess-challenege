import React from 'react'

export default function MoveList({
  history
}: { history:string[] }) {
  return (
    <div className="move-list">
      <h2>Moves</h2>
      <ol>
        {history.map((m,i)=>(
          <li key={i} className={ i%2===0?'white-move':'black-move' }>
            {m}
          </li>
        ))}
      </ol>
    </div>
  )
}
