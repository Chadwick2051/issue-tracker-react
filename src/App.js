import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
// import BugSummary from "./components/BugSummary";
import BugList from "./components/BugList";
import BugEditor from "./components/BugEditor";
// import UserSummary from "./components/UserSummary";
import UserList from "./components/UserList";
import UserEditor from "./components/UserEditor";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ReportBug } from "./components/ReportBug";
import LandingPage from './components/LandingPage'
import './App.scss';
import { NotFound } from "./components/NotFound";
import { useState,useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import jwt_decode from "jwt-decode";

function App() {

  const [auth,setAuth] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage){
      const storedAuthToken = localStorage.getItem('authToken');
      if(storedAuthToken){
        const authPayload = jwt_decode(storedAuthToken);
        //console.log(authPayload);
        if(authPayload){
          const auth = {
            token:storedAuthToken,
            payload:authPayload,
            email: authPayload.email,
            userId: authPayload._id
          };
          setAuth(auth);
        }
      }
    }
  }, [])

  function onLogin(auth){
    setAuth(auth);

    if(localStorage){
      localStorage.setItem('authToken', auth.token)
    }

    navigate('/bug/list');
  }

  function onLogout(){
    setAuth(null);
    localStorage.removeItem("authToken");
    navigate('/');
  }

  function showError(message) {
    toast(message, { type: 'error', position: 'bottom-right' });
  }
  function showSuccess(message) {
    toast(message, { type: 'success', position: 'bottom-right' });
  }

  return (
    <div className='container'>
      <div className='App d-flex flex-column min-vh-100'>
        <ToastContainer/>
          <NavBar auth={auth} onLogout={onLogout} showSuccess={showSuccess} />
            <main className='flex-grow-1'>
              <Routes>
              <Route path='/' element={<LandingPage onLogin={onLogin} showError={showError} showSuccess={showSuccess}/>} />
              <Route path='/login' element={<LoginForm onLogin={onLogin} showError={showError} showSuccess={showSuccess}/>} />
              <Route path='/bug/list' element={<BugList auth={auth} showError={showError} />} />
              <Route path='/user/register' element={<RegisterForm showSuccess={showSuccess} onLogin={onLogin} showError={showError}/>} />
              <Route path='/bug/report' element={<ReportBug auth={auth} showError={showError} showSuccess={showSuccess}/>} />
              <Route path='/bug/:bugId' element={<BugEditor auth={auth} showSuccess={showSuccess} showError={showError}/>} />
              <Route path='/user/list' element={<UserList auth={auth} showError={showError}/>} />
              <Route path='/user/:userId' element={<UserEditor auth={auth} showSuccess={showSuccess} showError={showError}/>} />
              <Route path='*' element={<NotFound />} />
              </Routes>
            </main>
          <Footer />   
      </div>
    </div>
  )
}

export default App;
