import { connect } from 'react-redux';
import Game from './Game';

import { updateGame, updateView } from 'src/redux/actions';

const mapStateToProps = state => ({
  view: state.app.view,
});

const mapDispatchToProps = {
  updateGame,
  updateView,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
