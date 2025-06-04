import Typography from '@mui/material/Typography'

import escapeRegExp from '../../../../utils/escape-reg-exp'

import styles from './note-title.styles'

const NoteTitle = (props) => {
  const {
    title,
    searchQuery,
  } = props

  const defaultTitleJSX = (
    <Typography
      variant='h5'
      sx={styles.notHighlightedPart}
    >
      {title}
    </Typography>
  )

  if (searchQuery.length === 0) {
    return defaultTitleJSX
  }

  const regex = new RegExp(`(${escapeRegExp(searchQuery)})`, 'ig')
  const parts = title.split(regex)

  const titleJSX = parts.map((part) => 
    regex.test(part) ? 
    (
      <Typography
        sx={styles.highlightedPart}
      >
        {part}
      </Typography>
    )
    :
    (
      <Typography
        sx={styles.notHighlightedPart}
      >
        {part}
      </Typography>
    )
  )

  return titleJSX
}

export default NoteTitle
