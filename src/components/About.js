import React from 'react';
import exp from '../images/exp.svg';
import { Link } from 'react-router-dom';
import unleash from '../images/unleash.svg';
export const About = () => {
  
  return (
    <>
    <section className='about-hero'>
          {/* <div className="about-edit">
            <img src={edit} alt="" />
          </div> */}
      <div className="about-content">
          <div className="about-text">
          <h3><b>iNoteBook</b> is designed to meet your unique needs and help you turn your creative visions into reality. </h3>
          </div>
      </div>
    </section>

    <div className="about-use">
      <div className="use-image">
        <img src={exp} alt="" />
      </div>
      <div className="use-text">
      <h3>Combining Tradition and Innovation</h3>
        <p>At inotebook, we believe that the process of capturing your thoughts and ideas should be effortless and intuitive. That's why we've combined the traditional feel of pen-and-paper writing with the power of cutting-edge technology to deliver a seamless experience</p>
      </div>
    </div>
    <div className="get-started">
    <div className="get-started-content container">

      <div className="get-started-heading">
        <h2>"Begin Your Path to Success and Unleash Your Potential with Inotebook Today"</h2>
        <Link type="button" className="btn btn-warning" to='/register'>Get Started</Link>
      </div>
    </div>
    </div>
    
    <div className="about-unleash">
          <div className="about-unleash-text">
            <h3>Unleash Your Potential </h3>
            <p>We believe that everyone has the potential to create, innovate, and make a difference. Our mission is to empower and inspire individuals to bring their ideas and thoughts to life, and we believe that our notebook is the perfect tool to do that.</p>  
          </div>
          <div className="about-unleash-img">
            <img src={unleash} alt="" />
          </div>
    </div>
    
    </>
    );
}

export default About

