import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRouter({ children }) {
    const user = useSelector((state) => state.user.status) === 'online';
    const isHasToken = localStorage.getItem('token');
    const isUserStillHaveLogin = user || isHasToken;
    const location = useLocation();
    // if the user is not authenticated, redirect to the login page with some state
    if (!isUserStillHaveLogin) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }} // the original location of the user
            />
        );
    }

    // if the user is authenticated, render the element prop
    return children;
}

export default PrivateRouter;
