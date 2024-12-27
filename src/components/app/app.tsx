import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { PrivateRoute } from '../private-route/privateRoute';
import { URLS } from './app.urls';
import styles from './app.module.css';
import { AppHeader } from '../app-header';
import { OrderInfo } from '../order-info';
import { Modal } from '../modal';
import { IngredientDetails } from '../ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/slices/ingredients-slice';
import { AppDispatch, RootState } from '../../services/store';
import { getUser, refresh } from '../../services/slices/user-slice';
import { Preloader } from '@ui';

const App = () => {
  const isAuth = useSelector((state: RootState) => state.UserReducer.isAuth);

  const dispatch = useDispatch<AppDispatch>();
  const [isToken, setIsToken] = useState<boolean>(
    !!localStorage.getItem('refreshToken')
  );
  useEffect(() => {
    dispatch(getIngredients());
    if (isToken) {
      //dispatch(refresh()).then(() => dispatch(getUser()));
      dispatch(getUser());
    }
  }, [dispatch]);

  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      {isToken && !isAuth ? (
        <Preloader />
      ) : (
        <>
          <AppHeader />
          <Routes>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />
            <Route
              path='/feed/:number'
              element={
                <Modal
                  title='Order Details'
                  onClose={() => {
                    navigate('/feed');
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  title='Ingredient Details'
                  onClose={() => {
                    navigate('/');
                  }}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/login'
              element={
                <PrivateRoute isAuth={!isAuth} link={URLS.PROFILE}>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route path='/register' element={<Register />} />
            <Route
              path='/forgot-password'
              element={
                <PrivateRoute isAuth={isAuth} link={URLS.LOGIN}>
                  <ForgotPassword />
                </PrivateRoute>
              }
            />
            <Route
              path='/reset-password'
              element={
                <PrivateRoute isAuth={isAuth} link={URLS.LOGIN}>
                  <ResetPassword />
                </PrivateRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <PrivateRoute isAuth={isAuth} link={URLS.LOGIN}>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path='/profile/orders'
              element={
                <PrivateRoute isAuth={isAuth} link={URLS.LOGIN}>
                  <ProfileOrders />
                </PrivateRoute>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal
                  title='Order Details'
                  onClose={() => {
                    navigate('/profile/orders/');
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
            <Route path='*' element={<NotFound404 />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
