// Mui
import { Box, Paper, Typography } from "@mui/material";

type Props = {};

function TextPanel({}: Props) {
  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #1D3557 0%, #457B9D 91%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "left",
          px: 3,
          p: "40px 30px",
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: "13px", fontWeight: 400 }}>
          Dashboard
        </Typography>
        <Typography sx={{ fontSize: "18px", fontWeight: 900 }}>
          Hospiten Santo Domingo
        </Typography>
        <Typography
          sx={{
            width: 400,
            fontSize: "13px",
            fontWeight: 300,
            fontStyle: "italic",
            marginTop: "30px",
          }}
        >
          El Grupo Hospiten ha basado siempre su modelo de gestión en la
          eficiencia de todas sus actividades y servicio.
        </Typography>
      </Paper>
    </Box>
  );
}

export default TextPanel;
