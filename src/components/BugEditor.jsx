import axios from "axios";
import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import _, { forEach } from "lodash";
import { CommentItem } from './CommentItem';


function BugEditor({auth, showSuccess, showError}) {

  const [newComment, setNewComment] = useState("")
  const [users,setUsers] = useState(null)

  const {bugId} = useParams()
  const navigate = useNavigate()

  const [bug, setBug] = useState({title:'',description:'',stepsToReproduce:'',classification:''});

  useEffect(()=>{
    axios(`${process.env.REACT_APP_API_URL}/api/bugs/${bugId}`,{
      method:'get',
      headers:{authorization: `Bearer ${auth?.token}`}
    }).then((res) => {
      setBug(res.data)
    }).catch((err) =>{
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

    axios(`${process.env.REACT_APP_API_URL}/api/users/list`, {
      headers: { authorization: `Bearer ${auth?.token}` },
    })
      .then((res) => {
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
  },[bugId,auth])

  const initialBugClassification = bug?.classification || 'nothing'

  function editTitle(evt){
    const newTitle = evt.target.value;
    setBug((prevBug) => ({
      ...prevBug,
      title:newTitle
    }))
  }
  function editDescription(evt){
    const newDescription = evt.target.value;
    setBug((prevBug) => ({
      ...prevBug,
      description:newDescription
    }))
  }
  function editStepsToReproduce(evt){
    const newStepsToReproduce = evt.target.value;
    setBug((prevBug) => ({
      ...prevBug,
      stepsToReproduce:newStepsToReproduce
    }))
  }
  function editClassification(evt){

    const newClassification = evt.target.value;
    setBug((prevBug) => ({
      ...prevBug,
      classification:newClassification
    }))
  }
  function editAssignTo(evt) {
  //   console.table(bug)
  //   console.table(users)
  //   const newAssignedTo = evt.target.value;
  //   let newAssignedToUser = {};
  //   users.forEach((user)=>{
  //     if (user.fullName === newAssignedTo) {
  //       newAssignedToUser.fullName = user.fullName;
  //       newAssignedToUser._id = user._id;
  //       newAssignedToUser.role = user.role;
  //     }
  //   });
  //   console.table(newAssignedToUser)
  //   setBug((prevBug)=> ({
  //     ...prevBug,
  //     assignedTo: {
  //       fullName: newAssignedToUser.fullName,
  //       _id: newAssignedToUser._id,
  //       role: newAssignedToUser.role
  //     }
  //   }))
  }
  const onUpdateBug = async evt => {
    evt.preventDefault();

    try{
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/bugs/${bugId}`,{
      title:bug.title,
      stepsToReproduce: bug.stepsToReproduce,
      description: bug.description,
      classification: bug.classification,
      // assignedTo:bug.assignedTo
    },{headers:{authorization: `Bearer ${auth?.token}`}})
    navigate('/bug/list')
    showSuccess('Bug Saved')
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

  const onAddComment = async evt => {

    try{
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/bugs/${bugId}/comment/new`,{
        comment: newComment,
      },{headers:{authorization: `Bearer ${auth?.token}`}})
      showSuccess('Comment Added')
      navigate(`/bug/${bug._id}`)
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
         <h1>Bug Id: {bugId} </h1>
         <br/>
          <form>
          <div className="form-group row my-3 mx-1">
            <h5>Current Title: <span className="fw-normal">{bug.title}</span></h5>
            <label htmlFor="titleInput" className="col-sm-2 col-form-label fw-semibold">New Title</label>
            <div className="col-sm-10">
              <input type="text" id="titleInput" className="form-control" placeholder="title" onChange={(evt) => editTitle(evt)} value={bug?.title}/>
            </div>
          </div>
          <div className="form-group row my-3 mx-1">
            <h5>Current Description: <span className="fw-normal">{bug.description}</span></h5>
            <label htmlFor="descriptionInput" className="col-sm-2 col-form-label fw-semibold">New Description</label>
            <div className="col-sm-10">
              <input type="text" id="descriptionInput" className="form-control" placeholder="description" onChange={(evt) => editDescription(evt)} value={bug?.description}/>
            </div>
          </div>
          <div className="form-group row my-3 mx-1">
            <h5>Current Steps To Reproduce: <span className="fw-normal">{bug.stepsToReproduce}</span></h5>
            <label htmlFor="stepsToReproduceInput" className="col-sm-2 col-form-label fw-semibold">New Steps To Reproduce</label>
            <div className="col-sm-10">
              <input type="text" id="stepsToReproduceInput" className="form-control" placeholder="stepsToReproduce" onChange={(evt) => editStepsToReproduce(evt)} value={bug?.stepsToReproduce}/>
            </div>
          </div>
          <div className="form-group row my-3 mx-1">
          <h5>Current Classification: <span className="fw-normal">{bug.classification}</span></h5>
            <label htmlFor="classificationInput" className="col-sm-2 col-form-label fw-semibold">New Classification</label>
            <div className="col-sm-10">
              <select value={initialBugClassification} className="form-select" aria-label="Default select example" onChange={(evt) => editClassification(evt)}>
                <option value="approved">Approved</option>
                <option value="unapproved">Unapproved</option>
                <option value="duplicate">Duplicate</option>
                <option value="unclassified">Unclassified</option>
              </select>
            </div>
          </div>
          <div className="form-group row my-3 mx-1">
            <h5>Assign A User:</h5>
            <label htmlFor="assignTxt" className="col-sm-2 col-form-label fw-semibold">Assign User</label>
            <div className="col-sm-10">
              <select value={bug?.assignedTo?.fullName} className="form-select" aria-label="Default select example" onChange={(evt)=>editAssignTo(evt)}>
              {_.map(users, (user,index)=> (
                <option value={user?.fullName} key={user._id}>
                  {user.fullName}
                </option>
              ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-dark btn-lg btn-block" value='updateBug' onClick={(evt) => onUpdateBug(evt)}>Update Bug</button>
          </form>
          <div className="py-5">
            <h3>Comments</h3>
            <div className="row">
           {bug.userComments && _.map(bug.userComments, (comment, index) => (
                            <CommentItem comment={comment} auth={auth} key={bug.userComments._id} index={index}/>
                            ))}
            </div>
          <form>
          <div className="form-group row my-3 mx-1">
            <label htmlFor="commentTxt" className="col-sm-2 col-form-label fw-semibold">Add A Comment</label>
            <div className="col-sm-10">
              <input type="text" id="commentTxt" className="form-control" placeholder="Your comment" onChange={(evt) => setNewComment(evt.currentTarget.value)} value={newComment}/>
            </div>
          </div>
          <div className="ps-3">
           <button type="submit" className="btn btn-dark btn-sm btn-block" value='addComment' onClick={(evt) => onAddComment(evt)}>Add Comment</button> 
           </div>
           </form>
          </div>
      </div>

  )
}

export default BugEditor;