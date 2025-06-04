import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

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

  const formIsValid = title.length > 0 && content.length > 0

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <TextField
        sx={{
          width: '300px',
          mb: 2,
        }}
        placeholder='Enter title'
        value={title}
        onChange={onTitleChange}
      />
      <TextField
        sx={{
          width: '300px',
          mb: 2,
        }}
        placeholder='Enter content'
        multiline
        value={content}
        onChange={onContentChange}
      />
      <Button
        sx={{
          mb: 4,
          width: '300px',
        }}
        variant='contained'
        onClick={onSubmit}
        disabled={isLoading || !formIsValid}
      >
        {submitButtonText}
      </Button>
    </Box>
  )
}

export default AddNoteFormContainer
