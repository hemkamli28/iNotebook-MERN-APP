import noteContext from './noteContext';
import { useState} from 'react';
const NoteState = (props) =>{
  const host = 'http://localhost:5000'
   const initialNotes = []
   const [notes, setNotes] = useState(initialNotes)

    //get all notes
  
    const getNotes = async () =>{
      const response = await fetch(`${host}/api/notes/getallnotes`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json = await response.json();
      console.log(json);
      setNotes(json)
    }

   //add notes 
    const addNote = async (title, description, tag) =>{
      // eslint-disable-next-line
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}) 
      });
      const note =  await response.json();
      setNotes(notes.concat(note));
    }
    const deleteNote = async (id) =>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json = await response.json();
      console.log(json);
      console.log('deleting node '+id);
      const newNotes =  notes.filter((note)=>{return note._id!==id;})
      setNotes(newNotes);

      
    }
    const editNote = async (id, title, description, tag) =>{
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}) 
      });
      const json =  await response.json();
      console.log(json);
     
      let newNote = JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNote.length; index++) {
        const element = newNote[index];
        if(element._id === id ){
          newNote[index].title = title;
          newNote[index].description = description;
          newNote[index].tag = tag;
          break;
        }
        console.log(id)
        console.log(element._id)
      }
      setNotes(newNote);
 
    }

    return (
        <noteContext.Provider value={{notes, getNotes, editNote, addNote, deleteNote,}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;