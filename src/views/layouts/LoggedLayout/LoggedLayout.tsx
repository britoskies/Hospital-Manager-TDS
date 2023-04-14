// Router imports
import { Outlet } from 'react-router';

// Components
import { Header, SideBar } from '../../../components';

// Mui components
import { Box } from '@mui/material'

type Props = {};

function LoggedLayout({ }: Props) {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }} className="layout logged-layout">
      <SideBar />
      <Box sx={{ flex: 1, mr: 3 }}>
        <Header />
        <Box sx={{ display: 'flex', py: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default LoggedLayout;
