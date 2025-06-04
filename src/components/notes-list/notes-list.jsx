import Masonry from '@mui/lab/Masonry'

import Note from './components/note/note'

const NotesList = (props) => {
  const {
    items,
    onEditItem,
    onDeleteItem,
    searchQuery,
  } = props

  const itemsJSX = items.map((item) => (
    <Note
      key={item.id}
      title={item.title}
      content={item.content}
      onEdit={() => onEditItem(item)}
      onDelete={() => onDeleteItem(item.id)}
      searchQuery={searchQuery}
    />
  ))

  return (
    <Masonry
      columns={{
        xs: 1,
        sm: 2,
        md: 3,
      }}
      spacing={2}
    >
      {itemsJSX}
    </Masonry>
  )
}

export default NotesList
