import './App.css';
import React,  {useState} from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Alert from './components/Alert'
import Pagenotfound from './components/Pagenotfound';
import AddNote from './components/AddNote';
import Registration from './components/Registration';
function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (type, message) =>{
    setAlert({
      type : type,
      msg : message
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
    <NoteState>
    <BrowserRouter>
      <Header showAlert={showAlert}/>
      <Alert alert={alert}/>

      <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
        {/* <Route exact path="/home" element={<Userhome showAlert={showAlert}/>}/> */}
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/addnote" element={<AddNote showAlert={showAlert}/>}/>
        <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
        {/* <Route exact path="forgotpassword" element={<Fpassword/>}/> */}

        <Route exact path="/register" element={<Registration showAlert={showAlert}/>}/>
        <Route exact path="*" element={<Pagenotfound/>}/>
      </Routes>

    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
