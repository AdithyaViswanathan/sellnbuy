import { Redirect, Route } from 'react-router';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const PrivateRoute = ({
  path,
  isAuthenticated,
  component: Component,
  setIsAuthenticated,
  userEmail,
  allowedRole,
  role,
}) => {
  if (!isAuthenticated) {
    return <Redirect to='/signin' />;
  }

  if (role && !allowedRole.find(item => item === role)) {
    toast.error("You're not allowed to access this route");
    return <Redirect to='/dashboard' />;
  }

  return (
    <Route
      path={path}
      render={routeParams => (
        <>
          <Navbar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Component {...routeParams} />
        </>
      )}
    />
  );
};

export default PrivateRoute;
