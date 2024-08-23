import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const auth = localStorage.getItem('token'); // Chequea si el token existe
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
