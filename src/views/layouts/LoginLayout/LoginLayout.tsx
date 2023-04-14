// Router
import { Outlet } from 'react-router';

// Components
import { Header } from '../../../components';

// Mui
import { Box } from '@mui/material'

type Props = {};

function LoginLayout({ }: Props) {
  return (
    <Box className="login-layout" sx={{ px: 3 }}>
      <Header />
      <Outlet />
    </Box>
  );
}

export default LoginLayout;
