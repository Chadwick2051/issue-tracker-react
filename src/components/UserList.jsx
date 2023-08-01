import { UserListItem } from "./UserListItem";
import { useEffect,useState } from "react";
import axios from "axios";
import _ from "lodash";

function UserList({auth, showError}) {

    const [users,setUsers] = useState(null)

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
    
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12 mb-3 mb-lg-5">
          <div className="card">
            <div className="d-flex card-header justify-content-between">
              <h5 className="me-3 mb-0">Recent Users</h5>
              <div className="dropdown show">
                <a
                  className="btn btn-secondary dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown link
                </a>

                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
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