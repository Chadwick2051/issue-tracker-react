
function UserSummary() {

  const user = {
              _id:"123456789",
              fullName : "Chadwick Acison",
              email : "ChadwickAcison@insideranken.org",
              password:"****",
              roles:"developer, technical manager",
              createdOn:'date',
              lastUpdate:"date",
              bugComments:"This is a really freaking epic comment",
              }

  return (
    <div className='container'>
      <h1>Welcome Back {user.fullName}</h1>
      <div className="d-flex p-3 bg-secondary text-white rounded-top">
        <div className="d-flex flex-column flex-fill">
          {/* <div className="p-2 flex-fill"><span><h3>Name</h3><p>{user.fullName}</p></span></div> */}
          <div className="p-2 flex-fill"><span><h3>Id</h3><p>{user._id}</p></span></div>
          <div className="p-2 flex-fill"><span><h3>Email</h3><p>{user.email}</p></span></div>
        </div>
        <div className="d-flex flex-column flex-fill">
          <div className="p-2 flex-fill"><span><h3>Password</h3><p>{user.password}</p></span></div>
          <div className="p-2 flex-fill"><span><h3>Roles</h3><p>{user.roles}</p></span></div>
        </div>
        <div className="d-flex flex-column flex-fill">
          <div className="p-2 flex-fill"><span><h3>Created On</h3><p>{user.createdOn}</p></span></div>
          <div className="p-2 flex-fill"><span><h3>Last Update</h3><p>{user.lastUpdate}</p></span></div>
        </div>
    </div>
    <div className="d-flex bg-secondary text-white rounded-bottom">
    <div className="d-flex flex-column flex-fill">
    <div className="p-2 flex-fill"><span><h3>Bug Comments</h3><p>{user.bugComments}</p></span></div>
    </div>
    <div className="d-flex flex-column align-self-center flex-fill p-5"><button type="submit" id='btnSubmit' className="btn btn-dark btn-lg btn-block">Edit User</button></div>
    </div>
    </div>
  )
}

export default UserSummary;