import React from 'react';

// MUI imports
import { Box, FormControl, TextField } from '@mui/material';

type Props = {
    setDate: React.Dispatch<React.SetStateAction<string>>
};

function Calendar({ setDate }: Props) {

    const [textFieldDate, setTextFieldDate] = React.useState(new Date().toLocaleDateString("sv-SE"));

    const handleChange = (e: any) => { 
        setTextFieldDate(e.target.value);
        setDate(e.target.value);
    }

    return (
        <Box>
            <FormControl sx={{ mb: 3, mt: 5 }} fullWidth>
                <TextField
                    id="date"
                    label="Fecha"
                    type="date"
                    defaultValue={textFieldDate}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
            </FormControl>
        </Box>
    )
}

export default Calendar;