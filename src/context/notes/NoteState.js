import React, { useState } from "react";
import NoteContext from "./noteContext";
import { json } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const noteInitial = []
  const [notes, setNotes] = useState(noteInitial)
  //Get all notes

  const getNote = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYjJiMWNkYjI2MTE0ZDBiYTZlZDZjIn0sImlhdCI6MTY5MzE0NzU3NX0.SZw3J6chFP6xXhJ4TdoTD3k5M1TBFiPK36HP3erGRCE"
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }


  //Add Note

  const addNote = async (title, description, tag, id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYjJiMWNkYjI2MTE0ZDBiYTZlZDZjIn0sImlhdCI6MTY5MzE0NzU3NX0.SZw3J6chFP6xXhJ4TdoTD3k5M1TBFiPK36HP3erGRCE"
      },
      body: JSON.stringify({ title, description, tag })
    });
    //Todo API Call
    console.log("Adding a new Note")
    const note = {
      "_id": "64ede2a2081b91af0da7aaf32",
      "user": "64eb2b1cdb26114d0ba6ed6c",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-08-29T12:20:50.109Z",
      "__v": 0
    };
    setNotes(notes.concat(note));

  }


  //Delete Note

  const deleteNote = (id) => {
    console.log("Deleting a note with id" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


  //Edit Note

  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYjJiMWNkYjI2MTE0ZDBiYTZlZDZjIn0sImlhdCI6MTY5MzE0NzU3NX0.SZw3J6chFP6xXhJ4TdoTD3k5M1TBFiPK36HP3erGRCE"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();



    //Logic to edit in client 
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;

      }

    }

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;
