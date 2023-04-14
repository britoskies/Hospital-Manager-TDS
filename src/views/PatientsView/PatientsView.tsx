// React imports
import { useState } from 'react';

// Components
import AddDialog from '../../components/Patients/AddDialog';
import Table from '../../components/Patients/Table';
import { ViewTitle } from '../../components';

// Mui
import {
  Button,
  Box,
  Typography
} from '@mui/material';

type Props = {};

function PatientsView({ }: Props) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchTerm = (e: any) => {
    setSearchTerm(e.target.value.toLowerCase())
  };

  return (
    <Box className="patients-view" sx={{ width: "100%" }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'end', }}>
        <Button variant="contained" onClick={handleClickOpen} sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: '15px', fontWeight: 'bold', mr: 1 }}> + </Typography>
          Agregar Nuevo Paciente
        </Button>
      </Box>
      <AddDialog open={open} onClose={handleClose} />
      <ViewTitle title="Pacientes" withSearchBar searchTerm={searchTerm} setSearchTerm={handleSearchTerm} />
      <Table searchTerm={searchTerm} />
    </Box>
  );
}

export default PatientsView;
