import { Pos } from './types'
const files = 'abcdefgh'
export function posToNotation([x, y]: Pos): string {
  // x=0→'a', y=0→rank1
  return files[x] + String(y + 1)
}