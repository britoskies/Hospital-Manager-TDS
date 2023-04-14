// Mui
import Icon from '@mdi/react';
import { Box, Paper, Typography } from '@mui/material';
import { mdiAccountMultipleCheck, mdiCalendarMonth } from '@mdi/js';
import { mdiAccountClock } from '@mdi/js';

// Model imports
import Appointments from '../../../models/appointments/ApptModel';

type Props = {
    inputDate: string;
};

function DiagnosesPanel({ inputDate }: Props) {

    const [appointments] = Appointments.findAll();
    const appts = appointments?.docs.map(doc => new Date(doc.data().date.seconds * 1000).toLocaleDateString("sv-SE"));
    const patientsTreated = appointments?.docs.filter(appt => appt?.data().status == false);
    const patientsForToday = appts?.filter(appt => appt == inputDate);

    return (
        <Paper elevation={0} sx={{ p: '20px', margin: '16px 0px 16px 0px' }}>
            <Typography sx={{ color: '#333', fontWeight: 700, fontSize: '18px' }}>
                Estado
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <Icon path={mdiAccountMultipleCheck} size={'50px'} color={'#4A5D79'} />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ color: '#333333', fontSize: '20px', fontWeight: 700 }}>
                            {patientsTreated?.length}
                        </Typography>
                        <Typography sx={{ color: '#333333', fontSize: '13px', fontWeight: 700 }}>
                            Pacientes Atentidos
                        </Typography>
                        <Typography sx={{ color: '#C0C0C0', fontSize: '9px', fontWeight: 700 }}>
                            EN TOTAL
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <Icon path={mdiAccountClock} size={'45px'} color={'#4A5D79'} />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ color: '#333333', fontSize: '20px', fontWeight: 700 }}>
                            {patientsForToday?.length}
                        </Typography>
                        <Typography sx={{ color: '#333333', fontSize: '13px', fontWeight: 700 }}>
                            Pacientes
                        </Typography>
                        <Typography sx={{ color: '#C0C0C0', fontSize: '9px', fontWeight: 700 }}>
                            HOY
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <Icon path={mdiCalendarMonth} size={'45px'} color={'#4A5D79'} />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ color: '#333333', fontSize: '20px', fontWeight: 700 }}>
                            {appts?.length}
                        </Typography>
                        <Typography sx={{ color: '#333333', fontSize: '13px', fontWeight: 700 }}>
                            Pacientes Agendados
                        </Typography>
                        <Typography sx={{ color: '#C0C0C0', fontSize: '9px', fontWeight: 700 }}>
                            EN TOTAL
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}

export default DiagnosesPanel;