import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import _ from "lodash";

function RegisterForm({onLogin, showSuccess, showError}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [error, setError] = useState("");

  const passwordConfirmError = password !== repeatPassword ? 'Passwords Do Not Match' : '';

  const emailError = !email ? 'Email can not be left blank' :
  !email.includes('@') ? 'Email must include an @ sign' : '';

  const passwordError = !password ? 'password can not be left blank' :
  !password.length > 8 ? 'password must be 8 or more characters long' : '';
  
  const registerUser = async (evt) => {
    evt.preventDefault();
    console.log('register user clicked')
    setError("");
    if(passwordConfirmError) {
      setError(passwordConfirmError)
      return
    }
    if(emailError){
      setError(emailError)
      return
    }
    if(passwordError){
      setError(passwordError)
      return
    }
    if(firstName && familyName && password && email){
      
      try{
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, {
        email:email,
        password:password,
        givenName:firstName,
        familyName:familyName
      });
      const authPayload = jwt_decode(res.data.authToken)

      console.log(authPayload)
      
      const auth = {
        email: email,
        token: res.data.authToken,
        payload: authPayload
      };

      showSuccess(`Welcome ${firstName}`);
      onLogin(auth);

    }catch(err){
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
  }

  return (
    <section style={{backgroundColor: "#425463"}}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100 m-3">
      <div className="card p-5"style={{borderRadius: "1rem"}}>
      <div className="row g-0">
            <div className="d-flex align-items-center">
    <div className="w-100">
      <form>
      <div className="form-outline mb-4">
        <label htmlFor="txtFirstName" className="form-label" >First Name</label>
        <input type="text" id="txtFirstName" className="form-control form-control-lg" placeholder="Enter first name" autoComplete="firstName" onChange={(evt)=> setFirstName(evt.currentTarget.value)} />
      </div>

      <div className="form-outline mb-4">
        <label htmlFor="txtLastName" className="form-label" >Family Name</label>
        <input type="text" id="txtLastName" className="form-control form-control-lg" placeholder="Enter last name" autoComplete="lastName" onChange={(evt)=> setFamilyName(evt.currentTarget.value)} />
      </div>
      
      <div className="form-outline mb-4">
        <label htmlFor="txtEmail" className="form-label">Email address</label>
        <input type="email" id="txtEmail" className="form-control form-control-lg" placeholder="Enter email" autoComplete="email" onChange={(evt)=> setEmail(evt.currentTarget.value)} value={email} />
      </div>

      
      <div className="form-outline mb-4">
        <label htmlFor="txtPassword" className="form-label" >Password</label>
        <input type="password" id="txtPassword" className="form-control form-control-lg" placeholder="Enter password" autoComplete="password" onChange={(evt)=> setPassword(evt.currentTarget.value)} value={password}/>
      </div>

     
      <div className="form-outline mb-4">
        <label htmlFor="txtRepeatPassword" className="form-label" >Repeat Password</label>
        <input type="password" id="txtRepeatPassword" className="form-control form-control-lg" placeholder="Re-enter password" onChange={(evt)=> setRepeatPassword(evt.currentTarget.value)} />
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id='checkbox'/>
        <label className="form-check-label" htmlFor='checkbox'>I agree to all statements in the terms of service</label>
      </div>
      <div className="pt-1 mb-4">
        <button type="submit" id='btnSubmit' className="btn btn-dark btn-lg btn-block" onClick={(evt => registerUser(evt))}>Create Account</button>
      </div>
      <div className="Row">
        <span className="text-danger">{error}</span>
        <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Already have an account? 
        <Link to="/" style={{color: "#393f81"}}>Sign In</Link></p>
      </div>
      
    </form>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
  )
}

export default RegisterForm;