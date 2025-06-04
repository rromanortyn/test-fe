import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'

import AddNoteFormContainer from '../add-note-form-container/add-note-form.container'
import noteService from '../../services/note.service'
import NotesList from '../../components/notes-list/notes-list'
import ConfirmDialog from '../../components/confirm-dialog/confirm-dialog'
import EditNoteDialogContainer from '../edit-note-dialog-container/edit-note-dialog.container'

const AppContainer = () => {
  const [notes, setNotes] = useState([])
  const [confirmDialogProps, setConfirmDialogProps] = useState({
    isOpen: false,
  })
  const [selectedNote, setSelectedNote] = useState(null)

  const loadNotes = async () => {
    const notesFromBE = await noteService.getNotes()

    setNotes(notesFromBE)
  }

  useEffect(() => {
    loadNotes()
  }, [])

  const onNewNoteAdded = (newNote) => {
    setNotes((prev) => [
      newNote,
      ...prev,
    ])
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

  const onEditNote = (note) => {
    setSelectedNote(note)
  }

  const onEditNoteDialogClose = () => {
    setSelectedNote(null)
  }

  const onEditNoteSuccess = (id, updatedNote) => {
    setSelectedNote(null)

    setNotes((prev) => prev.map((note) => note.id === id ? updatedNote : note))
  }

  const editNoteDialogContainerJSX = selectedNote === null ? null : (
    <EditNoteDialogContainer
      isOpen={true}
      defaultNote={selectedNote}
      onClose={onEditNoteDialogClose}
      onSuccess={onEditNoteSuccess}
    />
  )

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

      {editNoteDialogContainerJSX}
    </Container>
  )
}

export default AppContainer
