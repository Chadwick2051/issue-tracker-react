import { useState } from "react";

function RegisterForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function onRegister(evt){
    evt.preventDefault();
    setError("");
    setSuccess("");
    if(repeatPassword === password && userName !== "" && email !== "" && name !== ""){
      setSuccess('Welcome')
    }
    else{
      setError('Invalid Username or Password')}
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
        <label htmlFor="txtName" className="form-label" >Name</label>
        <input type="text" id="txtName" className="form-control form-control-lg" placeholder="Enter full name" autoComplete="name" onChange={(evt)=> setName(evt.currentTarget.value)} />
      </div>

      
      <div className="form-outline mb-4">
        <label htmlFor="txtUserName" className="form-label" >User Name</label>
        <input type="text" id="txtUserName" className="form-control form-control-lg" placeholder="Enter username" autoComplete="username" onChange={(evt)=> setUserName(evt.currentTarget.value)} />
      </div>

      
      <div className="form-outline mb-4">
        <label htmlFor="txtEmail" className="form-label">Email address</label>
        <input type="email" id="txtEmail" className="form-control form-control-lg" placeholder="Enter email" autoComplete="email" onChange={(evt)=> setEmail(evt.currentTarget.value)} />
      </div>

      
      <div className="form-outline mb-4">
        <label htmlFor="txtPassword" className="form-label" >Password</label>
        <input type="text" id="txtPassword" className="form-control form-control-lg" placeholder="Enter password" autoComplete="password" onChange={(evt)=> setPassword(evt.currentTarget.value)} />
      </div>

     
      <div className="form-outline mb-4">
        <label htmlFor="txtRepeatPassword" className="form-label" >Repeat Password</label>
        <input type="text" id="txtRepeatPassword" className="form-control form-control-lg" placeholder="Re-enter password" autoComplete="password" onChange={(evt)=> setRepeatPassword(evt.currentTarget.value)} />
      </div>
      <div className="pt-1 mb-4">
        <button type="submit" id='btnSubmit' className="btn btn-dark btn-lg btn-block" onClick={(evt => onRegister(evt))}>Create Account</button>
      </div>
      <div className="Row">
        <span className="text-danger">{error}</span>
        <span className="text-success">{success}</span>
        <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Already have an account? 
        <a href="./components/LoginForm" style={{color: "#393f81"}}>Sign In</a></p>
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