import { useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

const SearchField = (props) => {
  const {
    value,
    onChange,
  } = props

  const inputRef = useRef()

  const onIconClick = () => {
    inputRef.current.focus()
  }

  const onKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        inputRef.current.blur()

        break
      
      default:
        break
    }
  }

  return (
    <FormControl sx={{ width: '300px' }} variant='outlined'>
      <OutlinedInput
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        inputRef={inputRef}
        placeholder='Search by title...'
        endAdornment={
          <InputAdornment position='end'>
            <SearchIcon onClick={onIconClick} />      
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default SearchField
