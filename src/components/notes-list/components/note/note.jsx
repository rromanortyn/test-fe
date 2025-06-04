import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const Note = (props) => {
  const {
    title,
    content,
    onEdit,
    onDelete,
  } = props

  return (
    <Box sx={{
      width: '300px',
      mb: 2,
      borderWidth: 1,
      borderColor: '#090909',
      borderStyle: 'solid',
      borderRadius: 3,
      p: 1,
      mr: 2,
    }}>
      <Typography variant='h4' sx={{
        paddingBottom: 1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        borderBottomWidth: 1,
        borderBottomColor: '#090909',
        borderBottomStyle: 'solid',
      }}>{title}</Typography>
      <Typography sx={{
        paddingTop: 1,
        wordBreak: 'break-all',
        overflowWrap: 'break-word', 
      }}>{content}</Typography>

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
