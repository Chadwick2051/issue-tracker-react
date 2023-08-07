import moment from "moment/moment"

export function CommentItem({comment,auth,index}) {
  return (
    <div className="col-md-4 mb-3">
    <div className="card" style={{width: "18rem"}}>
      <div className="card-body">
        <h5 className="card-title">{index+1}. {comment.fullName}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{moment(comment.createdOn).fromNow()}</h6>
        <p className="card-text">{comment.comment}</p>
      </div>
    </div>
    </div>
  )
}