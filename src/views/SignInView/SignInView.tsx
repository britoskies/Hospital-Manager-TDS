import './SignInView.css'

// Component
import SignIn from './../../components/SignIn/SignIn';

// Mui
import { Box } from '@mui/material'

type Props = {};

function SignInView({ }: Props) {
  return (
    <Box className='signin-view'>
      <SignIn />
    </Box>
  )
}

export default SignInView;