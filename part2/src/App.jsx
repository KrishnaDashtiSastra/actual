import { useState, useEffect } from 'react'
import './App.css'
import Note from './components/Note' 
import noteService from './services/notes.js'



const App = () => {
  const [notes,setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  useEffect( () => {
    noteService.getAll().then(intialNotes => {
      setNotes(intialNotes)
    })
  },[])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
  }


  const addNote = (event) => {
    console.log('addNote working')
    event.preventDefault()
    const noteobj = {
      content: newNote,
      id: String(notes.length+1),
      important: Math.random() > 0.5,
    }
    
    noteService.create(noteobj).then(returnedNote=>{
      console.log(returnedNote)
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <>
      <Note notes={notes} toggleImportanceOf={toggleImportanceOf}/>
      <form onSubmit={addNote}>
        <input 
          value= {newNote}
          placeholder='Add a new Note'
          onChange={handleNoteChange}
        />
        <button type='submit'>save</button>
      </form>
    </>
    
  )
}
export default App
