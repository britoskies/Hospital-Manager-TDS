import { Timestamp } from "firebase/firestore";

interface iPhysicalCondition {
  date: Timestamp;
  blood_pressure: string;
  sugar_level: string;
  cholesterol: string;
}

interface iCormorbidities {
  name: Timestamp;
  description: string;
  diagnosisDate: string;
}

export interface iPatientExtended {
  id: number;
  name: string;
  identification: string;
  typeIdentification: string;
  phoneNumber: string;
  gender: string;
  bornDate: Timestamp;
  nationality: string;
  address: string;
  maritalStatus: string;
  imgProfile: string;
  occupation: string;
  status: boolean;
  notes?: string;
  email?: string;
  height?: string;
  weight?: string;
  blood?: string;
  cormorbidities?: iCormorbidities[];
  insurance?: string;
  vaccineRecord?: string;
  active_status: boolean;
}

export interface iPatient {
  name: string;
  email: string;
  address: string;
  social_number: string;
  phone_number: string;
  born_date: Timestamp;
  gender: string;
  active_status: boolean;
  notes: string;
  physical_condition?: iPhysicalCondition[];
}

export interface iOptionalPatient {
  name?: string;
  email?: string;
  address?: string;
  social_number?: string;
  phone_number?: string;
  born_date?: Timestamp;
  gender?: string;
  active_status?: boolean;
  notes?: string;
  physical_condition?: iPhysicalCondition[];
}
