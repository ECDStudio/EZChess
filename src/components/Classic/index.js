import { connect } from 'react-redux';
import Classic from './Classic';

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
)(Classic);
