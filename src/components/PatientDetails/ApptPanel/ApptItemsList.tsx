import './scrollbar.css';

// Component imports
import ApptItem from './ApptItem';
import { ApptAlert } from '../..';

// MUI imports
import { Box } from '@mui/material';

// Firebase and models imports
import { DocumentData } from 'firebase/firestore';
import { iAppointments } from '../../../models/appointments/ApptSchema';

type Props = {
    pastAppts?: (DocumentData | iAppointments)[] | undefined;
    dueAppts?: (DocumentData | iAppointments)[] | undefined;
};

function ApptItemsList({ pastAppts, dueAppts }: Props) {

    let key: number = 0;

    return (
        <Box className='items-list' sx={{ display: 'flex', flexDirection: 'column', height: '420px', gap: '10px', marginTop: '30px', overflowY: 'auto' }}>
            {
               pastAppts && pastAppts?.map(appt => { 
                   return <ApptItem key={key} apptData={appt}/>
                })
            }
            {
                dueAppts && dueAppts?.map(appt => {
                    return <ApptItem key={key} apptData={appt}/>
                })
                
            }
            {
                (pastAppts?.length == 0)
                    ? <ApptAlert text='No existe historial de citas' />
                    : ''
            }
            {
                (dueAppts?.length == 0)
                    ? <ApptAlert text='No hay citas agendadas' />
                    : ''
            }
        </Box>
    );
}

export default ApptItemsList;