import React from 'react'
import Square from './Square'
import { Pos, Piece } from '../lib/types'

export default function Board({
  board, selected, highlights, onSquareClick
}:{
  board:Record<string,Piece>
  selected:Pos|null
  highlights:Pos[]
  onSquareClick:(x:number,y:number)=>void
}){
  const squares:React.ReactElement[] = []
  for(let y=7;y>=0;y--){
    for(let x=0;x<8;x++){
      const key=`${x},${y}`
      const light=(x+y)%2===0
      const sel=!!selected && selected[0]===x&&selected[1]===y
      const hl=highlights.some(([hx,hy])=>hx===x&&hy===y)
      squares.push(
        <Square
          key={key}
          piece={board[key]}
          light={light}
          selected={sel}
          highlight={hl}
          onClick={()=>onSquareClick(x,y)}
        />
      )
    }
  }
  return <div className="board">{squares}</div>
}
