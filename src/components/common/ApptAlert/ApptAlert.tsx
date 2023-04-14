// Mui
import { Typography } from "@mui/material";
import { Icon } from "@mdi/react";
import { mdiAlertCircle } from "@mdi/js";
import { useEffect } from "react";

type Props = {
  text: string;
};

function ApptAlert({ text }: Props) {
  if (!text) {
    text = "No hay registros";
  }
  return (
    <Typography
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: "10px",
        gap: "5px",
        background: "#ebc9c5",
        borderRadius: "8px",
        color: "#ae3a44",
        fontWeight: 500,
      }}
    >
      <Icon path={mdiAlertCircle} size={"20px"} color={"#af332e"} />
      {text}
    </Typography>
  );
}

export default ApptAlert;
