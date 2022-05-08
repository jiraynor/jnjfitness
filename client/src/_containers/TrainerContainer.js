import { connect } from 'react-redux';
import TrainerComponents from '../components/views/LandingPage/TrainerComponents';

const mapStateToProps = (state, props) => {
  return {
    link: state.link.link || 'dashboard',
  };
};

export default connect(mapStateToProps)(TrainerComponents);
