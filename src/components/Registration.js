import React from "react";
import { useFormik } from "formik";
import { useNavigate} from 'react-router-dom';
import reg from '../images/Register.svg';
import * as Yup from 'yup';

function Registration(props) {
    
    const registerSchema = Yup.object().shape({
        username: Yup.string().required().min(4).max(25).matches(/^[a-z0-9]+$/i, "Username should contain alphabets and numbers only"),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8).matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "It must Contain 8 Characters with One Uppercase, One Number and one special Character"
     ),
        cpassword: Yup.string().oneOf([Yup.ref("password"),null], "Passsword doesn't match!!")
    })
    const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
        initialValues : {
            username: "",
            email: "",
            password: "",
            cpassword: "",
          },
          validationSchema: registerSchema,
      onSubmit: async (values) => {
        // action.resetForm();
        const {username, email, password} = values;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password})
          }); 
          const json = await response.json();
          if (json.success){
            localStorage.setItem('token',json.authtoken);
            navigate("/login");
            props.showAlert("success","Account Created Successfully")
          }
          else{
            props.showAlert("danger","Please Enter Valid Details")
          }
        }
});

  return (
    <>
      <div className="register">
        <form className="reg-form" onSubmit={handleSubmit}>
          <h1 className="reg-heading my-4">Start your journey with us</h1>
          <h3 className="reg-subheading">
            Use your email to create a new account
          </h3>
          <div className="mb-3">
            <i className="fa-solid fa-user"></i>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            { errors.username && touched.username ? <p className="form-errors">{errors.username}</p> : null}
          </div>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputEmail1" className="form-label">Email</label> */}
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-describedby="emailHelp"
            />
            { errors.email && touched.email ? <p className="form-errors">{errors.email}</p> : null}


          </div>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputEmail1" className="form-label">Password</label> */}
            <i className="fa-solid fa-key"></i>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}

            />
            { errors.password && touched.password? <p className="form-errors">{errors.password}</p> : null}

          </div>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputEmail1" className="form-label">Confirm Password</label> */}
            <i className="fa-solid fa-key"></i>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              placeholder="Confirm Password"
              value={values.cpassword}
              onChange={handleChange}
              onBlur={handleBlur}

            />
            { errors.cpassword && touched.cpassword ? <p className="form-errors">{errors.cpassword}</p> : null}
            
          </div>
          <div className="extra">
            <button type="submit" className="btn btn-warning">
              Register
            </button>
          </div>
        </form>
        <div className="reg-hero">
          <img className="hero-image" alt="" src={reg} />
        </div>
      </div>
    </>
  );
}

export default Registration;
