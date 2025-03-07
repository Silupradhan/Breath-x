import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../components/Loader';
// import "../style/ForgotPassword.css";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/users/forgot-password', { email });
      toast.success('Password reset email sent');
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password">
      <div className="form-container">
        <h1>Forgot Password</h1>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary1" disabled={loading}>
            {loading ? <Loader /> : 'Send Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;