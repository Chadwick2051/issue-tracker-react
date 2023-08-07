import { UserListItem } from "./UserListItem";
import { useEffect,useState } from "react";
import axios from "axios";
import _ from "lodash";
import {FaSearch} from  'react-icons/fa'

function UserList({auth, showError}) {

    const [users,setUsers] = useState(null)
    const [sortValue, setSortValue] = useState('newest');
    const [keywords, setKeywords] = useState('');
    const [role, setRoleValue] = useState('');
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');

    useEffect(() => {
      axios(`${process.env.REACT_APP_API_URL}/api/users/list`, {
        headers: { authorization: `Bearer ${auth?.token}` },
      })
        .then((res) => {
          // console.log(res.data);
          setUsers(res.data);
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
    }, [auth]);

    const onSubmitSearch = async (evt) => {
      evt.preventDefault();
      try{
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/list`, {
          headers: { authorization: `Bearer ${auth?.token}` },
          params: {sortBy:sortValue,keywords:keywords, minAge:minAge, maxAge:maxAge, role:role }
        })
        setUsers(res.data)
      }catch(err){console.log(err)}
    }
    
  return (
    <div className="container">
      <div className="p-2 row">
        <h3>Search Results</h3>
        <div className="col-md-4">
          <label className="form-label" htmlFor="txtKeyWords"> Key Words </label>  
          <input type="text" className="form-control" id='txtKeyWords' value={keywords} onChange={(evt) => setKeywords(evt.target.value)}/>
        </div>
        <div className="col-md-3">
            <label className="form-label" htmlFor="selSort"> Sort By </label>

            <select id="selSort" className="form-select form-select-sm" aria-label="Default select example" value={sortValue} onChange={(evt)=>setSortValue(evt.target.value)}>
                <option value="givenName">Give Name</option>
                <option value="familyName">Family Name</option>
                <option value="role">Role</option>
                <option value="classification">Classification</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>
        </div>
        <div className="col-md-3">
            <label className="form-label" htmlFor="selRole">Filter By Role </label>
            
            <select id="selRole" className="form-select form-select-sm" aria-label="Default select example" value={role} onChange={(evt)=>setRoleValue(evt.target.value)}>
            <   option value="">Select A Specific Role</option>
                <option value="developer">Developer</option>
                <option value="quality analyst">Quality Analyst</option>
                <option value="business analyst">Business Analyst</option>
                <option value="technical manager">Technical Manager</option>
            </select>
        </div>
        <div className="col-md-1">
            <label htmlFor="txtMinAge" className="form-label">Min Age</label>
            <input type='number' name='txtMinAge' id='txtMinAge'className="form-control form-control-sm" min='0' value={minAge} onChange={(evt) => setMinAge(evt.target.value)}/>
        </div>
        <div className="col-md-1">
            <label htmlFor="txtMaxAge" className="form-label">Max Age</label>
            <input type='number' name='txtMaxAge' id='txtMaxAge'className="form-control form-control-sm" min='0' value={maxAge} onChange={(evt) => setMaxAge(evt.target.value)}/>
        </div>
      </div>
      <div className="row pb-2">
        <div className="col-md-2 ps-5">
            <br />
            <button type="submit" className="btn btn-secondary " onClick={(evt)=> onSubmitSearch(evt)}><FaSearch /> Search</button>
        </div>
        </div>
      <div className="row">
        <div className="col-xl-12 mb-3 mb-lg-5">
          <div className="card">
            <div className="d-flex card-header justify-content-between">
              <h5 className="me-3 mb-0">Recent Users</h5>
              
            </div>
            <div className="row">
              {_.map(users, (user, index) => (
                <UserListItem user={user} auth={auth} key={user._id} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;