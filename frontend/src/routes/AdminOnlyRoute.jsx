import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const AdminOnlyRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && user.role === 'admin' ? <>{children}</> : <Navigate to="/" />
  )
}

export default AdminOnlyRoute;
