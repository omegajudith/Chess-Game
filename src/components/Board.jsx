import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Square from './Square';
import '../styles/ChessBoard.css';  // Correct path to your CSS

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

const Board = ({ user, onSignOut }) => {
  const [board, setBoard] = useState(initialBoardSetup);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); 

  const playSound = (type) => {
    const sound = new Audio(type === 'capture' ? '/assets/piece-capture.mp3' : '/assets/woosh.mp3');
    sound.play();
  };

  const handleComputerMove = useCallback(() => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === 'p') {
          const newBoard = [...board];
          newBoard[row][col] = ' ';
          newBoard[row + 1][col] = 'p';
          playSound('move');
          setBoard(newBoard);
          setIsPlayerTurn(true); 
          return;
        }
      }
    }
  }, [board]);

  const handleSquareClick = (row, col) => {
    if (!isPlayerTurn) return;

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

        setSelectedPiece(null);
        setValidMoves([]);
        setIsPlayerTurn(false); 
      } else {
        alert('Invalid move.');
        setSelectedPiece(null);
        setValidMoves([]);
      }
    } else if (piece !== ' ') {
      setSelectedPiece({ piece, row, col });
      setValidMoves(getValidMoves(piece, row, col));
    }
  };

  const getValidMoves = (piece, row, col) => {
    const moves = [];
    if (piece === 'P' && row > 0 && board[row - 1][col] === ' ') {
      moves.push({ row: row - 1, col });
    }
    return moves;
  };

  useEffect(() => {
    if (!isPlayerTurn) {
      handleComputerMove();
    }
  }, [isPlayerTurn, handleComputerMove]);

  return (
    <div className="app-container">
      <div className="chess-section">
        {/* Welcome Message */}
        <div className="welcome-message">Welcome, {user.username}!</div>
        
        {/* Chessboard */}
        <div className="chess-card">
          <div className="chess-board">
            {board.map((row, rowIndex) => (
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
            ))}
          </div>
        </div>

        {/* Sign Out Button */}
        <button className="sign-out" onClick={onSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

// Adding PropTypes for validation
Board.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,  // Ensure user object has a required username string
  }).isRequired,
  onSignOut: PropTypes.func.isRequired,  // Ensure onSignOut is a required function
};

export default Board;
