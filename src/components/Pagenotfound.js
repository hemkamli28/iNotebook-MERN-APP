import React from 'react';
import pnf from '../images/pnf.svg';
import { Link } from 'react-router-dom';

const Pagenotfound = () => {
  return (
    <div className="pagenf container">
    <div className="pnf-heading">
      <h1>404 : Oops! We can't seem to find the page you're looking for.</h1>
      <p>It may have been moved, deleted, or may have never existed. you can navigate to a related page using the above menu.</p>
    </div>
      <div className="pnf">
        <img src={pnf} alt="" />
      </div>
      <div className="hero-btn">
        <Link type="button" id="pnf-btn" className="btn btn-warning" to='/'>Go Back to Home</Link>
      </div>
    </div>
  )
}

export default Pagenotfound