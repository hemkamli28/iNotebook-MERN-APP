import React from 'react'

const Fpassword = () => {
  return (
    <>
    <h1 className='my-3'>Reset Password</h1>
    <h6 className='mx-1'>Enter Your email to get password reset link</h6>
    <form>
    <div className="mb-3">
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="username@gmail.com"/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </>
  )
}

export default Fpassword