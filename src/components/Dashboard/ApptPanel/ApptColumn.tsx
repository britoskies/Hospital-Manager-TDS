import React from 'react';
import { useNavigate } from 'react-router-dom';

// Component
import ApptItemsList from './ApptItemsList';
import Calendar from './Calendar';

// Mui
import { Paper, Typography, Box, IconButton } from '@mui/material';
import { mdiArrowRightThin } from '@mdi/js';
import { Icon } from '@mdi/react';

// Model
import Appointments from '../../../models/appointments/ApptModel';

type Props = {
    inputDate: string;
    setDate: React.Dispatch<React.SetStateAction<string>>
};

function ApptColumn({ inputDate, setDate }: Props) {

    const navigateTo = useNavigate();

    const [appointments] = Appointments.findAll();

    const appts = appointments?.docs.map(doc => doc.data());
    const filteredAppts = appts?.filter(appt => new Date(appt?.date.seconds * 1000).toLocaleDateString("sv-SE") == inputDate);

    return (
        <Paper elevation={0} sx={{ width: '100%', p: '16px' }}>
            <Typography sx={{ color: '#333', fontWeight: 700, fontSize: '18px' }}>
                Citas
            </Typography>
            <Calendar setDate={setDate} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0px 0px 15px 0px' }}>
                <Typography>
                    <strong> {filteredAppts?.length} </strong> Citas
                </Typography>
                <IconButton onClick={() => navigateTo('../appointments')}>
                    <Icon path={mdiArrowRightThin} size={'30px'} />
                </IconButton>
            </Box>
            <ApptItemsList filteredAppts={filteredAppts} />
        </Paper>
    )
}

export default ApptColumn;