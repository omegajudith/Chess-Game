import PropTypes from 'prop-types';

const unicodePieces = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙', // White pieces
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟', // Black pieces
};

const Piece = ({ piece }) => {
  return (
    <div className="piece">
      {piece !== ' ' ? unicodePieces[piece] : ''}
    </div>
  );
};

Piece.propTypes = {
  piece: PropTypes.string.isRequired,
};

export default Piece;
