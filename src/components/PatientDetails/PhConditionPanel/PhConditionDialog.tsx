import React from "react";
import { useParams } from "react-router-dom";

// Patients models
import Patients from "../../../models/patient/PatientModel";

// Mui
import {
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
import { formatDateWithNums } from "../../../utils/formatDate";

type Props = {
  open: boolean;
  onClose: () => void;
  height: string;
  weight: string;
  blood: string;
  vaccineRecord: string;
  insurance: string;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
  setWeight: React.Dispatch<React.SetStateAction<string>>;
  setBlood: React.Dispatch<React.SetStateAction<string>>;
  setVaccineRecord: React.Dispatch<React.SetStateAction<string>>;
  setInsurance: React.Dispatch<React.SetStateAction<string>>;
};

function PhConditionDialog({
  open,
  onClose,
  height,
  weight,
  blood,
  vaccineRecord,
  insurance,
  setHeight,
  setWeight,
  setBlood,
  setVaccineRecord,
  setInsurance,
}: Props) {

  let { id } = useParams();
  const bloodTypes: string[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleClose = () => {
    setHeight(height);
    setWeight(weight);
    setBlood(blood);
    setVaccineRecord(vaccineRecord);
    setInsurance(insurance);
    return onClose();
  };

  const handleAccept = () => {
    if (height || weight || blood || vaccineRecord || insurance) {
      save();
      return handleClose();
    }
  };

  const save = async () => {
    const newPhCondition = {
        height,
        weight,
        blood,
        vaccineRecord,
        insuranceInfo: insurance,
    };

    await Patients.updateById(`${id}`, newPhCondition);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Estado Físico</DialogTitle>
      <DialogContent>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mb: 3,
            mt: 3,
          }}
          fullWidth
        >
          <FormControl sx={{ mb: 3 }} fullWidth>
            <TextField
              id="height"
              label="Altura"
              variant="outlined"
              type="text"
              defaultValue={height}
              onChange={(e) => setHeight(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </FormControl>
          <FormControl sx={{ mb: 3 }} fullWidth>
            <TextField
              id="weight"
              label="Peso"
              variant="outlined"
              type="text"
              defaultValue={weight}
              onChange={(e) => setWeight(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </FormControl>
          <FormControl sx={{ mb: 3 }} fullWidth>
            <InputLabel id="blood-label">Tipo de Sangre</InputLabel>
            <Select
              labelId="blood-label"
              id="bloodid"
              value={blood}
              label="Tipo de Sangre"
              defaultValue=""
              onChange={(e) => setBlood(e.target.value)}
            >
              {bloodTypes.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <FormControl sx={{ mb: 3 }} fullWidth>
            <TextField
              id="vaccine"
              label="Vacuna"
              variant="outlined"
              type="text"
              defaultValue={vaccineRecord}
              onChange={(e) => setVaccineRecord(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </FormControl>
          <FormControl sx={{ mb: 3 }} fullWidth>
            <TextField
              id="insurance"
              label="Seguro Médico"
              variant="outlined"
              type="text"
              multiline
              defaultValue={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </FormControl>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={handleAccept}
          disabled={!(height && weight && blood && vaccineRecord && insurance)}
        >
          guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PhConditionDialog;
