import { knightMoves, pawnMoves } from './moves'
import { Pos } from './types'

function sortPos(arr: Pos[]) {
  return arr.map(a => a.join(',')).sort()
}

test('knightMoves center', () => {
  expect(sortPos(knightMoves([4, 4]))).toEqual(
    sortPos([[5,6],[5,2],[3,6],[3,2],[6,5],[6,3],[2,5],[2,3]])
  )
})

test('knightMoves corner', () => {
  expect(sortPos(knightMoves([0, 0]))).toEqual(sortPos([[1,2],[2,1]]))
})

test('knightMoves edge', () => {
  expect(sortPos(knightMoves([0, 4]))).toEqual(
    sortPos([[1,6],[1,2],[2,5],[2,3]])
  )
})
