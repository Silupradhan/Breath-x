import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import Foot from './screens/Foot';

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      {/* {userInfo && <Header />} */}
      {/* <Header/> */}
      <ToastContainer />
      <main>
        <Outlet />
        </main>
        <Foot/>
    </>
  );
};

export default App;
