import logo from './logo.svg';
import './App.css';
import Polygon from './components/Polygon';
import CreateWallet from './components/CreateWallet';
import { Routes, Route, Link } from "react-router-dom";
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      
      {/* <Polygon /> */}
      {/* <CreateWallet /> */}
      {/* <Nav /> */}
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/create-account" element={<SignUp />} />
        <Route path="/dashboard" element={<CreateWallet />} />
      </Routes>
    </div>
  );
}

export default App;
