
function BugSummary(props) {

  const bug = {
              _id:"123456789",
              title : "My page isn't loading",
              description : "Can get to this page",
              steps:"Boot up server and fail to connect",
              author:"Chad",
              assignedTo:'Chad',
              closed:"false",
              classification:"Not Real",
              comments:"comments"
              }

  return (
    <div className='container'>
      <h1>Bug Id: {bug._id}</h1>
      <div className="d-flex p-3 bg-secondary text-white rounded-top">
        <div className="d-flex flex-column flex-fill">
          <div className="p-2 flex-fill"><span><h3>Title</h3><p>{bug.title}</p></span></div>
          <div className="p-2 flex-fill"><span><h3>Description</h3><p>{bug.description}</p></span></div>
          <div className="p-2 flex-fill"><span><h3>Steps to reproduce</h3><p>{bug.steps}</p></span></div>
        </div>
        <div className="d-flex flex-column flex-fill">
          <div className="p-2 flex-fill"><span><h3>Author</h3><p>{bug.author}</p></span></div>
          <div className="p-2 flex-fill"><span><h3>Assigned To</h3><p>{bug.assignedTo}</p></span></div>
          <div className="p-2 flex-fill"><span><h3>Closed State</h3><p>{bug.closed}</p></span></div>
        </div>
        <div className="d-flex flex-column flex-fill">
          <div className="p-2 flex-fill"><span><h3>classification</h3><p>{bug.classification}</p></span></div>
          <div className="p-2 flex-fill"><span><h3>Created On</h3><p>{bug.createdOn}</p></span></div>
          <div className="p-2 flex-fill"><span><h3>Last Update</h3><p>{bug.lastUpdate}</p></span></div>
        </div>
    </div>
    <div className="d-flex bg-secondary text-white rounded-bottom">
    <div className="d-flex flex-column flex-fill">
    <div className="d-flex p-3 flex-row flex-fill"><span><h3>Comments</h3><p>{bug.comments}</p></span></div>
    <div className="d-flex p-3 flex-row flex-fill"><span><h3>Test Cases</h3><p>{bug.testCases}</p></span></div>
    </div>
    <div className="d-flex flex-column align-self-center flex-fill p-5"><button type="submit" id='btnSubmit' className="btn btn-dark btn-lg btn-block">Edit Bug</button></div>
    </div>
    </div>
  )
}

export default BugSummary;