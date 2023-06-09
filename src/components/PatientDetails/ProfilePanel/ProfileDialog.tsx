import React from "react";
import { useParams } from "react-router-dom";

// Patients models
import Patients from '../../../models/patient/PatientModel';

// Mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";


type Props = {
  open: boolean;
  onClose: () => void;
};

function EditNotesDialog({ onClose, open }: Props) {

  let { id } = useParams()
  const [patients] = Patients.findById(`${id}`);
  const patientName = patients?.data()?.name;
  const [name, setName] = React.useState<string>(patientName);

  const handleClose = () => onClose();
  const handleCancel = () => handleClose();

  const handleAccept = () => {
    if (patientName) {
      save();
      return handleClose();
    }
  };

  const save = async () => {
    await Patients.updateById(`${id}`, { name });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Nombre del Paciente</DialogTitle>
      <DialogContent>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', gap: 1, mb: 3, mt: 3 }} fullWidth>
          <TextField
            id="note"
            label="New name"
            variant="outlined"
            type="text"
            defaultValue={patientName}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button
          onClick={handleAccept}
          disabled={!(name)}
        >
          guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditNotesDialog;
