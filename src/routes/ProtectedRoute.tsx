import { Outlet, Navigate } from 'react-router-dom';

import { useAuthStatus } from "../hooks";

import { Spinner } from '../components'


function ProtectedRoute() {
    // a custom hook to keep track of user's auth status
    const { loggedIn, checkingStatus } = useAuthStatus();

    // const checkingStatus = !false;
    // const loggedIn = !true;

    return (
        checkingStatus
            ? <Spinner />
            : loggedIn
                // if user is logged in, grant the access to the route
                // note: in this example component is Bar
                ? <Outlet />
                // else render an unauthorised component
                // stating the reason why it cannot access the route
                : <Navigate to="login" />
    );
};

export default ProtectedRoute;
