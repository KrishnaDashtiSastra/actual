import { useState } from "react"

const Note = ({notes, toggleImportanceOf}) => {

    const [showAll, setShowAll] = useState(true)
    const notesToShow = showAll? notes : notes.filter(note => note.important === true)


    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={()=>setShowAll(!showAll)}>
                    show {showAll? 'Important' : 'All'}
                </button>
            </div>
            <ul>
                {
                    notesToShow.map(
                        note => <li key={note.id}> 
                            {note.content} 
                            <button onClick={() => toggleImportanceOf(note.id)}>
                                    {note.important ? 'Mark as not important' : 'Mark as important'}
                            </button>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
export default Note