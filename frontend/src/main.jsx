import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Dashboard from './screens/Dashboard.jsx';
import Quiz from './screens/Quiz.jsx';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen.jsx';
import ResetPasswordScreen from './screens/ResetPasswordScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
      <Route path='/reset-password/:resetToken' element={<ResetPasswordScreen />} />
      <Route path='' element={<PrivateRoute />}>
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/quiz' element={<Quiz/>}/>
      
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
