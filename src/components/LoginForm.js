import { useState } from "react";

function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function onLogin(evt){
    evt.preventDefault();
    setError("");
    setSuccess("");
    if(email === 'admin@exsample.com' && password === 'password'){
      setSuccess('Welcome')
    }else{
      setError('Invalid Username or Password')}
  }

  return (
    <section style={{backgroundColor: "#425463"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{borderRadius: "1rem"}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src="***"
                alt="login form" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}} />
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
                    <label htmlFor="txtEmail" className="form-label">Email address</label>
                    <input type="email" id="txtEmail" className="form-control form-control-lg" placeholder="Enter email" autoComplete="email" onChange={(evt)=> setEmail(evt.currentTarget.value)} />
                  </div>

                  <div className="form-outline mb-4">
                    <label htmlFor="txtPassword" className="form-label">Password</label>
                    <input type="password" id="txtLogin" className="form-control form-control-lg" placeholder="Enter email" autoComplete="password" onChange={(evt)=> setPassword(evt.currentTarget.value)} />
                  </div>

                  <div className="Row">
                  <span className="text-danger">{error}</span>
                  <span className="text-success">{success}</span>
                  </div>

                  <div className="pt-1 mb-4">
                  <button type="submit" id='btnSubmit' className="btn btn-dark btn-lg btn-block" onClick={(evt => onLogin(evt))}>Login</button>
                  <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? 
                  <a href="./components/LoginForm" style={{color: "#393f81"}}>Register here</a></p>
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