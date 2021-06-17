import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Switch } from 'react-router-dom';
import Cart from '../pages/Cart';
import Dashboard from '../pages/dashboard/Dashboard';
import Home from '../pages/home/Home';
import Signin from '../pages/signin/Signin';
import Signup from '../pages/signup/Signup';
import AddProduct from '../pages/addProduct/AddProduct';
import OrderHistory from '../pages/OrderHistory';
import AdminPage from '../pages/admin/Admin';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { getIsAuthenticated } from '../services';
import Inventory from '../pages/inventory/Inventory';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [isSuperAdmin, setIsSuperAdmin] = useState();
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      (async () => {
        try {
          const response = await getIsAuthenticated();
          if (response.data.ok) {
            setIsAuthenticated(true);

            if (response.data.superAdmin) {
              setIsSuperAdmin(true);
            }

            setRole(response.data.role);
          } else {
            setIsAuthenticated(false);
            setIsSuperAdmin(false);
            setRole(null);
          }
        } catch (err) {
          setIsAuthenticated(false);
          setIsSuperAdmin(false);
          setRole(null);
        }
      })();
    }
  }, [loading]);

  useEffect(() => {
    if (loading) {
      if (isAuthenticated !== undefined && isAuthenticated !== null) {
        setLoading(false);
      }
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <AdminRoute
            path='/admin'
            component={AdminPage}
            isSuperAdmin={isSuperAdmin}
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            role={role}
            allowedRole={['superAdmin']}
          />
          <PrivateRoute
            path='/dashboard'
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            role={role}
            component={Dashboard}
            allowedRole={['admin', 'user', 'superAdmin']}
          />
          <PrivateRoute
            path='/cart'
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            role={role}
            component={Cart}
            allowedRole={['user']}
          />
          <PrivateRoute
            path='/inventory'
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            role={role}
            component={Inventory}
            allowedRole={['user']}
          />
          <PrivateRoute
            path='/orderHistory'
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            role={role}
            component={OrderHistory}
            allowedRole={['user']}
          />
          <PrivateRoute
            path='/addProduct'
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            role={role}
            component={AddProduct}
            allowedRole={['admin', 'user']}
          />

          <PublicRoute
            path='/signin'
            isAuthenticated={isAuthenticated}
            component={Signin}
            setIsAuthenticated={setIsAuthenticated}
            setIsSuperAdmin={setIsSuperAdmin}
            setRole={setRole}
          />
          <PublicRoute
            path='/signup'
            isAuthenticated={isAuthenticated}
            component={Signup}
          />
          <PublicRoute
            path='/'
            isAuthenticated={isAuthenticated}
            component={Home}
            exact
          />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
