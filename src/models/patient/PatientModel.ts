import app from "../../services/firebase/firebase";
import { iPatient, iOptionalPatient, iPatientExtended } from "./PatientSchema";
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import {
    getFirestore,
    collection,
    query,
    DocumentData,
    doc,
    deleteDoc,
    addDoc,
    updateDoc
} from "firebase/firestore";

const Patients = {

    db: getFirestore(app),

    findAll() {
        return useCollection<DocumentData | iPatientExtended>(
            query(collection(this.db, 'patients'))
        );
    },

    findById(patientId: string) {
        return useDocument<DocumentData | iPatientExtended>(
            doc(this.db, 'patients', patientId)
        );
    },

    async deleteById(patientId: string) {
        await deleteDoc(doc(this.db, 'patients', patientId));
    },

    async updateById(patientId: string, data: Object | iOptionalPatient) {
        await updateDoc(doc(this.db, 'patients', patientId), data);
    },

    async create(data: Object | iPatientExtended) {
        function instanceOfPatient(object: any): object is iPatientExtended {
            return (
                'name' in object &&
                'email' in object &&
                'address' in object &&
                'identification' in object &&
                'phoneNumber' in object &&
                'bornDate' in object &&
                'gender' in object &&
                'nationality' in object
            );
        }

        if (!instanceOfPatient(data)) {
            alert("No puede dejar campos vacíos!");
            return;
        }

        await addDoc(collection(this.db, 'patients'), data);
    }
}

export default Patients;