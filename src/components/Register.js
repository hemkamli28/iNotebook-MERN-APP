import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import reg from '../images/Register.svg'
const Register = (props) => {
      const [credentials, setCredentials] = useState({
        username: "",
        email: "", 
        password: "",
        cpassword: ""
    })
    
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {username, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password})
          }); 
          const json = await response.json();
          console.log(json);
          if (json.success){
            localStorage.setItem('token',json.authtoken);
            navigate("/login");
            props.showAlert("success","Account Created Successfully")
          }
          else{
            props.showAlert("danger","Please Enter Valid Details")
          }
    }

    const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <>
    <div className='register'>


        <form className='reg-form' onSubmit={handleSubmit}>
          <h1 className='reg-heading my-4'>Start your journey with us</h1>
          <h3 className='reg-subheading'>Use your email to create a new account</h3>
                <div className="mb-3">
                    {/* <label htmlFor="exampleInputEmail1" className="form-label">Name</label> */}<i className="fa-solid fa-user"></i>
                    <input  type="text" className="form-control"  onChange={onChange} id="username" name="username"  placeholder='Name' minLength={4}/>
                </div>
                <div className="mb-3">
                    {/* <label htmlFor="exampleInputEmail1" className="form-label">Email</label> */}<i className="fa-solid fa-envelope"></i>
                    <input type="email" className="form-control" onChange={onChange} id="email"  name="email" placeholder='Email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    {/* <label htmlFor="exampleInputEmail1" className="form-label">Password</label> */}<i className="fa-solid fa-key"></i>
                    <input type="password" className="form-control" onChange={onChange} id="password" name="password" placeholder='Password'  required minLength={7}/>
                </div>
                <div className="mb-3">
                    {/* <label htmlFor="exampleInputEmail1" className="form-label">Confirm Password</label> */}<i className="fa-solid fa-key"></i>
                    <input type="password" className="form-control" onChange={onChange} id="cpassword" name="cpassword" placeholder='Confirm Password'  required minLength={7}/>
                </div>
              <div className="extra">
                  <button hidden={credentials.cpassword === 0} type="submit"  className="btn btn-warning">Register</button>

              </div>
          </form>
          <div className="reg-hero">
            <img className="hero-image" alt="" src={reg}/>
          </div>
     </div>

     </>
  )
}

export default Register