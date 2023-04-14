import React from 'react';
import { useParams } from 'react-router-dom';

// MUI
import { Paper, Box, Typography, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Components and utils
import DetailsPanelDialog from './DetailsPanelDialog';
import { formatDate } from '../../../utils/formatDate';

// Model
import Patients from '../../../models/patient/PatientModel';

type Props = {
    bornDate: string,
    identification: number,
    nationality: string,
    address: string,
    phoneNumber: string,
    gender: string,
    insuranceInfo: string,
    status: boolean
};

function InfoPanel({ bornDate, identification, nationality, insuranceInfo, status, address, phoneNumber, gender }: Props) {

    let { id } = useParams();
    const [patients] = Patients.findById(`${id}`);

    const patientDoB = patients?.data()?.bornDate;
    const formatedDoB = formatDate(new Date(patientDoB?.seconds * 1000));
    const patientIdentification = patients?.data()?.identification;
    const patientNationality = patients?.data()?.nationality;
    const patientAddress = patients?.data()?.address;
    const patientPhone = patients?.data()?.phoneNumber;
    const patientGender: string = patients?.data()?.gender;
    const patientStatus: boolean = patients?.data()?.active_status;

    const [dateOfBirth, setDateOfBirth] = React.useState<string>(formatedDoB);
    const [identificationState, setIdentification] = React.useState<string>(patientIdentification);
    const [nationalityState, setNationality] = React.useState<string>(patientIdentification);
    const [addressState, setAddress] = React.useState<string>(patientAddress);
    const [phoneState, setPhone] = React.useState<string>(patientPhone);
    const [genderState, setGender] = React.useState<string>(patientGender);
    const [statusState, setStatus] = React.useState<boolean>(patientStatus);

    const [open, setOpen] = React.useState<boolean>(false);

    // Styles
    const fontWeight: number = 700; 

    const handleClickOpen = () => {
        setDateOfBirth(formatedDoB);
        setIdentification(patientIdentification);
        setNationality(patientNationality);
        setAddress(patientAddress);
        setPhone(patientPhone);
        setGender(patientGender);
        setStatus(patientStatus);
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
                <Typography component='div' sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#333',
                    fontWeight: 500,
                    fontSize: '20px'
                }}>
                    Detalles
                    <IconButton id="long-button" onClick={handleClickOpen}>
                        <MoreVertIcon />
                    </IconButton>
                </Typography>
                <Box className='info-container' sx={{ marginTop: '15px', display: 'flex', gap: '33px' }}>
                    <Box className='left-container'>
                        <Box sx={{ marginBottom: '10px' }}>
                            <Typography sx={{ color: '#C0C0C0', fontSize: '14px' }}> Fecha de Nacimiento </Typography>
                            <Typography sx={{ fontWeight, fontSize: '14px' }}> {bornDate} </Typography>
                        </Box>
                        <Box sx={{ marginBottom: '10px' }}>
                            <Typography sx={{ color: '#C0C0C0', fontSize: '14px' }}> Número de Identificación </Typography>
                            <Typography sx={{ fontWeight, fontSize: '14px' }}> {identification} </Typography>
                        </Box>
                        <Box sx={{ marginBottom: '10px' }}>
                            <Typography sx={{ color: '#C0C0C0', fontSize: '14px' }}> Dirección </Typography>
                            <Typography sx={{ fontWeight, fontSize: '14px' }}> {address} </Typography>
                        </Box>
                    </Box>
                    <Box className='right-container'>
                        <Box sx={{ marginBottom: '10px' }}>
                            <Typography sx={{ color: '#C0C0C0', fontSize: '14px' }}> Teléfono </Typography>
                            <Typography sx={{ fontWeight, fontSize: '14px' }}> {phoneNumber} </Typography>
                        </Box>
                        <Box sx={{ marginBottom: '10px' }}>
                            <Typography sx={{ color: '#C0C0C0', fontSize: '14px' }}> Género </Typography>
                            <Typography sx={{ fontWeight, fontSize: '14px' }}> {gender} </Typography>
                        </Box>
                        <Box sx={{ marginBottom: '10px' }}>
                            <Typography sx={{ color: '#C0C0C0', fontSize: '14px' }}> Nacionalidad </Typography>
                            <Typography sx={{ fontWeight, fontSize: '14px' }}> {nationality} </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
            <DetailsPanelDialog
                open={open}
                onClose={handleClose}
                dateOfBirth={dateOfBirth}
                identification={identificationState}
                nationality={nationalityState}
                address={addressState}
                phone={phoneState}
                gender={genderState}
                status={statusState}
                setDoB={setDateOfBirth}
                setIdentification={setIdentification}
                setNationality={setNationality}
                setAddress={setAddress}
                setPhone={setPhone}
                setGender={setGender}
                setStatus={setStatus}
            />
        </>
    );
}

export default InfoPanel;