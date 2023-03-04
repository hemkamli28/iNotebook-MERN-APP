import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext, useEffect, useState ,useRef} from 'react';
import Noteitem from './Noteitem';
import noteimg from '../images/addnote.svg'
import { useNavigate, Link } from 'react-router-dom';


const Notes = (props) => {
  const {showAlert} = props;

  const context  = useContext(noteContext);
  const navigate = useNavigate();
  const {notes, getNotes, editNote} = context;
    useEffect(() => {

        if (localStorage.getItem('token')!== null){
          getNotes();
         }
        else{
          navigate('/login');
        }
    }, [])
    
    const ref = useRef(null);
    const refClose = useRef(null);
        
      const [note, setNote] = useState({
        id: "",
        etitle: "", 
        edescription: "",
        etag: ""
      })

        const handleClick = (e) =>{
          editNote(note.id, note.etitle, note.edescription, note.etag);
          refClose.current.click();
        //  e.preventDefault();
            props.showAlert("success","Note Updated Successfully");
        }
        const onChange = (e) =>{
            setNote({...note, [e.target.name]: e.target.value})
        }

       const updateNote = (currentNote) =>{
         ref.current.click();
         setNote({
          id: currentNote._id,
          etitle:currentNote.title,
          edescription: currentNote.description,
          etag: currentNote.tag
        })
       }

return (
  <>
  {/* <AddNote showAlert={props.showAlert} /> */}
      <button hidden type="button" className="btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Launch
    </button>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-body">
              <div className="modal-title fs-5" id="staticBackdropLabel">
              <h1>Edit Note</h1>
              </div>
              <form className='addnote-form '>
              <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Tittle</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Description</label>
                  <textarea rows={3} type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange}/>
                </div>
                
                <div className="edit-btn">
              <Link ref={refClose} id="close" type="button" className="btn btn-secondary mx-3" data-bs-dismiss="modal">Close</Link>
              <Link disabled={note.etitle.length<4 || note.edescription.length<5}type="button" className="btn btn-warning" onClick={handleClick}>Save Changes</Link>

                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
        <div className="mynotes row my-2">
            <h2>Your Notes</h2>
            
            {notes.length === 0 &&
            <div className="notes-img">
              <p>Create Your First Note...!</p>
              <img src={noteimg} alt="" />  
            </div>
            }
             {notes.map((note)=>{
                return <Noteitem key={note._id} note={note} showAlert={showAlert} updateNote={updateNote}/>
                })
            }
      </div>
  </>  
  )
}

export default Notes