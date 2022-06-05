import logo from './logo.svg';
import './App.css';
import Polygon from './components/Polygon';
import CreateWallet from './components/CreateWallet';
import { Routes, Route, Link } from "react-router-dom";
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Nav from './components/Nav';
import { createContext, useEffect, useReducer } from 'react';
import Logout from './components/auth/Logout';
import Confirm from './components/ConfirmPay';
import Analysis from './components/Analysis/Analysis';

export const AuthContext = createContext()

const initialauth = {
  logged_in: sessionStorage.getItem('logged_in',false),
user: sessionStorage.getItem('user'),
token: sessionStorage.getItem('token'),
token: sessionStorage.getItem('mywallet'),
token: sessionStorage.getItem('wallet_done'),
}
const authreducer = (state, action) => {
  switch (action.type) {

    case 'login_status':
          return {...state,logged_in : action.value}
    case 'wallet_done':
          return {...state,wallet_done : action.value}
    case 'user':
      return {...state, user: action.value}
    case 'mywallet':
      return {...state, mywallet: action.value}
    case 'token':
      return {...state, token: action.value}
   
    default:
      return state
  }
};

function App() {
  const [auth, dispatchAuth] = useReducer(authreducer, initialauth)

  // useEffect(()=>{

  // },[])
  
  return (
    <AuthContext.Provider value={{ auth, dispatchAuth }}>
    <div className="App">
      
      {/* <Polygon /> */}
      {/* <CreateWallet /> */}
      {/* <Nav /> */}
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/cfmpy" exact element={<Confirm />} />
        <Route path="/logout" exact element={<Logout />} />
        <Route path="/analysis" exact element={<Analysis />} />
        <Route path="/create-account" element={<SignUp />} />
        <Route path="/dashboard" element={<CreateWallet />} />
      </Routes>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
