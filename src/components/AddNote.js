import React, { useContext, useState, useEffect} from 'react';
import noteContext from '../context/notes/noteContext';
import { useNavigate, Link} from 'react-router-dom';
const AddNote = (props) => {
    const context  = useContext(noteContext);
    const {addNote} = context;
    const navigate = useNavigate()
    
    const [note, setNote] = useState({
      title: "", 
      description: "",
      tag: ""
     })
          
        const handleClick = (e) =>{
            e.preventDefault();
            addNote(note.title, note.description, note.tag);
            props.showAlert("success","Note Created Successfully")
            navigate('/')
        }
        const onChange = (e) =>{
            setNote({...note, [e.target.name]: e.target.value})
        }
        useEffect(() => {
          if (localStorage.getItem('token')) {
              console.log("yoooo")
          } else {
              navigate('/login')
              props.showAlert("danger", "You need to Login first")
          }
          // eslint-disable-next-line
      }, [])
  
  return (
      <>
        <div className="container addnote my-3">
        
          <div className="addnote-content">
          <h2>Add a new Note </h2>
              <form className="addnote-form">
              <div className="mb-3">
              <label htmlFor="title" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name='tag'  onChange={onChange}/>
              </div>
              <div className="mb-3">
              <label htmlFor="title" className="form-label">Tittle</label>
                <input type="text" className="form-control"  id="title" name='title' aria-describedby="emailHelp" onChange={onChange}/>
              </div>
              <div className="mb-3">
              <label htmlFor="title" className="form-label">Description</label>
                <textarea rows='3' type="text" className="form-control" id="description" name='description' onChange={onChange}/>
              </div>
              <div className="extra addbtn">
              <button disabled={note.title.length<4 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
              </div>
            </form>
          </div>
      </div>

    </>
  )
}
export default AddNote