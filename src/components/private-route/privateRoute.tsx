import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser } from 'src/services/slices/user-slice';
import { AppDispatch } from 'src/services/store';

interface IPrivateRouteProps {
  children: React.ReactNode;
  isAuth: boolean;
  link: string;
}

export const PrivateRoute = ({ children, isAuth, link }: IPrivateRouteProps) =>
  isAuth ? <>{children}</> : <Navigate to={link} />;
