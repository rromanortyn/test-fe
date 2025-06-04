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
      borderWidth: 1,
      borderColor: '#090909',
      borderStyle: 'solid',
      borderRadius: 3,
      p: 1,
      height: 'fit-content',
      width: '300px',
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

      {
        content
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
      }

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
