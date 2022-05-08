import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import SignInPage from './components/views/SignInPage/SignInPage';

import Auth from './hoc/auth';

function App() {
  const LP = Auth(LandingPage, true);
  const SIP = Auth(SignInPage, false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LP />} />
        <Route path="/signIn" element={<SIP />} />
      </Routes>
    </Router>
  );
}

export default App;
