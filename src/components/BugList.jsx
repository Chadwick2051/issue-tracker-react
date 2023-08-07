import axios from "axios";
import { useState,useEffect } from "react";
import _ from "lodash";
import { BugItem } from "./BugItem";
import {FaSearch} from  'react-icons/fa'

function BugList({ auth, showError }) {
  const [bugs, setBugs] = useState(null);
  const [sortValue, setSortValue] = useState('newest');
  const [keywords, setKeywords] = useState('');
  const [classValue, setClassValue] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}/api/bugs/list`, {
      headers: { authorization: `Bearer ${auth?.token}` },
    })
      .then((res) => {
        // console.log(res.data)
        setBugs(res.data);
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
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/bugs/list`, {
        headers: { authorization: `Bearer ${auth?.token}` },
        params: {sortBy:sortValue,keywords:keywords, classification:classValue, minAge:minAge, maxAge:maxAge, closed:closed }
      })
      setBugs(res.data)
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
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="title">Title</option>
                <option value="classification">Classification</option>
                <option value="assignedTo">Assigned To</option>
                <option value="createdBy">Created By</option>
            </select>
        </div>
        <div className="col-md-3">
            <label className="form-label" htmlFor="selClass">Filter By Classification </label>
            
            <select id="selClass" className="form-select form-select-sm" aria-label="Default select example" value={classValue} onChange={(evt)=>setClassValue(evt.target.value)}>
            <   option value="">Select A Specific Classification</option>
                <option value="approved">Approved</option>
                <option value="unclassified">Unclassified</option>
                <option value="duplicate">Duplicate</option>
                <option value="unapproved">Unapproved</option>
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
        <div className="col-md-2 form-check">
            <br />
            <label htmlFor="chkClosed" className="form-check-label">Closed</label>
            <input type="checkbox" name='checkClosed' id='chkClosed' className="form-check-input" onChange={(evt)=> setClosed(evt.target.checked)} />
        </div>
        </div>
      
      <div className="card-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item pt-0">
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <table className="table table-stripped align-middle">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Classification</th>
                      <th scope="col">Closed?</th>
                      <th scope="col">Date</th>
                      <th scope="col">Assigned To</th>
                      <th scope="col">Reported By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bugs && _.map(bugs, (bug, index) => (
                            <BugItem bug={bug} auth={auth} key={bug._id} index={index}/>
                            ))}
                    {/* {bugs.length === 0 && <tr><td>No Bugs Match This Criteria</td></tr>} */}
                  </tbody>
                </table>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BugList;