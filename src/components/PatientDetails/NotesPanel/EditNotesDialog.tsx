import React from "react";
import { useParams } from "react-router-dom";

// Patients models
import Patients from './../../../models/patient/PatientModel';

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
  const patientNotes = patients?.data()?.notes;
  const [note, setNote] = React.useState<string>(patientNotes);

  const handleClose = () => {
    setNote(patientNotes);
    return onClose();
  }

  const handleAccept = () => {
    if (note) {
      save();
      return handleClose();
    }
  };

  const save = async () => {
    await Patients.updateById(`${id}`, {notes: note});
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Notes</DialogTitle>
      <DialogContent>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', gap: 1, mb: 3, mt: 3 }} fullWidth>
          <TextField
            id="note"
            label="New note"
            variant="outlined"
            type="text"
            multiline
            defaultValue={patientNotes}
            onChange={(e) => setNote(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleAccept}
          disabled={!(note)}
        >
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditNotesDialog;
