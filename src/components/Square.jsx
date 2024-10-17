
import PropTypes from 'prop-types';
import '../styles/ChessBoard.css';  // Corrected path to ChessBoard.css or styles.css

const unicodePieces = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙', // White pieces
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟', // Black pieces
};

const Square = ({ piece, onClick, isValidMove }) => (
  <div
    className={`square ${isValidMove ? 'highlight' : ''}`}
    onClick={onClick}
  >
    {piece !== ' ' ? unicodePieces[piece] : ''}
  </div>
);

Square.propTypes = {
  piece: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isValidMove: PropTypes.bool.isRequired,
};

export default Square;
