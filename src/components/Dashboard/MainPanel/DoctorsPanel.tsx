import React from 'react';

// App context
import { AppContext } from "../../../persistence/context";

// Mui
import { Avatar, Box, Paper, Typography, IconButton } from '@mui/material';
import { mdiArrowRightBoldCircle, mdiArrowLeftBoldCircle } from '@mdi/js';
import { Icon } from '@mdi/react';

type Props = {};

function DoctorsPanel({ }: Props) {

    const { defaultDoctor } = React.useContext(AppContext);

    return (
        <Paper elevation={0} sx={{ p: '20px', }}>
            <Typography sx={{ color: '#333', fontWeight: 700, fontSize: '18px' }}>
                Doctores 
            </Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                overflowX: 'auto'
            }}>
                <IconButton>
                    <Icon path={mdiArrowLeftBoldCircle} size={1.7} color={"#4A5D79"} />
                </IconButton>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    width: '160px',
                    margin: '2px',
                    p: '20px 10px',
                    background: '#F5F5F5',
                    borderRadius: '10px',
                }}>
                    <Avatar
                        alt={defaultDoctor.name}
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 70, height: 70, fontSize: '25px' }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', margin: '7px 0px', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#333' }}>
                            Dr. {defaultDoctor.name}
                        </Typography>
                        <Typography sx={{ fontSize: '11px', fontWeight: 350, color: '#333' }}>
                            Dermatólogo
                        </Typography>
                    </Box>
                    <Typography sx={{ p: '1px 30px', fontSize: '12px', fontWeight: 400, color: '#348F32', border: '2px', borderStyle: 'solid', borderColor: '#348F32', borderRadius: '5px' }}>
                        Disponible
                    </Typography>
                </Box>
                <IconButton>
                    <Icon path={mdiArrowRightBoldCircle} size={1.7} color={"#4A5D79"} />
                </IconButton>
            </Box>
        </Paper>
    )
}

export default DoctorsPanel;