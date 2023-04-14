import React from 'react';

// Mui
import { Box, Grid } from '@mui/material';

// Components
import TextPanel from '../../components/Dashboard/MainPanel/TextPanel';
import Overview from '../../components/Dashboard/MainPanel/Overview';
import DoctorsPanel from '../../components/Dashboard/MainPanel/DoctorsPanel';
import ApptColumn from '../../components/Dashboard/ApptPanel/ApptColumn';

// Model
import Appointments from '../../models/appointments/ApptModel';

type Props = {};

function DashboardView({ }: Props) {

  const [inputDate, setInputDate] = React.useState<string>(new Date().toLocaleDateString("sv-SE"));

  return (
    <React.Fragment>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={7.5}>
            <TextPanel />
            <Overview inputDate={inputDate} />

            {/* Temporary component */}
            <DoctorsPanel />

          </Grid>
          <Grid item xs={4.5}>
            <ApptColumn inputDate={inputDate} setDate={setInputDate} />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default DashboardView;
