
import PropTypes from 'prop-types';
import Piece from './Piece';

const Square = ({ piece, onClick, isValidMove }) => {
  return (
    <div className={`square ${isValidMove ? 'highlight' : ''}`} onClick={onClick}>
      <Piece piece={piece} />
    </div>
  );
};

Square.propTypes = {
  piece: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isValidMove: PropTypes.bool.isRequired,
};

export default Square;


