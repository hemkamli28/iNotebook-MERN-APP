import React from 'react';
import {Link} from 'react-router-dom';

import Notes from './Notes';
// import noteimg from '../images/notes4.svg'
import homeimg from '../images/homenote.svg'

export const Home = (props) => {
  const {showAlert} = props;

  
  return (
     <>
     <div className="container home">
      <div className="home-img">
        <img src={homeimg} alt="" />  
      </div>
      <div className="hero">
        <div className="hero-heading">
          <h1><span>i</span>Notebook</h1>
        </div>
        <div className="hero-subheading">
          <h3>Your notebook on cloud - Safe & Secure</h3>
        </div>
        <div className="hero-content">
          <p>An online cloud platform where you can create, edit, upload, and delete your notes privately and securely. Check out <Link to='/about'>about page</Link> for more information.</p>
        </div>
        <div className="hero-btn">
          <Link type="button" className="btn btn-warning" to='/addnote'>Create New Note</Link>
        </div>
      </div>
     </div>
     {!localStorage.getItem('token')?
      ""
      :<Notes showAlert={showAlert}/>}
    </>
  )
}

export default Home