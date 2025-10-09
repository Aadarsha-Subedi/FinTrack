//THIRD PARTY IMPORTS
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

//CONTEXTS, UTILS AND WEBHOOKS
import { AuthProvider } from './Contexts/AuthContext.jsx';

//COMPONENTS
import UserLayout from './Components/UserLayout.jsx';
import PreventAuth from './Components/PreventAuth.jsx';
import RequireAuth from './Components/RequireAuth.jsx';

//PAGES
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Analytics from './Pages/Analytics.jsx';
import Settings from './Pages/Settings.jsx';
import LandingPage from './Pages/LandingPage.jsx';

//ASSETS AND STYLES
import '../src/Styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<PreventAuth><LandingPage /></PreventAuth>} />
          <Route path='/signup' element={<PreventAuth><Signup /></PreventAuth>} />
          <Route path='/login' element={<PreventAuth><Login /></PreventAuth>} />
          <Route path='/user' element={<RequireAuth><UserLayout /></RequireAuth>}>
            <Route index element={<Dashboard />} />
            <Route path='analytics' element={<Analytics />} />
            <Route path='settings' element={<Settings />} />
          </Route>
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
