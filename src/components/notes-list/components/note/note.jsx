import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import NoteTitle from '../note-title/note-title'

const Note = (props) => {
  const {
    title,
    content,
    onEdit,
    onDelete,
    searchQuery,
  } = props

  const linesJSX = content
    .split('\n')
    .map(
      (line) => (
        <Typography
          sx={{
            wordWrap: 'break-word',
          }}
        >
          {line}
        </Typography>
      ),
    )

  return (
    <Box sx={{
      borderWidth: 1,
      borderColor: '#090909',
      borderStyle: 'solid',
      borderRadius: 3,
      p: 1,
      height: 'fit-content',
      width: '300px',
    }}>
      <Typography variant='h4' sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: 'fit-content',
        
      }}>
        <NoteTitle
          title={title}
          searchQuery={searchQuery}
        />
      </Typography>

      <Box sx={{
        height: '10px',
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: '#090909',
        borderBottomStyle: 'solid',
        mb: '10px',
      }} />

      {linesJSX}

      <IconButton sx={{ mr: 2 }} onClick={onEdit}>
        <EditIcon />
      </IconButton>

      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}

export default Note
