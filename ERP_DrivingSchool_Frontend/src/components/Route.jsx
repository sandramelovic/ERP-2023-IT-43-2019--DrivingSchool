import { Outlet, Navigate } from 'react-router-dom'
import NotFound from './NotFound/NotFound'

const PrivateRoutes = ({isAdmin}) => {

  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.data?.user?.role;

  if (!user) {
    return <Navigate to="/login" />;
  }
  else {
    if (!isAdmin && role !== 'Admin') {
      return <Outlet />;
    }

    else if (isAdmin && role === 'User') {
      return <NotFound />;
    }
    return <Outlet />;
  }

};


export default PrivateRoutes


