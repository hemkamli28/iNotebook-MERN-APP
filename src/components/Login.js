import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom'
import loginimg from '../images/login.svg'
const Login = (props) => {
    const [credentials, setCredentials] = useState({
        email: "", 
        password: ""
    })
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          }); 
          const json = await response.json();
          console.log(json);
          console.log(json.authToken,"web token");

          if (json.success){
            localStorage.setItem('token', json.authToken)
            navigate("/")
            props.showAlert("success","Logged In Successfully!")
          }
          else{
            props.showAlert("danger","Please Enter Valid Credentials!")

          }

    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }


  return (
    <>  <div className="login container">
        <div className="login-image">
          <img src={loginimg} alt="" />
        </div>
        <form className='login-form' onSubmit={handleSubmit}>
            <h1 className="login-heading">Welcome Back</h1>
          <h3 className="login-subheading"> Please enter your details!</h3>
            <div className="mb-3">
            <i className="fa-solid fa-envelope"></i>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} placeholder="Email" id="email" name="email" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
            <i className="fa-solid fa-key"></i>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} placeholder="Password" id="password" name="password" />
            </div>
            <div className="extra">
            <button type="submit" className="btn btn-warning">Login</button><br/>

            </div>
            {/* <p>Forgot Password?<Link className="stretched-link" to="/login/forgotpassword">Click here</Link></p> */}
        </form>
        </div>
    </>
  )
}

export default Login