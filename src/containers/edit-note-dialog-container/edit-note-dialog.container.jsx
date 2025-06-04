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

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>
        Update the note
      </DialogTitle>

      <DialogContent>
        <TextField
          sx={{ width: '300px' }}
          onChange={onTitleChange}
          value={note.title}
        />
        <TextField
          sx={{ width: '300px' }}
          multiline
          onChange={onContentChange}
          value={note.content}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onSubmit} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditNoteDialog
