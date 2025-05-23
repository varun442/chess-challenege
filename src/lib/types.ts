export type Pos = [number, number]
export type Color = 'white' | 'black'
export type PieceType =
  | 'king'
  | 'queen'
  | 'rook'
  | 'bishop'
  | 'knight'
  | 'pawn'

export interface Piece {
  type: PieceType
  color: Color
}

export type BoardState = Record<string, Piece>

export interface Move {
  piece: Piece
  from: Pos
  to: Pos
  captured?: Piece
}