import React from 'react'
import { Piece } from '../lib/types'

const SYMBOLS:Record<string,string> = {
  'white:king':'♔','white:queen':'♕','white:rook':'♖',
  'white:bishop':'♗','white:knight':'♘','white:pawn':'♙',
  'black:king':'♚','black:queen':'♛','black:rook':'♜',
  'black:bishop':'♝','black:knight':'♞','black:pawn':'♟︎',
}

export default function Square({
  piece, light, selected, highlight, onClick
}:{
  piece?:Piece
  light:boolean
  selected:boolean
  highlight:boolean
  onClick:()=>void
}){
  const cls=[
    'square',
    light?'light':'dark',
    selected?'selected':'',
    highlight?'highlight':''
  ].filter(Boolean).join(' ')
  const sym= piece
    ? SYMBOLS[ piece.color+':'+piece.type ]
    : ''
  return (
    <div className={cls} onClick={onClick}>
      <span>{sym}</span>
    </div>
  )
}
