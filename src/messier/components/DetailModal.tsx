import {
  AppBar,
  Button,
  Dialog,
  Fade,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import { MessierObject } from '../types/MessierObject'
import CloseIcon from '@mui/icons-material/Close'
import { MessierCard } from './MessierCard'

interface DetailModalProps {
  object: MessierObject
  onClose: Function
  title: string
}

const style = {
  position: 'absolute' as 'absolute',
  top: '30px',
  left: '30px',
  width: 'calc(100vw - 120px)',
  height: 'calc(100vh - 120px)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

export const DetailModal = ({ title, object, onClose }: DetailModalProps) => (
  <Dialog fullScreen open={true} onClose={() => onClose()}>
    <AppBar sx={{ position: 'relative' }}>
      <Toolbar>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          {title}
        </Typography>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => onClose()}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>

    <div className="messier-detail">
      <MessierCard object={object} readOnly={true} />
    </div>
  </Dialog>
)
