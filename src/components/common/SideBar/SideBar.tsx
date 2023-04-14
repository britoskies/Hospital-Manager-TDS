import { Link, useLocation } from "react-router-dom";

// Mui
import { Box, styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import { mdiHome, mdiAccountClock, mdiCalendarBlank } from "@mdi/js";
import { Icon } from "@mdi/react";

import "./SideBar.css";
// import {logo} from "../../../assets/img/logo.png";

type Props = {};

function SideBar({ }: Props) {

  const location = useLocation();
  const activeRoute: string = location.pathname.replace('/', '');

  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} placement='right' />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      background: '#1D3557',
      color: theme.palette.common.white,
      boxShadow: theme.shadows[5],
      fontSize: 16,
    },
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        //height: '100%',
        bgcolor: '#1D3557',
        mr: 3,
        p: 3
      }}
      className="sidebar">
      <Box sx={{ position: 'relative', height: '48px', width: '24px', mb: '20px' }} className="sidebar-img-container">
        <img src="/logo.png" height="45" className="sidebar-img" />
      </Box>
      <ul className="sidebar-icon-list">
        <li className="sidebar-icon">
          <Link to="/dashboard" className={`sidebar-icon ${activeRoute == "dashboard" ? "active" : ""}`}>
            <LightTooltip title="Dashboard">
              <Icon path={mdiHome} size={1.3} />
            </LightTooltip>
          </Link>
        </li>
        <li className="sidebar-icon">
          <Link to="/patients" className={`sidebar-icon ${activeRoute == "patients" ? "active" : ""}`}>
            <LightTooltip title="Pacientes">
              <Icon path={mdiAccountClock} size={1.3} />
            </LightTooltip>
          </Link>
        </li>
        <li className="sidebar-icon">
          <Link to="/appointments" className={`sidebar-icon ${activeRoute == "appointments" ? "active" : ""}`}>
            <LightTooltip title="Citas">
              <Icon path={mdiCalendarBlank} size={1.3} />
            </LightTooltip>
          </Link>
        </li>
      </ul>
    </Box>
  );
}

export default SideBar;
