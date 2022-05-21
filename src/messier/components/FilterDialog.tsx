import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { useState } from 'react'
import { useMessierContext } from '../hooks/useMessierContext'

interface FilterDialogProps {
  onClose: () => void
  open: boolean
}

export const FilterDialog = ({ onClose, open }: FilterDialogProps) => {
  const ctx = useMessierContext()
  const [filter, setFilter] = useState<string>(ctx.filter);
  const handleClose = () => onClose()
  const handleChange = (e: SelectChangeEvent<string>) => {
      setFilter(e.target.value);
  }

  const handeApply = () => {
    ctx.changeFilter(filter)
    onClose();   
  }

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle>Trie</DialogTitle>
      <DialogContent>
        <Box padding={1}>
          <FormControl fullWidth>
            <InputLabel id="messier-simple-select-label">
              Critères du trie
            </InputLabel>
            <Select
              labelId="messier-simple-select-label"
              value={filter}
              label="Critères de Trie"
              onChange={handleChange}
            >
              <MenuItem value={'DEFAULT'}>Dans l'ordre naturel</MenuItem>
              <MenuItem value={'MAGNITUDE'}>Par Magnitude</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handeApply}>Appliquer</Button>
      </DialogActions>
    </Dialog>
  )
}
