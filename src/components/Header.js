import React, { useEffect }from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
const Header = (props) => {
  const navigate = useNavigate();
// eslint-disable-next-line
  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate('/login');
    props.showAlert("info","You have been Logged Out")
  }

  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location])
  

  return (
    <>
      <nav className="navbar navbar-expand-md d-flex justify-content-center ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><span>i</span>NoteBook</Link>
          <button className="navbar-toggler bg-body-tertiary" data-bs-theme="light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/'?"text-warning active":""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/about'?"text-warning active":""}`} to="/about">About</Link>
              </li>

              {!localStorage.getItem('token') ?<>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname==='/login'?"text-warning active":""}`} to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname==='/register'?"text-warning active":""}`} to="/register">Register</Link>
                </li>
              </>:<li className="nav-item">
                  <Link className={`nav-link`} onClick={handleLogout}>Log Out</Link>
                </li>}

{/* 
              {!localStorage.getItem('token') ? <form className='d-flex' >
                <Link type="button" className="btn btn-warning mx-2" to="/login">LogIn</Link>
                <Link type="button" className="btn btn-warning" to="/register">SignUp</Link>
              </form> : <button  onClick={handleLogout} className="btn btn-primary">Logout</button>} */}
              {/* <div className="log-reg">
              <li className="nav-item">
                <Link className='nav-link' to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to="/register">Register</Link>
              </li>

              </div> */}


            </ul>
          </div>
        </div>
  </nav>
    </>
  );
}

export default Header

