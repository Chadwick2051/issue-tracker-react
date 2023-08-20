import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import _ from "lodash";
import { Link } from "react-router-dom";

function LoginForm({onLogin, showSuccess, showError}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");

  const emailError = !email ? 'can not be left blank' :
  !email.includes('@') ? 'be a valid email' : '';

  const passwordError = !password ? 'can not be left blank' :
  !password.length > 8 ? 'password must be 8 or more characters long' : '';

  async function onSubmitLogin(evt){
    // console.log(`email is ${password}`)
    try{
      const res = await axios.post(`http://localhost:5003/api/users/login`,{
          email,
          password
        });
        
        const authPayload = jwt_decode(res.data.authToken)             
        
        const auth = {
          email: email,
          token: res.data.authToken,
          payload: authPayload
        }

        showSuccess(`Welcome ${auth.email}`)

        onLogin(auth);

      //setError("");
      //setSuccess(`${res.data.message}`);
    }catch(err){
      // setSuccess('');
      const resError = err?.response?.data?.error;

      if(resError){
        if(typeof resError==='string'){
          showError(resError)
        }else if(resError.details){
          //joi validation
          let joiError = ''
          _.map(resError.details, (x) => joiError += (x.message + '\n'))
          showError(joiError)
        }
      }
    }
  }

  return (
    <section style={{backgroundColor: "#425463"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{borderRadius: "1rem"}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src={process.env.PUBLIC_URL + 'file_art.png'}
                alt="login form" className="image-fluid px-2 py-5" style={{borderRadius: "1rem 0 0 1rem"}} />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form>

                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                    <span className="h1 fw-bold mb-0">Issue Tracker</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Sign into your account</h5>

                  <div className="form-outline mb-4">
                    <label htmlFor="txtEmail" className="form-label">Email address {emailError && <span className="text-danger">{emailError}</span>}</label>
                    <input type="email" id="txtEmail" className="form-control form-control-lg" placeholder="Enter email" autoComplete="email" onChange={(evt)=> setEmail(evt.currentTarget.value)} value={email} />
                  </div>

                  <div className="form-outline mb-4">
                    <label htmlFor="txtPassword" className="form-label">Password {passwordError && <span className="text-danger"> {passwordError}</span>}</label>
                    <input type="password" id="txtLogin" className="form-control form-control-lg" placeholder="Enter email" autoComplete="password" onChange={(evt)=> setPassword(evt.currentTarget.value)} value={password} />
                  </div>

                  <div className="Row">
                  
                  </div>

                  <div className="pt-1 mb-4">
                  <button type="button" id='btnSubmit' className="btn btn-dark btn-lg btn-block" onClick={(evt => onSubmitLogin())}>Login</button>
                  </div><div className="pt-1 mb-4">
                  <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? 
                  <Link to={'http://localhost:3000' + '/user/register'} style={{color: "#393f81"}}>Register here</Link></p>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default LoginForm;