import axios from "axios";
import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import _ from "lodash";


function BugEditor({auth, showSuccess, showError}) {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [stepsToReproduce, setStepsToReproduce] = useState("");
  // const [classification, setClassification] = useState("");

  const {bugId} = useParams()
  const navigate = useNavigate()

  const [bug, setBug] = useState({title:'',description:'',stepsToReproduce:'',classification:''});

  useEffect(()=>{
    axios(`${process.env.REACT_APP_API_URL}/api/bugs/${bugId}`,{
      method:'get',
      headers:{authorization: `Bearer ${auth?.token}`}
    }).then((res) => {
      setBug(res.data)
      console.log(bug)
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
  const onUpdateBug = async evt => {
    evt.preventDefault();

    try{
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/bugs/${bugId}`,{
      title:bug.title,
      stepsToReproduce: bug.stepsToReproduce,
      description: bug.description,
      classification: bug.classification
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
          <button type="submit" className="btn btn-dark btn-lg btn-block" value='updateBug' onClick={(evt) => onUpdateBug(evt)}>Update Bug</button>
          </form>
      </div>

  )
}

export default BugEditor;