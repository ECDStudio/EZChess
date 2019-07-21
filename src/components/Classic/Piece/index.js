import { connect } from 'react-redux';
import Piece from './Piece';

const mapStateToProps = state => ({
  view: state.app.view,
});

// const mapDispatchToProps = {

// };

export default connect(
  mapStateToProps,
  null
)(Piece);
