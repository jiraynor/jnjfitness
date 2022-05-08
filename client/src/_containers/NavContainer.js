import { connect } from 'react-redux';
import NavComponent from '../components/views/NavBar/NavComponent';

import { goTo } from '../_actions/link_action';

const mapDispatchToProps = {
  goTo,
};

export default connect(null, mapDispatchToProps)(NavComponent);
