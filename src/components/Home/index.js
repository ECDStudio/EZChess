import { connect } from 'react-redux';
import Home from './Home';

import { updateGame, updateView } from 'redux/actions';

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
)(Home);
