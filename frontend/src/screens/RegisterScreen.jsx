import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import "../style/Register.css"

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [height,setHeight] = useState();
  const [weight,setWeight] = useState();
  const [mobile,setMobile] = useState();
  const [gender,setGender] = useState();
  const [dob,setDob] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password,height,weight,mobile,gender,dob }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className="na">
    <div className="registration-container">
      <h2>Registration Form</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e)=> setConfirmPassword(e.target.value)}
          required
        />
         <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          required
          value={height}
          onChange={(e)=>setHeight(e.target.value)}
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          required
          value={weight}
          onChange={(e)=>setWeight(e.target.value)}
        />
       
         <input
          type="text"
          name="gender"
          placeholder="gender"
          value={gender}
          onChange={(e)=>setGender(e.target.value)}
          required
        /> 
        <input
          type="date"
          name="dob"
          required
          value={dob}
          onChange={(e)=>setDob(e.target.value)}
        />


        <input
          type="number"
          name="mobile"
          placeholder="Mobile No"
          value={mobile}
          onChange={(e)=>setMobile(e.target.value)}
          required
        /> 

        <button type="submit">Register</button>
        {isLoading && <Loader />}
      </form>
      <div className="row py-3">
        <div className="col">
          Already have an account? <Link to="/login" className="link">Login</Link>
        </div>
      </div>
    </div>
  </div>
  );
};

export default RegisterScreen;
