# Chess Challenge Demo

A React + TypeScript mini–chess application demonstrating core game mechanics, UI polish, and modular game logic.

## 🗂 Project Structure

```
src/
├── App.tsx               # Main container: turn, board state, move logic
├── index.css             # Global styles and CSS variables
│
├── components/
│   ├── Board.tsx         # Renders an 8×8 grid of squares
│   ├── Square.tsx        # Individual square: piece rendering + styles
│   └── MoveList.tsx      # Side panel displaying move history
│
└── lib/
    ├── types.ts          # Shared TypeScript types (Piece, Pos, BoardState)
    ├── initialBoard.ts   # Generates full 32–piece starting position
    └── moves.ts          # move generation: knight, pawn, bishop, rook, queen, king, castling
```

## 🚀 Features

* **Turn Enforcement**: White always starts. Players alternate turns; capturing grants an extra move bonus.
* **Full 32–Piece Setup**: All pieces (pawn, knight, bishop, rook, queen, king) for both colors.
* **Move Validation**: Legal moves computed for each piece type; blocks own pieces and includes basic castling.
* **Pawn Promotion**: Pawns auto‑promote to queen upon reaching the far rank.
* **Basic Castling**: King moves two squares; corresponding rook shifts to complete castling.
* **Move History Panel**: Human‑readable text (e.g., “White knight captured soldier”) color‑coded per side.
* **UI Polish**: CSS Grid board, hover effects, selected square outlines, highlight styles, responsive design.

## ⚙️ Installation & Running

1. **Clone the repo**

   ```bash
   git clone <repo-url>
   cd chess-challenge
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Start development server**

   ```bash
   npm start
   ```
4. **Run tests**

   ```bash
   npm test
   ```

## 🧠 Architecture & Logic

1. **State Management**:

   * **`board: BoardState`** holds a map from `"x,y"` → `Piece`.
   * **`turn: 'white'|'black'`** tracks whose move it is.
   * **`selected: Pos | null`** holds the currently selected square.
   * **`highlights: Pos[]`** lists legal destinations for the selected piece.
   * **`moves: string[]`** stores human‑friendly move descriptions.

2. **Move Generation** (`lib/moves.ts`):

   * **`legalMoves(board, from)`** dispatches to piece‑specific functions:

     * **`knightMoves`**, **`bishopMoves`**, **`rookMoves`**, **`queenMoves`**, **`kingMoves`**, **`pawnMoves`**.
   * **Filtering** blocks squares occupied by same‑color pieces.
   * **`isCastlingMove(from, to)`** detects double‑step king moves to trigger rook movement.

3. **Piece Mechanics**:

   * **Pawn Moves**: single or double advance; diagonal captures; no en‑passant.
   * **Castling**: Basic implementation—no moved‑flag checks; rook and king reposition.
   * **Promotion**: Pawn reaching rank 0 or 7 automatically becomes a queen.

4. **UI Components**:

   * **`<Board>`**: Loops rows/columns, renders `<Square>` for each coordinate.
   * **`<Square>`**: Uses Unicode chess glyphs; applies CSS classes for light/dark, selected, highlight.
   * **`<MoveList>`**: Renders ordered list; odd/even coloring for white vs. black moves.


