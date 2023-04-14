import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Mui
import { Box, Paper } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel,
} from "@mui/x-data-grid";

// Context
import { AppContext } from "../../persistence/context";

// Components
import { Spinner } from "../common";

// Models
import Patients from "../../models/patient/PatientModel";
import Appointments from "../../models/appointments/ApptModel";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    hide: true,
    headerClassName: "appointments-table-header",
  },
  {
    field: "patient_id",
    headerName: "patientId",
    width: 70,
    hide: true,
    headerClassName: "appointments-table-header",
  },
  {
    field: "patient",
    headerName: "Paciente",
    width: 220,
    headerClassName: "appointments-table-header",
  },
  {
    field: "doctor",
    headerName: "Doctor",
    width: 200,
    headerClassName: "appointments-table-header",
  },
  {
    field: "date",
    headerName: "Fecha",
    width: 120,
    type: "date",
    headerClassName: "appointments-table-header",
  },
  {
    field: "time",
    headerName: "Hora",
    width: 120,
    headerClassName: "appointments-table-header",
  },
  {
    field: "modality",
    headerName: "Modalidad",
    width: 130,
    headerClassName: "appointments-table-header",
  },
  {
    field: "status",
    headerName: "Estado",
    width: 140,
    headerClassName: "patients-table-header",
    renderCell: (params: GridRenderCellParams<string>) => (
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Box
          sx={{
            bgcolor: `${params.value == "Pendiente" ? "orange" : "red"}`,
            display: "flex",
            height: 12,
            width: 12,
            borderRadius: "50%",
            mr: 1,
          }}
        />
        {params.value}
      </Box>
    ),
  },
];
type Props = {
  searchTerm: string;
};

export default function DataTable({ searchTerm }: Props) {
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const [patients] = Patients.findAll();
  const [appointments] = Appointments.findAll();
  const { defaultDoctor } = useContext(AppContext);

  const [rows, setRows] = useState<any[]>([]);

  const [filteredRows, setFilteredRows] = useState<any[]>(rows);

  const getPatientName = (patient_id: string) => {
    return patients?.docs.find((x) => x.id == patient_id)?.data().name;
  };

  const startWithCap = (word: string) => {
    if (word === "presencial") return "Presencial";
    else if (word == "virtual") return "Virtual";
    else return "No especificado";
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (appointments && appointments) {
      let tmprows: any[] = [];

      // To display all fields in table
      appointments.docs.map((doc) => {
        tmprows.push({
          id: doc.id,
          date: new Date(doc.data().date.seconds * 1000).toLocaleDateString(),
          patient: getPatientName(doc.data().patient_id),
          doctor: defaultDoctor.name,
          treatment: doc.data().treatment ? doc.data().treatment : "N/A",
          time: doc.data().time,
          modality: startWithCap(doc.data().modality),
          details: doc.data().details,
          status: doc.data().status ? "Pendiente" : "Cerrada",
        });
      });

      setRows(tmprows);
      setFilteredRows(tmprows);
    }
  }, [appointments, appointments]);

  useEffect(() => {
    let filtered = rows.filter((r: any) => {
      return (
        r.patient.toLowerCase().includes(searchTerm) ||
        r.doctor.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredRows(filtered);
  }, [searchTerm]);

  return (
    <Paper
      sx={{
        height: "475px",
        width: "100%",
        mt: 2,
        px: 2,
        py: 0.5,
        "& .appointments-table": {
          border: 0,
          "& *": {
            border: 0,
          },
        },
        "& .appointments-table-header": {
          bgcolor: "white",
          px: 3,
        },
        "& .appointments-table-row": {
          cursor: "pointer",
          my: 0.8,
          px: 3,
          borderRadius: "8px",
          transition: "all 0.1s ease-out 0s",
          "&.appointments-table-row--0": {
            bgcolor: "#f5f5f5",
          },
          "&.appointments-table-row--1": {
            bgcolor: "white",
          },
          "&:hover": {
            bgcolor: "#f0f0f0",
          },
        },
      }}
      elevation={0}
    >
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={6}
        components={{ NoRowsOverlay: Spinner }}
        onRowClick={(r) => navigate(`/appointments/${r.id}`)}
        rowsPerPageOptions={[6]}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        getRowClassName={(params) =>
          `appointments-table-row appointments-table-row--${
            filteredRows.findIndex((row) => row.id == params.id) % 2
          }`
        }
        selectionModel={selectionModel}
        disableSelectionOnClick
        className="appointments-table"
      />
    </Paper>
  );
}
