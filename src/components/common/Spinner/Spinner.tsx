import { CircularProgress, Box } from '@mui/material'

type Props = {};

function Spinner({ }: Props) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: "100%",
      height: '50vh',
      p: 3
    }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Spinner;
