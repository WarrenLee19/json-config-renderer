import {
  BrowserRouter,
  Routes,
  Route, Navigate,
} from 'react-router-dom';
import ErrorPage from './ErrorPage' ;
import LoginPage from './LoginPage' ;
import HomePage from "./HomePage";


function Index() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace/>}/>
          <Route path="/platform/*" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/404" element={<ErrorPage />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default Index;

