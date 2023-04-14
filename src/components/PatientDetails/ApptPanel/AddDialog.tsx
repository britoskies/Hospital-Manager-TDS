import React, { useContext, useState } from "react";

// Model
import PatientModel from "../../../models/patient/PatientModel";
import Appointments from "../../../models/appointments/ApptModel";

// Mui
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

// Persistence
import { AppContext } from "../../../persistence/context";
import { formatDateWithNums } from "../../../utils/formatDate";
import { useParams } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

function AddDialog({ onClose, open }: Props) {
  let { id } = useParams();
  const { defaultDoctor } = useContext(AppContext);

  const [date, setDate] = useState(new Date().toLocaleDateString("sv-SE"));
  const [time, setTime] = useState<string>("12:00");
  const [doctorId, setDoctorId] = useState(defaultDoctor.id);
  const [patientId, setPatientId] = useState<string>(`${id}`);
  const [patientLabel, setPatientLabel] = useState<string>("");
  const [treatment, setTreatment] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [modality, setModality] = useState<string>("");

  const [patient] = PatientModel.findById(`${id}`);

  const handleClose = () => {
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
  }

  const save = async () => {
    const newAppt = {
      date: new Date(new Date(date).getTime() + 86400000),
      time,
      patient_id: patientId,
      doctor_id: doctorId,
      modality,
      details,
      treatment,
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
           <InputLabel id="patientid-label">Patient</InputLabel>
           <Select
             labelId="patientid-label"
             id="patientid"
             value={patientId}
             label="Patient"
             onChange={(e) => setPatientId(e.target.value)}
           >
             <MenuItem value={id}>
               {patient?.data()?.name}
             </MenuItem>
           </Select>
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




// import React from "react";
// import { useParams } from "react-router-dom";

// // Patients models
// import Patients from "../../../models/patient/PatientModel";
// import Appointments from "../../../models/appointments/ApptModel";

// // Persistence
// import { AppContext } from "../../../persistence/context";
// import { formatDateWithNums } from "../../../utils/formatDate";

// // Mui
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";

// type Props = {
//   open: boolean;
//   onClose: () => void;
// };

// function AddDialog({ onClose, open }: Props) {

//   let { id } = useParams()
//   const { defaultDoctor } = React.useContext(AppContext);

//   const [date, setDate] = React.useState(new Date().toLocaleDateString("sv-SE"));
//   const [time, setTime] = React.useState<string>('12:00');
//   const [doctorId, setDoctorId] = React.useState(defaultDoctor.id);
//   const [patientId, setPatientId] = React.useState(`${id}`);
//   const [treatment, setTreatment] = React.useState("");

//   const [patient] = Patients.findById(`${id}`);

//   const handleClose = () => {
//     setDate(new Date().toLocaleDateString("sv-SE"));
//     setTime('12:00');
//     setDoctorId(defaultDoctor.id);
//     setPatientId("");
//     setTreatment("");
//     return onClose();
//   };

//   const handleCancel = () => handleClose();

//   const handleAccept = () => {
//     if (date && time && doctorId && patientId && treatment) {
//       save();
//       return handleClose();
//     }
//   };

//   const save = async () => {
//     const newAppt = {
//       date: new Date(new Date(date).getTime() + 86400000),
//       time,
//       patient_id: patientId,
//       doctor_id: doctorId,
//       treatment,
//     };
//     await Appointments.create(newAppt);
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} fullWidth>
//       <DialogTitle>Add New Appointment</DialogTitle>
//       <DialogContent>
//         <FormControl sx={{ display: 'flex', flexDirection: 'row', gap: 1, mb: 3, mt: 3 }} fullWidth>
//           <TextField
//             id="date"
//             label="Date"
//             type="date"
//             defaultValue={date}
//             InputProps={{ inputProps: { min: formatDateWithNums(new Date()) } }}
//             onChange={(e) => setDate(e.target.value)}
//             InputLabelProps={{
//               shrink: true,
//             }}
//             fullWidth
//           />
//           <TextField
//             id="time"
//             label="Time"
//             type="time"
//             defaultValue={time}
//             onChange={(e) => setTime(e.target.value)}
//             InputLabelProps={{
//               shrink: true,
//             }}
//             fullWidth
//           />
//         </FormControl>
//         <FormControl sx={{ mb: 3 }} fullWidth>
//           <InputLabel id="doctorid-label">Doctor</InputLabel>
//           <Select
//             labelId="doctorid-label"
//             id="doctorid"
//             value={doctorId}
//             label="Doctor"
//             onChange={(e) => setDoctorId(e.target.value)}
//           >
//             <MenuItem value={defaultDoctor.id}>
//               {defaultDoctor.name}
//             </MenuItem>
//           </Select>
//         </FormControl>
//         <FormControl sx={{ mb: 3 }} fullWidth>
//           <InputLabel id="patientid-label">Patient</InputLabel>
//           <Select
//             labelId="patientid-label"
//             id="patientid"
//             value={patientId}
//             label="Patient"
//             onChange={(e) => setPatientId(e.target.value)}
//           >
//             <MenuItem value={id}>
//               {patient?.data()?.name}
//             </MenuItem>
//           </Select>
//         </FormControl>
//         <FormControl sx={{ mb: 3 }} fullWidth>
//           <TextField
//             id="treatment"
//             label="Treatment"
//             fullWidth
//             variant="outlined"
//             value={treatment}
//             onChange={(e) => setTreatment(e.target.value)}
//           />
//         </FormControl>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleCancel}>Cancel</Button>
//         <Button
//           onClick={handleAccept}
//           disabled={!(date && time && doctorId && patientId && treatment)}
//         >
//           Save
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// export default AddDialog;
