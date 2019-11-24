import { connect } from 'react-redux';
import ThreeScene from './ThreeScene';

import { updateGame } from 'redux/actions';

// const mapStateToProps = state => ({

// });

const mapDispatchToProps = {
  updateGame,
};

export default connect(
  null,
  mapDispatchToProps
)(ThreeScene);
