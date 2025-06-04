import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

import noteService from '../../services/note.service'

const AddNoteDialogContainer = (props) => {
  const {
    isOpen,
    onCancel,
    onClose,
    onSubmit,
  } = props

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const onContentChange = (e) => {
    setContent(e.target.value)
  }

  const _onSubmit = async () => {
    const dataToSend = {
      title,
      content,
    }

    setIsLoading(true)

    const newNote = await noteService.addNote(dataToSend)

    onSubmit(newNote)

    setIsLoading(false)
    setTitle('')
    setContent('')
  }

  const submitButtonText = isLoading ? 'Sending...' : 'Submit'

  const formIsValid = title.length > 0 && content.length > 0

  const formJSX = (
    <Box sx={{
      pt: 1,
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
        label={'Title *'}
        placeholder='Enter title'
        value={title}
        onChange={onTitleChange}
      />
      <TextField
        sx={{
          width: '300px',
          mb: 2,
        }}
        label='Content *'
        placeholder='Enter content'
        multiline
        value={content}
        onChange={onContentChange}
      />
    </Box>
  )

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>Add a new note</DialogTitle>
      <DialogContent>
        {formJSX}
      </DialogContent>

      <DialogActions sx={{
        p: 3,
        pt: 0,
      }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          variant='contained'
          onClick={_onSubmit}
          disabled={isLoading || !formIsValid}
        >
          {submitButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddNoteDialogContainer
