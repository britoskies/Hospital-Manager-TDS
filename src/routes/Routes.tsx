// Router
import { Routes as RTS, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Components
import { LoggedLayout, LoginLayout } from "../views/layouts";
import {
    DashboardView,
    PatientsView,
    PatientDetailsView,
    AppointmentsView,
    SignInView,
} from "../views";

type Props = {};

function Routes({ }: Props) {
    return (
        <RTS>
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<LoggedLayout />}>
                    <Route path="/dashboard" element={<DashboardView />} />
                    <Route path="/patients" element={<PatientsView />} />
                    <Route
                        path="/patient"
                        element={<Navigate to="/patients" />}
                    />
                    <Route
                        path="/patient/:id"
                        element={<PatientDetailsView />}
                    />
                    <Route
                        path="/appointments"
                        element={<AppointmentsView />}
                    />
                    <Route
                        path="/appointments/:id"
                        element={<AppointmentsView />}
                    />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Route>
            </Route>
            <Route path="/login" element={<LoginLayout />}>
                <Route index element={<SignInView />} />
            </Route>
        </RTS>
    );
}
export default Routes;
