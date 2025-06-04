import Typography from '@mui/material/Typography'

import escapeRegExp from '../../../../utils/escape-reg-exp'

const NoteTitle = (props) => {
  const {
    title,
    searchQuery,
  } = props

  const defaultTitleJSX = (
    <Typography
      variant='h5'
      sx={{
        display: 'inline-block',
        backgroundColor: 'transparent',
        color: '#090909',
      }}
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
        sx={{
          display: 'inline-block',
          backgroundColor: '#024014',
          color: '#f3f3f3',
        }}
      >
        {part}
      </Typography>
    )
    :
    (
      <Typography
        sx={{
          display: 'inline-block',
          backgroundColor: 'transparent',
          color: '#090909',
        }}
      >
        {part}
      </Typography>
    )
  )

  return titleJSX
}

export default NoteTitle
