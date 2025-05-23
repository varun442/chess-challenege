import { BoardState, PieceType } from './types'

const backRank = (color: string): PieceType[] => [
  'rook',
  'knight',
  'bishop',
  'queen',
  'king',
  'bishop',
  'knight',
  'rook',
]

export const initialBoard: BoardState = {
  // White back rank (y=0)
  ...backRank('white').reduce((acc, t, x) =>
    ({ ...acc, [`${x},0`]: { type: t,   color: 'white' } }), {}),
  // White pawns (y=1)
  ...[...Array(8)].reduce((acc, _, x) =>
    ({ ...acc, [`${x},1`]: { type: 'pawn', color: 'white' } }), {}),

  // Black pawns (y=6)
  ...[...Array(8)].reduce((acc, _, x) =>
    ({ ...acc, [`${x},6`]: { type: 'pawn', color: 'black' } }), {}),
  // Black back rank (y=7)
  ...backRank('black').reduce((acc, t, x) =>
    ({ ...acc, [`${x},7`]: { type: t,   color: 'black' } }), {}),
}
