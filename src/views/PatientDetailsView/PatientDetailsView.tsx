import { useParams } from 'react-router-dom';

// Components
import ProfilePanel from '../../components/PatientDetails/ProfilePanel/ProfilePanel';
import InfoPanel from '../../components/PatientDetails/DetailsPanel/InfoPanel';
import NotesPanel from '../../components/PatientDetails/NotesPanel/NotesPanel';
import PhConditionPanel from '../../components/PatientDetails/PhConditionPanel/PhConditionPanel';
import ViewTitle from './../../components/common/ViewTitle/ViewTitle';
import ApptPanel from '../../components/PatientDetails/ApptPanel/ApptPanel';

// Model
import Patients from './../../models/patient/PatientModel';
import Appointments from '../../models/appointments/ApptModel';

// Mui
import { Box, Grid } from '@mui/material';

type Props = {};

function PatientDetailsView({ }: Props) {

  let { id } = useParams();

  // Patient data
  const [patient] = Patients.findById(`${id}`);
  const patientName = patient?.data()?.name;
  const bornDate = new Date(patient?.data()?.bornDate.seconds * 1000).toLocaleDateString();
  const identification = patient?.data()?.identification;
  const nationality = patient?.data()?.nationality;
  const address = patient?.data()?.address;
  const phoneNumber = patient?.data()?.phoneNumber;
  const gender = patient?.data()?.gender;
  const notes = patient?.data()?.notes;
  const insuranceInfo = patient?.data()?.insurance;
  const status = patient?.data()?.active_status;

  // Appointments data
  const [appointments] = Appointments.findByPatientId(`${id}`);
  const appts = appointments?.docs.map(doc => doc.data());
  const pastAppts = appts?.filter(appt => new Date(appt?.date.seconds * 1000).getTime() < Date.now());
  const dueAppts = appts?.filter(appt => new Date(appt?.date.seconds * 1000).getTime() >= Date.now());

  const dates = dueAppts?.map(appt => new Date(appt.date.seconds * 1000).toLocaleDateString());
  let sortedDates: any = dates?.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  let nextApptDate: any = sortedDates?.slice(0, 1).toLocaleString();
  let nextApptObj: any = appts?.find(appt => new Date(appt?.date.seconds * 1000).toLocaleDateString() == nextApptDate);

  return (
    <Box sx={{ width: '100%' }}>
      <ViewTitle title='Detalles del Paciente' setSearchTerm={() => ""} />
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <ProfilePanel name={patientName} time={nextApptObj?.time} nextAppt={nextApptDate} />
          <InfoPanel
            bornDate={bornDate}
            identification={identification}
            nationality={nationality}
            address={address}
            phoneNumber={phoneNumber}
            gender={gender}
            insuranceInfo={insuranceInfo}
            status={status}
          />
        </Grid>
        <Grid xs paddingLeft={2} paddingTop={3}>
          <ApptPanel pastAppts={pastAppts} dueAppts={dueAppts} />
        </Grid>
        <Grid xs={3.5} paddingLeft={2} paddingTop={3}>
          <PhConditionPanel />
          <NotesPanel notes={notes} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PatientDetailsView;
