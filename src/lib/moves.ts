import { Pos, BoardState, Piece } from './types'

function inBounds([x,y]:Pos){ return x>=0&&x<8&&y>=0&&y<8 }

function slide(board:BoardState, from:Pos, deltas:Pos[]):Pos[] {
  const moves:Pos[] = []
  for(const [dx,dy] of deltas){
    let [x,y] = from
    while(true){
      x+=dx; y+=dy
      if(!inBounds([x,y])) break
      const key = `${x},${y}`
      moves.push([x,y])
      if(board[key]) break
    }
  }
  return moves
}

export function knightMoves([fx,fy]:Pos):Pos[]{
  const deltas:Pos[] = [[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1],[-1,2]]
  return deltas.map(([dx,dy])=>[fx+dx,fy+dy] as Pos).filter(inBounds)
}

export function kingMoves([fx,fy]:Pos):Pos[]{
  const deltas:Pos[] = [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]]
  return deltas.map(([dx,dy])=>[fx+dx,fy+dy] as Pos).filter(inBounds)
}

export function pawnMoves(board:BoardState, [fx,fy]:Pos, color:Piece['color']):Pos[]{
  const dir = color==='white'?1:-1
  const moves:Pos[] = []
  if(!board[`${fx},${fy+dir}`]){
    moves.push([fx,fy+dir])
    const home = color==='white'?1:6
    if(fy===home && !board[`${fx},${fy+2*dir}`])
      moves.push([fx,fy+2*dir])
  }
  for(const dx of [-1,1]){
    const tgt = board[`${fx+dx},${fy+dir}`]
    if(tgt && tgt.color!==color) moves.push([fx+dx,fy+dir])
  }
  return moves.filter(inBounds)
}

export function bishopMoves(board:BoardState, from:Pos):Pos[]{
  return slide(board,from,[[1,1],[1,-1],[-1,1],[-1,-1]])
}

export function rookMoves(board:BoardState, from:Pos):Pos[]{
  return slide(board,from,[[1,0],[0,1],[-1,0],[0,-1]])
}

export function queenMoves(board:BoardState, from:Pos):Pos[]{
  return [...bishopMoves(board,from),...rookMoves(board,from)]
}

export function legalMoves(board:BoardState, from:Pos):Pos[]{
  const piece = board[`${from[0]},${from[1]}`]
  if(!piece) return []
  const { type, color } = piece
  let raw:Pos[] = []
  switch(type){
    case 'knight': raw = knightMoves(from); break
    case 'king'  : raw = kingMoves(from)  ; break
    case 'bishop': raw = bishopMoves(board,from); break
    case 'rook'  : raw = rookMoves(board,from)  ; break
    case 'queen' : raw = queenMoves(board,from) ; break
    case 'pawn'  : raw = pawnMoves(board,from,color); break
  }
  return raw.filter(([x,y])=>{
    const tgt = board[`${x},${y}`]
    return !tgt || tgt.color!==color
  })
}

export function isCastlingMove([fx,fy]:Pos,[tx,ty]:Pos):boolean{
  return fy===ty && Math.abs(tx-fx)===2
}
