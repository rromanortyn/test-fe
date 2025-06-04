import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'

import AddNoteFormContainer from '../add-note-form-container/add-note-form.container'
import noteService from '../../services/note.service'
import NotesList from '../../components/notes-list/notes-list'
import ConfirmDialog from '../../components/confirm-dialog/confirm-dialog'

const AppContainer = () => {
  const [notes, setNotes] = useState([])
  const [confirmDialogProps, setConfirmDialogProps] = useState({
    isOpen: false,
  })

  const loadNodes = async () => {
    const notesFromBE = await noteService.getNotes()

    setNotes(notesFromBE)
  }

  useEffect(() => {
    loadNodes()
  }, [])

  const onNewNoteAdded = (newNote) => {
    setNotes((prev) => [
      newNote,
      ...prev,
    ])
  }

  const onEditNote = (note) => {
    console.log(`preparing to edit note ${note.id}`)
  }

  const openConfirmDialog = (props) => {
    const {
      title,
      description,
      onClose,
      onCancel,
      onConfirm,
    } = props

    setConfirmDialogProps({
      isOpen: true,
      title,
      description,
      onClose,
      onCancel,
      onConfirm,
    })
  }

  const closeConfirmDialog = () => {
    setConfirmDialogProps({
      isOpen: false,
    })
  }

  const cancelConfirmDialog = () => {
    setConfirmDialogProps({
      isOpen: false,
    })
  }

  const onDeleteNote = (id) => {
    openConfirmDialog({
      title: 'Delete the note?',
      description: 'You are about to delete the note. Do you want to continue?',
      onCancel: cancelConfirmDialog,
      onClose: closeConfirmDialog,
      onConfirm: async () => {
        await noteService.deleteNote(id)

        closeConfirmDialog()

        setNotes((prev) => prev.filter((note) => note.id !== id))
      },
    })
  }

  return (
    <Container>
      <AddNoteFormContainer onNewNoteAdded={onNewNoteAdded} />
      
      <NotesList
        items={notes}
        onEditItem={onEditNote}
        onDeleteItem={onDeleteNote}
      />

      <ConfirmDialog
        isOpen={confirmDialogProps.isOpen}
        title={confirmDialogProps.title}
        description={confirmDialogProps.description}
        onClose={confirmDialogProps.onClose}
        onCancel={confirmDialogProps.onCancel}
        onConfirm={confirmDialogProps.onConfirm}
      />
    </Container>
  )
}

export default AppContainer
