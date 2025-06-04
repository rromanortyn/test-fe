import Typography from '@mui/material/Typography'

const NoteTitle = (props) => {
  const {
    title,
    searchQuery,
  } = props

  const defaultWordJSX = (
    <Typography
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
    return defaultWordJSX
  }

  const titleWords = title
      .split(' ')
  
    const titleWordsThatEqualToQuery = titleWords
      .find((word) => word === searchQuery)
  
    const updatedTitleWordsJSX = titleWords
      .map(
        (word) => titleWordsThatEqualToQuery.includes(word) ? (
          <Typography
            sx={{
              display: 'inline-block',
              backgroundColor: '#024014',
              color: '#f3f3f3',
            }}
          >
            {word}
          </Typography>
        ) : (
          <Typography
            sx={{
              display: 'inline-block',
              backgroundColor: 'transparent',
              color: '#090909',
            }}
          >
            {word}
          </Typography>
        ),
      )

  const spacedTitle = updatedTitleWordsJSX.flatMap((word, index) => {
    if (index === updatedTitleWordsJSX.length - 1) {
      return [word]
    }

    return [word, <Typography component='span' key={index}>{' '}</Typography>]
  })

  return spacedTitle
}

export default NoteTitle
