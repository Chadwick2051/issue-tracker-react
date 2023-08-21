import { useParams,useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import _ from "lodash";


function UserEditor({auth, showError, showSuccess}) {

  const {userId} = useParams();
  const navigate = useNavigate()

  const [user, setUser] = useState({givenName:'',email:'',role:['developer','quality analyst', 'technical manager', 'business analyst', 'product manager'],familyName:'',fullName:'',password:'',createdOn:'',_id:''});

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, {
      method: "get",
      headers: { authorization: `Bearer ${auth?.token}` },
    })
      .then((res) => {
        // console.log(auth)
        setUser(res.data);
      })
      .catch((err) => {
        const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === "string") {
            showError(resError);
          } else if (resError.details) {
            //joi validation
            let joiError = "";
            _.map(resError.details, (x) => (joiError += x.message + "\n"));
            showError(joiError);
          }
        }
      });
  }, [userId,auth]);

  const updateEmail = (evt) => {
    const newEmail = evt.target.value;
    setUser((prevUser)=>({
      ...prevUser,
      email:newEmail
    }))
  }
  const updateGivenName = (evt) => {
    const newGivenName = evt.target.value;
    setUser((prevUser)=>({
      ...prevUser,
      givenName:newGivenName,
      fullName: newGivenName + ' ' + prevUser.familyName
    }))
  }
  const updateFamilyName = (evt) => {
    const newFamilyName = evt.target.value;
    setUser((prevUser)=>({
      ...prevUser,
      familyName:newFamilyName,
      fullName: prevUser.familyName + ' ' + newFamilyName
    }))
  }

  const roleUpdate = (evt) => {
    const checkBoxValue = evt.target.value 
    setUser((prevUser)=>{
      if(prevUser?.role?.includes(checkBoxValue)){
        //positive check value to negative
        return {...prevUser,
          role: prevUser.role.filter((role) => role !== checkBoxValue)
        }
      }else{
        //negative check to positive
        if(!prevUser.role){
          prevUser.role = []
        } 
        return{...prevUser, role:[...prevUser.role, checkBoxValue]}; 
      }
    });
  }

  const updateUser = async evt => {
    evt.preventDefault();
    try{
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${userId}`,{
        email:user.email,
        givenName:user.givenName,
        familyName:user.familyName,
        role:user.role
      },{headers:{authorization: `Bearer ${auth?.token}`}});
      navigate('/user/list');
      console.log(res)
      showSuccess(res.data.success)
    }catch(err){
      console.log(err)
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
  const deleteUser = async evt => {
    evt.preventDefault();
    console.log(auth)
    try{
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${userId}`,{
      },{headers:{authorization: `Bearer ${auth?.token}`}});
      navigate('/user/list');
      console.log(res)
      showSuccess(res.data.success)
    }catch(err){
      console.log(err)
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

    <div className='container'>
         <h1>User Id: {userId} </h1>
         <br/>
          <form>
          <div className="form-group row my-4 mx-1">
            {/* <h5>Current Email: <span className="fw-normal">{user.email}</span></h5> */}
            <label htmlFor="emailInput" className="col-sm-2 col-form-label fw-semibold">New Email</label>
            <div className="col-sm-10">
              <input type="text" id="emailInput" className="form-control" placeholder="new email" onChange={(evt) => updateEmail(evt)} value={user?.email}/>
            </div>
          </div>
          <div className="form-group row my-4 mx-1">
            {/* <h5>Current Given Name: <span className="fw-normal">{user.givenName}</span></h5> */}
            <label htmlFor="givenNameInput" className="col-sm-2 col-form-label fw-semibold">New Given Name</label>
            <div className="col-sm-10">
              <input type="text" id="givenNameInput" className="form-control" placeholder="new givenName" onChange={(evt) => updateGivenName(evt)} value={user?.givenName}/>
            </div>
          </div>
          <div className="form-group row my-4 mx-1">
            {/* <h5>Current Family Name: <span className="fw-normal">{user.familyName}</span></h5> */}
            <label htmlFor="familyNameInput" className="col-sm-2 col-form-label fw-semibold">New Family Name</label>
            <div className="col-sm-10">
              <input type="text" id="familyNameInput" className="form-control" placeholder="new familyName" onChange={(evt) => updateFamilyName(evt)} value={user?.familyName}/>
            </div>
          </div>
          {auth.payload.permissions.canAssignRoles && <>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value='developer' id="chkDeveloper" checked={user?.role?.includes('developer') || false} onChange={(evt)=>roleUpdate(evt)}/>
              <label className="form-check-label" htmlFor="chkDeveloper">
                Developer
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value='quality analyst' id="chkQualityAnalyst" checked={user?.role?.includes('quality analyst') || false} onChange={(evt)=>roleUpdate(evt)}/>
              <label className="form-check-label" htmlFor="chkQualityAnalyst">
                Quality Analyst
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value='technical manager' id="chkTechnicalManager" checked={user?.role?.includes('technical manager') || false} onChange={(evt)=>roleUpdate(evt)}/>
              <label className="form-check-label" htmlFor="chkTechnicalManager">
                Technical Manager
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value='business analyst' id="chkBusinessAnalyst" checked={user?.role?.includes('business analyst') || false} onChange={(evt)=>roleUpdate(evt)}/>
              <label className="form-check-label" htmlFor="chkBusinessAnalyst">
                Business Analyst
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value='product manager' id="chkProductManager" checked={user?.role?.includes('product manager') || false} onChange={(evt)=>roleUpdate(evt)}/>
              <label className="form-check-label" htmlFor="chkProductManager">
                Product Manager
              </label>
            </div>
            </>}
            <br />

          <button type="submit" className="btn btn-dark btn-lg btn-block float-start" value='updateBug' onClick={(evt) => updateUser(evt)}>Update User</button>
          <button type="submit" className="btn btn-danger btn-lg btn-block float-end" value='updateBug' onClick={(evt) => deleteUser(evt)}>Delete User</button>
          </form>
      </div>
  )
}

export default UserEditor;