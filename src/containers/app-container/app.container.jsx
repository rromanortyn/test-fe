import {
  useEffect,
  useState,
  useMemo,
} from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { useDebounce } from 'use-debounce'

import AddNoteFormContainer from '../add-note-form-container/add-note-form.container'
import noteService from '../../services/note.service'
import NotesList from '../../components/notes-list/notes-list'
import ConfirmDialog from '../../components/confirm-dialog/confirm-dialog'
import EditNoteDialogContainer from '../edit-note-dialog-container/edit-note-dialog.container'
import SearchField from '../../components/search-field/search-field'

const AppContainer = () => {
  const [notes, setNotes] = useState([])
  const [confirmDialogProps, setConfirmDialogProps] = useState({
    isOpen: false,
  })
  const [selectedNote, setSelectedNote] = useState(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery] = useDebounce(searchQuery, 400)

  const [isLoadingNotes, setIsLoadingNotes] = useState(true)

  const loadNotes = async () => {
    setIsLoadingNotes(true)

    const notesFromBE = await noteService.getNotes()

    setNotes(notesFromBE)
    setIsLoadingNotes(false)
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

  const onSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const searchNotes = async () => {
    setIsLoadingNotes(true)

    const notes = await noteService.searchNotes(debouncedSearchQuery)

    setNotes(notes)
    setIsLoadingNotes(false)
  }

  useEffect(() => {
    if (debouncedSearchQuery.length > 0) {
      searchNotes()
    }

    else {
      loadNotes()
    }
  }, [debouncedSearchQuery])

  const editNoteDialogContainerJSX = selectedNote === null ? null : (
    <EditNoteDialogContainer
      isOpen={true}
      defaultNote={selectedNote}
      onClose={onEditNoteDialogClose}
      onSuccess={onEditNoteSuccess}
    />
  )

  const listContentJSX = useMemo(() => {
    if (notes.length > 0 && !isLoadingNotes) {
      return (
        <NotesList
          items={notes}
          onEditItem={onEditNote}
          onDeleteItem={onDeleteNote}
          searchQuery={debouncedSearchQuery}
        />
      )
    }
    
    if (notes.length === 0 && !isLoadingNotes) {
      return (
        <Typography variant='h3'>
          Nothing was found
        </Typography>
      )
    }

    if (isLoadingNotes) {
      return (
        <CircularProgress />
      )
    }
  }, [isLoadingNotes, notes])

  return (
    <Container>
      <SearchField
        value={searchQuery}
        onChange={onSearch}
      />

      <AddNoteFormContainer onNewNoteAdded={onNewNoteAdded} />
      
      {listContentJSX}

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
