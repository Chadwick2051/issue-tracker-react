import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function ReportBug({auth, showError, showSuccess}){
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [stepsToReproduce, setStepsToReproduce] = useState("")

  const navigate = useNavigate()

  const titleError = !title ? 'Title can not be left blank' : ""
  const descriptionError = !description ? 'Description can not be left blank' : ""
  const stepsError = !stepsToReproduce ? 'Step To Reproduce can not be left blank' : ""
  
  const createNewBug = async (evt) => {
    evt.preventDefault();

    if (titleError) {
      showError(titleError);
      return;
    }
    if (descriptionError) {
      showError(descriptionError);
      return;
    }
    if (stepsError) {
      showError(stepsError);
      return;
    }
    if (title && description && stepsToReproduce) {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/bugs/new`,
          {
            title,
            description,
            stepsToReproduce,
          },{headers: {authorization: `Bearer ${auth?.token}`}});
        showSuccess(res.data.success)
        navigate('/bug/list')
      } catch (err) {
        console.log(err);
      }
    }
  };
  

  return(
    <>
    <form>
      <h2>New Bug Form</h2>
      <div className="mb-2">
        <label className="form-label" htmlFor='txtTitle'>Title: </label>
        <input type="text" className="form-control" id='txtTitle' value={title} onChange={(evt => setTitle(evt.target.value))}/>
      </div>
      <div className="mb-2">
        <label className="form-label" htmlFor='txtDescription'>Description: </label>
        <input type="text" className="form-control" id='txtDescription' value={description} onChange={(evt => setDescription(evt.target.value))}/>
      </div>
      <div className="mb-2">
        <label className="form-label" htmlFor='txtStepToReproduce'>Step To Reproduce: </label>
        <textarea type="text" className="form-control" id='txtStepToReproduce' rows="3" value={stepsToReproduce} onChange={(evt => setStepsToReproduce(evt.target.value))}/>
      </div>
      <div className="mb-2">
        <button type="submit" className="btn btn-secondary" onClick={(evt) => createNewBug(evt)}>Report New Bug</button>
      </div>
    </form>
    </>
  )
}