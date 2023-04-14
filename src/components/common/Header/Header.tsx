/* eslint-disable no-empty-pattern */
import { useNavigate } from 'react-router-dom';

// Mui
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material'
import { Logout } from '@mui/icons-material'

// Model and assets
import UserAuth from '../../../models/userauth/UserAuth';

type Props = {};

function Header({ }: Props) {
  const [user] = UserAuth.getAuthState()
  const navigate = useNavigate()

  const handleSignOut = () => {
    UserAuth.signOut()
    navigate('/login')
  }

  const appTitle = "Hospital Manager"

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      {user && (
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {appTitle}
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleSignOut}
            color="inherit"
          >
            <Logout />
          </IconButton>
        </Toolbar>
      )}
      {!user && (
        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <img src="/logo.png" alt="" height="60" />
            <Typography variant="h5" component="h3" sx={{ height: 'min-content' }}>
              {appTitle.slice(1, appTitle.length)}
            </Typography>
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
}

export default Header;
