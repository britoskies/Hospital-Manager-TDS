import './scrollbar.css'

// Mui
import { Box } from '@mui/material';

// Component
import ApptItem from './ApptItem';
import { ApptAlert }from '../..';

type Props = {
    filteredAppts: any[] | undefined
};

function ApptItemsList({ filteredAppts }: Props) {

    let key = 0;

    return (
        <Box className='items-list-dashboard' sx={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '395px', overflowY: 'auto' }}>
            {
                filteredAppts && filteredAppts?.map((appt) => {
                    return <ApptItem key={key++} apptData={appt} patientId={appt.patient_id} />
                })
            }

            {
                (filteredAppts?.length == 0) &&
                <ApptAlert text="No hay citas para la fecha"/>
            }

        </Box>
    )
}

export default ApptItemsList;