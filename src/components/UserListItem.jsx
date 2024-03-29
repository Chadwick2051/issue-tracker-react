import _ from "lodash"
import moment from "moment"
import { Link } from "react-router-dom"

export function UserListItem({user, auth}){
  return(
    <div className="col-md-3 mb-3">
      <div className="card" style={{width: "18rem"}}>
        {/* <img src="..." className="card-img-top" alt="..."/> */}
        <div className="card-body">
          <h5 className="card-title">{user.fullName}</h5>
          <p className="card-subtitle mb-2 text-body-secondary fw-light">{user.email}</p>
          {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
          {typeof user.role === 'string' && <p className="badge bg-primary mg-2">{user.role}</p>}
          {Array.isArray(user.role) && _.map(user.role, (role,index) => (<p className="badge bg-primary mg-2" key={index}>{role}</p>))}
          {user.role === null && <p className="badge bg-warning mg-2">No Roles Assigned</p>}
          <br />
          {auth.payload.permissions.canEditAnyUser &&
            <Link to={`/user/${user._id}`} className="btn btn-secondary">Edit User</Link>
          }
        </div>
        <div className="card-footer text-body-secondary">
          <p>User Created {moment(user.createdOn).fromNow()}</p>
        </div>
      </div>
    </div>
  )
}