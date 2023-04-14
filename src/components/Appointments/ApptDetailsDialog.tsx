import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// MUI
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

// Model
import Appointments from "../../models/appointments/ApptModel";

type Props = {
  treatment: any;
  details: any;
  open: boolean;
  onClose: () => void;
};

function ApptDetailsDialog({ onClose, open, treatment, details }: Props) {
  const {id} = useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    return onClose();
  };

  const handleCancel = () => {
    navigate("/appointments");
  };

  const handleAccept = async () => {
    const newStatus = {
      status: false,
    };
    await Appointments.updateById(`${id}`, newStatus);
    return handleCancel();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Detalles de la Cita</DialogTitle>
      <DialogContent>
        <Box>
          <Typography
            sx={{ color: "#C0C0C0", fontSize: "14px", marginTop: "15px" }}
          >
            Tratamiento
          </Typography>
          <Typography
            sx={{ fontWeight: 700, fontSize: "14px", marginBottom: "10px" }}
          >
            {treatment ? treatment : "N/A"}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ color: "#C0C0C0", fontSize: "14px", marginTop: "15px" }}
          >
            Detalles
          </Typography>
          <Typography
            sx={{ fontWeight: 700, fontSize: "14px", marginBottom: "10px" }}
          >
            {details}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button variant="outlined" color="error" onClick={handleAccept}>Marcar Completada</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ApptDetailsDialog;
