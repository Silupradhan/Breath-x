import React from 'react';
import "../style/Header.css"
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="header">
    <div className="container-co">
      <Link to="/" className="brand">
        Breath X
      </Link>

      <nav className="navbar">
        <ul className="nav">
          {userInfo ? (
            <>
              <li className="nav-item dropdown">
                <button className="dropdown-toggle" id="username">
                  {userInfo.name}
                </button>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>

                  <Link to="/dashboard" className="dropdown-item">
                    Dashboard
                  </Link>

                  <button className="dropdown-item" onClick={logoutHandler}>
                    Logout
                  </button>
                </div>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  to="/login"
                  className={`nav-link sign-in-btn ${location.pathname === '/login' ? 'active' : ''}`}
                  style={{color : "black"}}
                >
                  <FaSignInAlt /> Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/register"
                  className={`nav-link sign-up-btn ${location.pathname === '/register' ? 'active' : ''}`}
                  style={{color : "black"}}
                >
                  <FaSignOutAlt /> Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  </header>
      
  );
};

export default Header;