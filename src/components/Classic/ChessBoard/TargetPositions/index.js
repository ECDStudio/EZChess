import { connect } from 'react-redux';
import TargetPositions from './TargetPositions';

import { updateGame } from 'redux/actions';

// const mapStateToProps = state => ({

// });

const mapDispatchToProps = {
  updateGame,
};

export default connect(
  null,
  mapDispatchToProps
)(TargetPositions);
