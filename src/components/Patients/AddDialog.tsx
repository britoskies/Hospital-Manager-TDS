import { useState } from "react";

// Patients models
import Patients from "../../models/patient/PatientModel";

// Mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  FormGroup,
} from "@mui/material";

import { Timestamp } from "firebase/firestore";

type Props = {
  open: boolean;
  onClose: () => void;
};

function AddDialog({ onClose, open }: Props) {

  const [status, setStatus] = useState(false);
  const [bornDate, setBornDate] = useState(new Date().toLocaleDateString("sv-SE"));
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("M");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [identification, setIdentification] = useState("");
  const [nationality, setNationality] = useState("");
  const [typeIdentification, setTypeIdentification] = useState("");

  const handleClose = () => {
    setStatus(false)
    setBornDate(new Date().toLocaleDateString("sv-SE"))
    setEmail("")
    setGender("M")
    setName("")
    setPhoneNumber("")
    setAddress("")
    setIdentification("")
    setNationality("")
    return onClose();
  };

  const handleCancel = () => {
    return handleClose();
  };

  const handleAccept = () => {
    if (
      bornDate &&
      email &&
      gender &&
      name &&
      phoneNumber &&
      address &&
      typeIdentification &&
      identification &&
      nationality
    ) {
      save();
      return handleClose();
    }
  };

  const save = async () => {
    const newpatientBornDate = (new Date(bornDate).getTime() + 86400000);
    const newpatient = {
      name,
      email,
      address,
      identification,
      typeIdentification,
      phoneNumber,
      bornDate: new Date(newpatientBornDate),
      gender,
      nationality,
      status,
    };

    await Patients.create(newpatient);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Nuevo Paciente</DialogTitle>
      <DialogContent>
        <FormControl sx={{ mb: 3, mt: 3 }} fullWidth>
          <TextField
            id="name"
            label="Nombre"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <TextField
            id="email"
            label="Correo"
            fullWidth
            variant="outlined"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <TextField
            id="address"
            label="Dirección"
            fullWidth
            variant="outlined"
            value={address}
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <TextField
            id="nationality"
            label="Nacionalidad"
            fullWidth
            variant="outlined"
            value={nationality}
            type="text"
            onChange={(e) => setNationality(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <InputLabel id="typeid-label">Tipo de Identificación</InputLabel>
          <Select
            labelId="typeid-label"
            id="typeIdentification"
            value={typeIdentification}
            label="Tipo de Identificación"
            onChange={(e) => setTypeIdentification(e.target.value)}
          >
            <MenuItem value="Cédula">Cédula</MenuItem>
            <MenuItem value="Pasaporte">Pasaporte</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <TextField
            id="identification"
            label="Número de Identificación"
            fullWidth
            variant="outlined"
            value={identification}
            placeholder="07314689"
            type="number"
            onChange={(e) => setIdentification(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <TextField
            id="phoneNumber"
            label="Teléfono"
            fullWidth
            variant="outlined"
            value={phoneNumber}
            placeholder="4155552671"
            type="number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <InputLabel id="gender-label">Género</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            value={gender}
            label="Género"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Femenino</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <TextField
            id="borndate"
            label="Fecha de Nacimiento"
            type="date"
            defaultValue={bornDate}
            onChange={(e) => setBornDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
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
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button
          onClick={handleAccept}
          disabled={!(
            bornDate &&
            email &&
            gender &&
            name &&
            phoneNumber &&
            address &&
            identification &&
            typeIdentification && 
            nationality
          )}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDialog;
