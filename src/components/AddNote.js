import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import { useState } from 'react'

const AddNote = () => {
    const context = useContext(noteContext)
    const [note, setNote] = useState({title: "", description: "", tag: "default"})
    const {addNote} = context;
    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div className='container my-4'>

        <h3>Add Note</h3>
        <form className='constainer my-4'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
  )
}

export default AddNote
