import { Box, Typography } from '@mui/material';

type Props = {
    height: string,
    weight: string,
    blood: string,
    vaccineRecord: string,
    insurance: string,
};

function PhConditionItem({ height, weight, blood, vaccineRecord, insurance }: Props) {
    return (
        <Box className='info-container'>
            <Box>
                <Typography sx={{ color: '#C0C0C0', fontSize: '14px', marginTop: '15px' }}> Altura </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '14px', marginBottom: '10px' }}>
                    {height ? height : 'N/A'}
                </Typography>
            </Box>
            <Box>
                <Typography sx={{ color: '#C0C0C0', fontSize: '14px', marginTop: '15px' }}> Peso </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '14px', marginBottom: '10px' }}>
                    {weight ? weight : 'N/A'}
                </Typography>
            </Box>
            <Box>
                <Typography sx={{ color: '#C0C0C0', fontSize: '14px' }}> Tipo de Sangre </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '14px', marginBottom: '10px' }}>
                    {blood ? blood : 'N/A'}
                </Typography>
            </Box>
            <Box>
                <Typography sx={{ color: '#C0C0C0', fontSize: '14px' }}> Vacuna </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '14px', marginBottom: '10px' }}>
                    {vaccineRecord ? vaccineRecord : 'N/A'}
                </Typography>
            </Box>
            <Box>
                <Typography sx={{ color: '#C0C0C0', fontSize: '14px' }}> Seguro Médico </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '14px', marginBottom: '10px' }}>
                    {insurance ? insurance : 'N/A'}
                </Typography>
            </Box>
        </Box>
    );
}

export default PhConditionItem;