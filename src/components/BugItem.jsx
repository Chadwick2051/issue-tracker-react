import moment from "moment/moment"
import { Link } from "react-router-dom"

export function BugItem({bug,auth,index}) {
  return (
    <tr>
      <th scope="row">{index+1}</th>
      <td>{bug.title}</td>
      <td>{bug.classification}</td>
      <td>{bug.closed.toString()}</td>
      <td>{moment(bug.createdOn).fromNow()}</td>
      {auth.payload.permissions.canEditAnyUser &&
        <td><Link to={`/bug/${bug._id}`} className="btn btn-sm btn-warning">Edit Bug</Link></td>
      }
    </tr>
  )
}