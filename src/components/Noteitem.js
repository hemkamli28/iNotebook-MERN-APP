import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
    const context  = useContext(noteContext);
    const {deleteNote} = context;
    const {note, updateNote} = props;
  return (
   <>
    <div className='col-md-3'>
        <div className="card my-3">
            <div className="card-body">
            <div className="title-icons">
            <div className="one">
                <h5 className="card-title">{note.title}</h5>
            </div>
                <div className="two">
        
                    <i className="ri-edit-2-fill ri-xl" onClick={()=>{updateNote(note);}}></i>
      
                    <i className="ri-delete-bin-5-fill ri-xl" onClick={()=>{deleteNote(note._id); props.showAlert("success","Note Deleted Successfully");}}></i>
                {/* <img src="https://img.icons8.com/windows/32/FA5252/trash.png" /> */}
                </div>
            </div>
                <p className="card-text">{note.description}</p>
               
            </div>
            </div>
    </div>
    </>
  )
}

export default Noteitem