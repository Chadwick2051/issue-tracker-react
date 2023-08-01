import axios from "axios";
import { useState,useEffect } from "react";
import _ from "lodash";
import { BugItem } from "./BugItem";

function BugList({auth, showError}) {

    const [bugs,setBugs] = useState(null)

    useEffect(() =>{
        axios(`${process.env.REACT_APP_API_URL}/api/bugs/list`,{
            headers:{authorization: `Bearer ${auth?.token}`}
        }).then((res)=>{
            // console.log(res.data)
            setBugs(res.data)
        })
        .catch((err)=>{
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
        })
    },[auth])
    
  return (
    <div className="container">
    <div className="row">
        <div className="col-xl-12 mb-3 mb-lg-5">
            <div className="card">
                <div className="d-flex card-header justify-content-between">
                    <h5 className="me-3 mb-0">Top Bugs</h5>
                    <div className="dropdown show">
                      <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown link
                      </a>

                      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        
                        <li className="list-group-item pt-0">
                            <div className="d-flex align-items-center">
                                {/* <div className="flex-shrink-0 me-3">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="avatar rounded-circle" />
                                </div> */}
                                <div className="flex-grow-1">
                                    <table className="table table-stripped align-middle">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Classification</th>
                                                <th scope="col">Closed?</th>
                                                <th scope="col">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {_.map(bugs, (bug, index) => (
                                                <BugItem bug={bug} auth={auth} key={bug._id} index={index}/>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default BugList;