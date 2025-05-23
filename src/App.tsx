import React, { useState } from 'react'
import Board from './components/Board'
import MoveList from './components/MoveList'
import { initialBoard } from './lib/initialBoard'
import { legalMoves, isCastlingMove } from './lib/moves'
import { Pos, BoardState, Piece } from './lib/types'

const display:Record<Piece['type'],string> = {
  pawn:'soldier', knight:'knight',
  bishop:'camel', rook:'rook',
  queen:'minister', king:'king'
}
const cap = (s:string)=>s[0].toUpperCase()+s.slice(1)

export default function App(){
  const [board,setBoard]     = useState<BoardState>(initialBoard)
  const [turn,setTurn]       = useState<'white'|'black'>('white')
  const [selected,setSelected]   = useState<Pos|null>(null)
  const [highlights,setHighlights]= useState<Pos[]>([])
  const [moves,setMoves]     = useState<string[]>([])

  function onSquareClick(x:number,y:number){
    const key=`${x},${y}`, piece=board[key]

    if(!selected){
      if(!piece||piece.color!==turn) return
      setSelected([x,y])
      setHighlights(legalMoves(board,[x,y]))
      return
    }

    const legal = highlights.some(([hx,hy])=>hx===x&&hy===y)
    if(!legal){
      setSelected(null); setHighlights([])
      return
    }

    const fromKey=`${selected[0]},${selected[1]}`
    const moving=board[fromKey]!
    const capTgt=board[key]
    const next={...board}
    delete next[fromKey]

    if(moving.type==='pawn'&&(y===0||y===7)) moving.type='queen'

    if(moving.type==='king'&&isCastlingMove(selected,[x,y])){
      const dir=x>selected[0]?1:-1
      const rookFromX=dir>0?7:0, rookToX=selected[0]+dir
      const rkKey=`${rookFromX},${y}`, rook=next[rkKey]!
      delete next[rkKey]
      next[`${rookToX},${y}`]=rook
    }

    next[key]=moving
    setBoard(next)

    const msg=cap(turn)+' '+display[moving.type]+(
      capTgt
        ? ` captured ${display[capTgt.type]}`
        : ` to ${key}`
    )
    setMoves(ms=>[...ms,msg])

    if(!capTgt) setTurn(t=>t==='white'?'black':'white')

    setSelected(null); setHighlights([])
  }

  return (
    <div style={{ display:'flex', padding:20 }}>
      <div>
        <h2>Turn: {cap(turn)}</h2>
        <Board
          board={board}
          selected={selected}
          highlights={highlights}
          onSquareClick={onSquareClick}
        />
      </div>
      <MoveList history={moves} />
    </div>
  )
}
