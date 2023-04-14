import React from 'react';

// Components
import ApptItemsList from './ApptItemsList'
import AddDialog from './AddDialog';

// Mui
import { Box, Typography, Paper, styled } from '@mui/material';
import { Icon } from "@mdi/react";
import { mdiCalendarMonth, mdiClockTimeFour } from '@mdi/js';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';

// Firebase and models
import { DocumentData } from 'firebase/firestore';
import { iAppointments } from '../../../models/appointments/ApptSchema';

type Props = {
    pastAppts: (DocumentData | iAppointments)[] | undefined;
    dueAppts: (DocumentData | iAppointments)[] | undefined;
};

function ApptPanel({ pastAppts, dueAppts }: Props) {

    // Dialog handling
    const [open, setOpen] = React.useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Styles
    const Tab = styled(TabUnstyled)`
        color: white;
        cursor: pointer;
        background-color: transparent;
        width: 100%;
        padding: 7px 8px;
        margin: 3px;
        border: none;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        transition: .25s ease-in;

        &:focus {
            outline: none;
        }
        
        &.${tabUnstyledClasses.selected} {
            background-color: #FFFFFF;
            color: #333333;
        }
          
    `;

    const TabPanel = styled(TabPanelUnstyled)`
        width: 100%;
    `;

    const TabsList = styled(TabsListUnstyled)`
        width: 200px;
        height: 32px;
        margin: 0px 10px 0px 10px;
        background-color: #F5F5F5;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: space-between;
    `;

    return (
        <Paper elevation={0} sx={{ width: 'auto', height: 'auto', p: '24px', marginTop: '16px' }}>
            <TabsUnstyled defaultValue={0}>
                <Box className='top-container' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography sx={{ display: 'flex', alignItems: 'center', color: '#333', fontWeight: 500, fontSize: '20px' }}>
                        Citas
                    </Typography>

                    <Box sx={{ display: 'flex', gap: '20px' }}>
                        <TabsList>
                            <Tab>
                                <Icon path={mdiCalendarMonth} size={'15px'} />
                            </Tab>
                            <Tab>
                                <Icon path={mdiClockTimeFour} size={'15px'} />
                            </Tab>
                        </TabsList>

                        <Box sx={{ position: 'relative', }}>
                            <button onClick={handleClickOpen} style={{
                                background: '#F5F5F5',
                                color: '#717171',
                                fontSize: '20px',
                                border: 'none',
                                borderRadius: '8px',
                                width: '32px',
                                height: '32px',
                                cursor: 'pointer'
                            }}> + </button>
                            <AddDialog open={open} onClose={handleClose} />
                        </Box>
                    </Box>
                </Box>

                <Box className='bottom-container'>
                    <TabPanel value={0}>
                        <ApptItemsList dueAppts={dueAppts} />
                    </TabPanel>
                    <TabPanel value={1}>
                        <ApptItemsList pastAppts={pastAppts} />
                    </TabPanel>
                </Box>
            </TabsUnstyled>
        </Paper>
    )
}

export default ApptPanel;