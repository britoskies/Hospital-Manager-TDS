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
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormLabel,
  FormControlLabel, 
  Switch
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  dateOfBirth: string
  identification: string
  nationality: string
  address: string
  phone: string
  gender: string
  status: boolean
  setDoB: React.Dispatch<React.SetStateAction<string>>
  setIdentification: React.Dispatch<React.SetStateAction<string>>
  setNationality: React.Dispatch<React.SetStateAction<string>>
  setAddress: React.Dispatch<React.SetStateAction<string>>
  setPhone: React.Dispatch<React.SetStateAction<string>>
  setGender: React.Dispatch<React.SetStateAction<string>>
  setStatus: React.Dispatch<React.SetStateAction<boolean>>
};

function DetailsPanelDialog({
  onClose, open, dateOfBirth, identification, address, phone, gender, nationality, status,
  setDoB, setNationality, setIdentification, setAddress, setPhone, setGender, setStatus }: Props) {

  let { id } = useParams();

  const handleClose = () => {
    setDoB(dateOfBirth);
    setIdentification(identification);
    setNationality(identification);
    setAddress(address);
    setPhone(phone);
    setGender(gender);
    setStatus(status);
    return onClose();
  }

  const handleAccept = () => {
    if (dateOfBirth || identification || address || phone || gender || nationality || status) {
      save();
      return handleClose();
    }
  };

  const save = async () => {
    const newDetails = {
      born_date: new Date(new Date(dateOfBirth).getTime() + 86400000),
      identification,
      nationality,
      address,
      phoneNumber: phone,
      gender,
      active_status: status
    }

    await Patients.updateById(`${id}`, newDetails);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Detalles</DialogTitle>
      <DialogContent>
        <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3, mt: 3 }} fullWidth>
          <FormControl sx={{ mb: 3 }} fullWidth>
            <TextField
              id="born-date"
              label="Fecha de Nacimiento"
              variant="outlined"
              type="date"
              defaultValue={dateOfBirth}
              onChange={(e) => setDoB(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </FormControl>
          <FormControl sx={{ mb: 3 }} fullWidth>
            <TextField
              id="identification"
              label="Número de Identificación"
              variant="outlined"
              type="text"
              defaultValue={identification}
              onChange={(e) => setIdentification(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </FormControl>
          <FormControl sx={{ mb: 3 }} fullWidth>
            <TextField
              id="nationality"
              label="Nacionalidad"
              variant="outlined"
              type="text"
              defaultValue={nationality}
              onChange={(e) => setNationality(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </FormControl>
          <FormControl sx={{ mb: 3 }} fullWidth>
            <TextField
              id="address"
              label="Dirección"
              variant="outlined"
              type="text"
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </FormControl>
          <FormControl sx={{ mb: 3 }} fullWidth>
            <TextField
              id="phone-number"
              label="Teléfono"
              variant="outlined"
              type="text"
              multiline
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </FormControl>
          <FormControl sx={{ mb: 3 }} fullWidth>
            <InputLabel id="gender-label"> Género </InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              defaultValue={gender}
              label="Género"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="M">Masculino</MenuItem>
              <MenuItem value="F">Femenino</MenuItem>
            </Select>
          </FormControl>
        </FormControl>
        <FormGroup>
          <FormLabel>Estado</FormLabel>
          <FormControlLabel
            sx={{ mb: 3 }}
            control={<Switch checked={status} onChange={(e) => setStatus(e.target.checked)} />}
            label={status ? "Activo" : "Inactivo"}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={handleAccept}
          disabled={!(dateOfBirth && identification && address && phone && gender)}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DetailsPanelDialog;
