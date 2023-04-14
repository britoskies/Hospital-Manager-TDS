import React from 'react';

// MUI imports
import { IconButton, Paper, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// Components
import EditNotesDialog from './EditNotesDialog';

type Props = {
    notes: string
};

function NotesPanel({ notes }: Props) {

    const [open, setOpen] = React.useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Paper elevation={0} sx={{
                width: 'auto',
                height: 'auto',
                p: '24px'
            }}>
                <Typography sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#333',
                    fontWeight: 500,
                    fontSize: '20px'
                }}>
                    Anotaciones
                    <IconButton
                        id="long-button"
                        onClick={handleClickOpen}
                    >
                        <EditIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </Typography>
                <Typography sx={{overflowWrap: 'break-word', color: '#333', fontWeight: 400, fontSize: '14px', marginTop: '20px' }}>
                    {(notes) ? notes : 'No hay registros de notas'}
                </Typography>
            </Paper>
            <EditNotesDialog open={open} onClose={handleClose} />
        </>
    );
}

export default NotesPanel;