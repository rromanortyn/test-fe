import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

const ConfirmDialog = (props) => {
  const {
    isOpen,
    title,
    description,
    onClose,
    onCancel,
    onConfirm,
  } = props

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>
        {title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus>
          Yes, continue
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
