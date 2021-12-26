import HomePage from './components/Pages/HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import FindPartnerPage from './components/Pages/FindPartnerPage';
import WebsitesPage from './components/Pages/WebsitesPage';
import MessagePage from './components/Pages/MessagePage';
import SignUpPage from './components/Pages/SignUpPage/SignUpPage';
import SignInPage from './components/Pages/SignInPage/SignInPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signUp' element={<SignUpPage />} />
      <Route path='/signIn' element={<SignInPage />} />
      <Route path='/partners' element={<FindPartnerPage />} />
      <Route path='/message' element={<MessagePage />} />
      <Route path='/utilities/' element={<WebsitesPage />} />
    </Routes>
  );
}

export default App;
