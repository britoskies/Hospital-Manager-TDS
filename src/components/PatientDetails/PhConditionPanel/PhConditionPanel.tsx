import React from 'react';
import { useParams } from 'react-router-dom';

// Components and utils
import PhConditionItem from './PhConditionItem';
import PhConditionDialog from './PhConditionDialog';
import { formatDate } from '../../../utils/formatDate';

// Model
import Patients from '../../../models/patient/PatientModel';

// Mui
import { Paper, Typography, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type Props = {};

function PhConditionPanel({ }: Props) {

    const { id } = useParams();
    const [phCondition] = Patients.findById(`${id}`);

    const height = phCondition?.data()?.height;
    const weight = phCondition?.data()?.weight;
    const blood = phCondition?.data()?.blood;
    const vaccineRecord = phCondition?.data()?.vaccineRecord;
    const insurance = phCondition?.data()?.insurance;

    const [heightState, setHeight] = React.useState<string>(height);
    const [bloodState, setBlood] = React.useState<string>(blood);
    const [weightState, setWeight] = React.useState<string>(weight);
    const [vaccineRecordState, setVaccineRecord] = React.useState<string>(vaccineRecord);
    const [insuranceState, setInsurance] = React.useState<string>(insurance);

    const [open, setOpen] = React.useState<boolean>(false);

    const handleClickOpen = () => {
        setHeight(height);
        setWeight(weight);
        setBlood(blood);
        setVaccineRecord(vaccineRecord);
        setInsurance(insurance);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Paper elevation={0} sx={{
            width: 'auto',
            height: 'auto',
            p: '24px',
            margin: '16px 0px 16px 0px'
        }}>
            <Typography component='div' sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#333',
                fontWeight: 500,
                fontSize: '20px'
            }}>
                Estado Físico
                <IconButton
                    id="moreverticon"
                    aria-haspopup="true"
                    onClick={handleClickOpen}
                >
                    <MoreVertIcon />
                </IconButton>
            </Typography>
            <PhConditionItem
                height={height}
                weight={weight}
                blood={blood}
                vaccineRecord={vaccineRecord}
                insurance={insurance}
            />
            <PhConditionDialog
                open={open}
                onClose={handleClose}
                height={heightState}
                weight={weightState}
                blood={bloodState}
                vaccineRecord={vaccineRecordState}
                insurance={insuranceState}
                setHeight={setHeight}
                setWeight={setWeight}
                setBlood={setBlood}
                setVaccineRecord={setVaccineRecord}
                setInsurance={setInsurance}
            />
        </Paper>
    )
}

export default PhConditionPanel;