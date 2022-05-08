import { connect } from 'react-redux';
import UserComponents from '../components/views/LandingPage/UserComponents';

const mapStateToProps = (state, props) => {
  return {
    link: state.link.link || 'dashboard',
  };
};

export default connect(mapStateToProps)(UserComponents);
