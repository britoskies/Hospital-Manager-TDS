import React from "react";
import { useParams } from "react-router-dom";

// Mui
import { Button, Box, Typography } from "@mui/material";

// Components
import AddDialog from "../../components/Appointments/AddDialog";
import Table from "../../components/Appointments/Table";
import { ViewTitle } from "../../components";
import ApptDetailsDialog from "./../../components/Appointments/ApptDetailsDialog";

// Model
import Appointments from "../../models/appointments/ApptModel";

type Props = {};

function AppointmentsView({}: Props) {
  let { id } = useParams();

  const [appointment] = Appointments.findById(`${id}`);
  const details = appointment?.data()?.details;
  const treatment = appointment?.data()?.treatment;

  const [open, setOpen] = React.useState<boolean>(false);
  const [openDetails, setOpenDetails] = React.useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchTerm = (e: any) => {
    setSearchTerm(e.target.value.toLowerCase());
  };


  React.useEffect(() => {
    setOpenDetails(true)
  },[id])

  return (
    <Box className="appointments-view" sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ display: "flex", justifyContent: "center", mb: 3 }}
        >
          <Typography sx={{ fontSize: "15px", fontWeight: "bold", mr: 1 }}>
            {" "}
            +{" "}
          </Typography>
          Agendar una cita
        </Button>
      </Box>
      <AddDialog open={open} onClose={handleClose} />

      {id && (
        <ApptDetailsDialog
          details={details}
          treatment={treatment}
          open={openDetails}
          onClose={handleClose}
        />
      )}

      <ViewTitle
        title="Citas"
        withSearchBar
        searchTerm={searchTerm}
        setSearchTerm={handleSearchTerm}
      />
      <Table searchTerm={searchTerm} />
    </Box>
  );
}

export default AppointmentsView;
