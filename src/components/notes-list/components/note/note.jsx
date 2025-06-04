import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { formatDistance } from 'date-fns'

import NoteTitle from '../note-title/note-title'

import styles from './note.styles'

const Note = (props) => {
  const {
    title,
    content,
    updatedAt,
    onEdit,
    onDelete,
    searchQuery,
  } = props

  const updatedAtDistance = formatDistance(new Date(updatedAt), new Date(), { addSuffix: true })

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
    <Box sx={styles.container}>
      <Typography sx={styles.titleTypography}>
        <NoteTitle
          title={title}
          searchQuery={searchQuery}
        />
      </Typography>

      <Box sx={styles.line} />

      {linesJSX}

      <Box sx={styles.buttonsContainer}>
        <IconButton sx={styles.editButton} onClick={onEdit}>
          <EditIcon color='primary' />
        </IconButton>

        <IconButton onClick={onDelete}>
          <DeleteIcon color='error' />
        </IconButton>
      </Box>

      <Typography
        fontSize={12}
      >
        {`Last update was ${updatedAtDistance}`}
      </Typography>
    </Box>
  )
}

export default Note
