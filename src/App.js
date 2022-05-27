import logo from './logo.svg';
import './App.css';
import Polygon from './components/Polygon';
import CreateWallet from './components/CreateWallet';
import { Routes, Route, Link } from "react-router-dom";
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Nav from './components/Nav';
import { createContext, useReducer } from 'react';
import Logout from './components/auth/Logout';

export const AuthContext = createContext()

const initialauth = {
  logged_in: sessionStorage.getItem('logged_in',false),
user: sessionStorage.getItem('user'),
token: sessionStorage.getItem('token'),
}
const authreducer = (state, action) => {
  switch (action.type) {

    case 'login_status':
          return {...state,logged_in : action.value}
    case 'user':
      return {...state, user: action.value}
    case 'token':
      return {...state, token: action.value}
   
    default:
      return state
  }
};

function App() {
  const [auth, dispatchAuth] = useReducer(authreducer, initialauth)
  
  return (
    <AuthContext.Provider value={{ auth, dispatchAuth }}>
    <div className="App">
      
      {/* <Polygon /> */}
      {/* <CreateWallet /> */}
      {/* <Nav /> */}
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/logout" exact element={<Logout />} />
        <Route path="/create-account" element={<SignUp />} />
        <Route path="/dashboard" element={<CreateWallet />} />
      </Routes>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
