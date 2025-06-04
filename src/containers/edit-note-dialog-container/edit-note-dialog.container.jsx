import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import noteService from '../../services/note.service'

const EditNoteDialog = (props) => {
  const {
    isOpen,
    defaultNote,
    onClose,
    onSuccess,
  } = props

  const [note, setNote] = useState(defaultNote)

  const onSubmit = async () => {
    const updatedNote = await noteService.updateNote(
      defaultNote.id,
      {
        title: note.title,
        content: note.content,
      },
    )

    onSuccess(defaultNote.id, updatedNote)
  }

  const onTitleChange = (e) => {
    setNote((prev) => ({
      ...prev,
      title: e.target.value,
    }))
  }

  const onContentChange = (e) => {
    setNote((prev) => ({
      ...prev,
      content: e.target.value,
    }))
  }

  const formIsValid = note.title.length > 0 && note.content.length > 0

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>
        Update the note
      </DialogTitle>

      <DialogContent sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <TextField
          sx={{
            width: '300px',
            mt: 1,
            mb: 2,
          }}
          label='Title *'
          placeholder='Enter title'
          onChange={onTitleChange}
          value={note.title}
        />
        <TextField
          sx={{
            width: '300px',
            mb: 2,
          }}
          label='Content *'
          la
          placeholder='Enter content'
          multiline
          onChange={onContentChange}
          value={note.content}
        />
      </DialogContent>

      <DialogActions sx={{
        p: 3,
        pt: 0,
      }}>
        <Button
          variant='contained'
          onClick={onSubmit}
          disabled={!formIsValid}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditNoteDialog
