import React, { useContext, useState } from "react";

// Model
import PatientModel from "../../models/patient/PatientModel";
import Appointments from "../../models/appointments/ApptModel";

// Mui
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";

// Persistence
import { AppContext } from "../../persistence/context";
import { formatDateWithNums } from "../../utils/formatDate";

type Props = {
  open: boolean;
  onClose: () => void;
};

function AddDialog({ onClose, open }: Props) {
  const { defaultDoctor } = useContext(AppContext);

  const [status, setStatus] = useState(true);
  const [date, setDate] = useState(new Date().toLocaleDateString("sv-SE"));
  const [time, setTime] = useState<string>("12:00");
  const [doctorId, setDoctorId] = useState(defaultDoctor.id);
  const [patientId, setPatientId] = useState<string>("");
  const [patientLabel, setPatientLabel] = useState<string>("");
  const [treatment, setTreatment] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [modality, setModality] = useState<string>("");

  const [patients] = PatientModel.findAll();

  const getOptions = () => {
    let options: any[] = [];
    patients?.docs.map((doc) => {
      options.push({
        value: doc.id,
        label: doc.data().name,
      });
    });
    return options;
  };

  const handleClose = () => {
    setStatus(false)
    setDate(new Date().toLocaleDateString("sv-SE"));
    setTime("12:00");
    setDoctorId(defaultDoctor.id);
    setPatientId("");
    setTreatment("");
    setDetails("");
    setModality("");
    return onClose();
  };

  const handleCancel = () => handleClose();

  const handleAccept = () => {
    if (date && time && doctorId && patientId && details && modality) {
      save();
      return handleClose();
    }
  };

  const handleChange = (patientId: any) => {
    setPatientId(patientId.value);
    setPatientLabel(patientId.label);
  };

  const save = async () => {
    const newAppt = {
      date: new Date(new Date(date).getTime() + 86400000),
      time,
      patient_id: patientId,
      doctor_id: doctorId,
      modality,
      details,
      treatment,
      status
    };
    await Appointments.create(newAppt);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Nueva Cita</DialogTitle>
      <DialogContent>
        <FormControl
          sx={{ display: "flex", flexDirection: "row", gap: 1, mb: 3, mt: 3 }}
          fullWidth
        >
          <TextField
            id="date"
            label="Fecha"
            type="date"
            defaultValue={date}
            InputProps={{ inputProps: { min: formatDateWithNums(new Date()) } }}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            id="time"
            label="Hora"
            type="time"
            defaultValue={time}
            onChange={(e) => setTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <InputLabel id="doctorid-label">Doctor</InputLabel>
          <Select
            labelId="doctorid-label"
            id="doctorid"
            value={doctorId}
            label="Doctor"
            onChange={(e) => setDoctorId(e.target.value)}
          >
            <MenuItem value={defaultDoctor.id}>{defaultDoctor.name}</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <Autocomplete
            disablePortal
            value={patientLabel}
            onChange={(event: any, newValue: string | null) => {
              handleChange(newValue);
            }}
            id="combo-box-paciente"
            options={getOptions()}
            renderInput={(params) => <TextField {...params} label="Paciente" />}
          />
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <InputLabel id="modality-label">Modalidad</InputLabel>
          <Select
            labelId="modality-label"
            id="modalityid"
            value={modality}
            label="Modalidad"
            onChange={(e) => setModality(e.target.value)}
          >
            <MenuItem key={1} value={"presencial"}>
              Presencial
            </MenuItem>
            <MenuItem key={2} value={"virtual"}>
              Virtual
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <TextField
            id="treatment"
            label="Tratamiento"
            fullWidth
            variant="outlined"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ mb: 3 }} fullWidth>
          <TextField
            id="details"
            label="Detalles"
            fullWidth
            variant="outlined"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </FormControl>
        <FormGroup>
          <FormLabel>Estado</FormLabel>
          <FormControlLabel
            sx={{ mb: 3 }}
            control={<Switch checked={status} onChange={(e) => setStatus(e.target.checked)} />}
            label={status ? "Pendiente" : "Cerrada"}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button
          onClick={handleAccept}
          disabled={
            !(date && time && doctorId && patientId && modality && details)
          }
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDialog;
