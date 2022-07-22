import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Join from './pages/Join';
import Hire from './pages/Hire';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ResetEmail from './pages/ResetEmail';
import NotFound from './pages/NotFound';
import ConfirmPassword from './pages/ConfirmPassword';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={ <Home />} />
        <Route path="/join" element={ <Join />} />
        <Route path="/hire" element={ <Hire />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/resetemail" element={ <ResetEmail />} />
        <Route path="/dashboard/:id" element={ <Dashboard /> } />
        <Route path="/confirmpassword/:id" element={ <ConfirmPassword />} />
        <Route path="*" element={ <NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
