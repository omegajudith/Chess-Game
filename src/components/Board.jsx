import { useState, useEffect, useCallback } from "react";
import Square from "./Square";
import moveSound from "./woosh-.mp3";
import captureSound from "./piece-capture.mp3";

// Initial board setup
const initialBoardSetup = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

const Board = () => {
  const [board, setBoard] = useState(initialBoardSetup);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // White's turn by default
  const [moveHistory, setMoveHistory] = useState([]); // To track all moves

  // Function to play sound effects
  const playSound = (type) => {
    const sound = new Audio(type === 'capture' ? captureSound : moveSound);
    sound.play();
  };

  // Handle Computer's Move (for now, it just moves pawns)
  const handleComputerMove = useCallback(() => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === 'p') {
          const newBoard = [...board];
          newBoard[row][col] = ' ';
          newBoard[row + 1][col] = 'p';
          playSound('move');
          setBoard(newBoard);
          setMoveHistory((prevHistory) => [
            ...prevHistory,
            `Black Pawn from (${row},${col}) to (${row + 1},${col})`,
          ]);
          setIsPlayerTurn(true); // Back to White's turn
          return;
        }
      }
    }
  }, [board]);

  // Handle the player's move
  const handleSquareClick = (row, col) => {
    if (!isPlayerTurn) return; // Player can only move during their turn

    const piece = board[row][col];
    if (selectedPiece) {
      if (validMoves.some(move => move.row === row && move.col === col)) {
        const newBoard = [...board];
        if (newBoard[row][col] !== ' ') {
          playSound('capture');
        } else {
          playSound('move');
        }

        newBoard[selectedPiece.row][selectedPiece.col] = ' ';
        newBoard[row][col] = selectedPiece.piece;
        setBoard(newBoard);

        // Update move history
        setMoveHistory((prevHistory) => [
          ...prevHistory,
          `White ${selectedPiece.piece} from (${selectedPiece.row},${selectedPiece.col}) to (${row},${col})`,
        ]);

        setSelectedPiece(null);
        setValidMoves([]);
        setIsPlayerTurn(false); // Switch to Black's turn
      } else {
        alert("Invalid move.");
        setSelectedPiece(null);
        setValidMoves([]);
      }
    } else if (piece !== ' ') {
      setSelectedPiece({ piece, row, col });
      setValidMoves(getValidMoves(piece, row, col));
    }
  };

  // Get valid moves for a selected piece
  const getValidMoves = (piece, row, col) => {
    const moves = [];
    if (piece === 'P') {
      // White Pawn moves
      if (row > 0 && board[row - 1][col] === ' ') {
        moves.push({ row: row - 1, col });
      }
      if (row === 6 && board[row - 1][col] === ' ' && board[row - 2][col] === ' ') {
        moves.push({ row: row - 2, col });
      }
    }
    return moves;
  };

  // Render the chessboard
  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((piece, colIndex) => (
          <Square
            key={colIndex}
            piece={piece}
            isValidMove={validMoves.some(move => move.row === rowIndex && move.col === colIndex)}
            onClick={() => handleSquareClick(rowIndex, colIndex)}
          />
        ))}
      </div>
    ));
  };

  // Use effect to trigger computer's move after player's turn
  useEffect(() => {
    if (!isPlayerTurn) {
      handleComputerMove();
    }
  }, [isPlayerTurn, handleComputerMove]);

  return (
    <div className="chess-container">
      {/* Move History Display */}
      <div className="move-history">
        <h3>Move History</h3>
        <ul>
          {moveHistory.map((move, index) => (
            <li key={index}>{move}</li>
          ))}
        </ul>
      </div>

      {/* Turn Indicator */}
      <div className="turn-indicator">
        <h2>{isPlayerTurn ? "White's Turn" : "Black's Turn"}</h2>
      </div>

      {/* Chess Board */}
      <div className="chess-card">
        <div className="chess-board">
          {renderBoard()}
        </div>
      </div>
    </div>
  );
};

export default Board;
