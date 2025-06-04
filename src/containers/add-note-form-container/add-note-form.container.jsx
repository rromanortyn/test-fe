import { useState } from 'react'
import { Button, TextareaAutosize, TextField } from '@mui/material'
import noteService from '../../services/note.service'

const AddNoteFormContainer = (props) => {
  const { onNewNoteAdded } = props

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const onContentChange = (e) => {
    setContent(e.target.value)
  }

  const onSubmit = async () => {
    const dataToSend = {
      title,
      content,
    }

    setIsLoading(true)

    const newNote = await noteService.addNote(dataToSend)

    onNewNoteAdded(newNote)

    setIsLoading(false)
    setTitle('')
    setContent('')
  }

  const submitButtonText = isLoading ? 'Sending...' : 'Submit'

  return (
    <div>
      <TextField
        value={title}
        onChange={onTitleChange}
      />
      <TextareaAutosize
        value={content}
        onChange={onContentChange}
      />
      <Button
        onClick={onSubmit}
        disabled={isLoading}
      >
        {submitButtonText}
      </Button>
    </div>
  )
}

export default AddNoteFormContainer
