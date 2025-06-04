import Box from '@mui/material/Box'

import Note from './components/note/note'

const NotesList = (props) => {
  const {
    items,
    onEditItem,
    onDeleteItem,
  } = props

  const itemsJSX = items.map((item) => (
    <Note
      key={item.id}
      title={item.title}
      content={item.content}
      onEdit={() => onEditItem(item)}
      onDelete={() => onDeleteItem(item.id)}
    />
  ))

  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
    }}>
      {itemsJSX}
    </Box>
  )
}

export default NotesList
