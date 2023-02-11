//import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route,Routes } from 'react-router';
import Login from './components/Login';
import About from './components/About';
import Home from './Home';

function App() {
  return (
    <>
    <Navbar></Navbar>
    
    
    <div className="App">
      
      <div className="container">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login></Login>}/>
        <Route path="/About" element={<About></About>}/>
      </Routes></div>
      
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to InteliQ !
        </p>
        
  </header>*/}
      
    </div>
    </>
  );
}

export default App;
