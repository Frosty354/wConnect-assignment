import{ useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser, setUser  } from '../redux/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css'

import { Box,  Link, TextField, Typography,  } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';


const LoginForm = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [checked, setChecked] = useState(false);
  const [inactivityTimer, setInactivityTimer] = useState(0);
  const navigate = useNavigate();
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  
  const dispatch = useDispatch();
  const handleLoginSuccess = () => {
    toast.success('Successfully logged in!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleLoginFailure = () => {
    toast.error('Invalid username or password. Please try again.', {
      position: 'top-right',
      autoClose: 3000,
    });
  };
  
  const handleLogin = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://reqres.in/api/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const responseData = await response.json();
        handleLoginSuccess();
        dispatch(setUser(responseData.token));
        navigate('/home');
        const timer = setTimeout(() => {
          // Log the user out here
          dispatch(clearUser()); // Clear user data in Redux
          // localStorage.removeItem('userData'); // Clear user data in localStorage
          toast.info('You have been logged out due to inactivity.', {
            position: 'top-right',
            autoClose: 3000,
          });
          navigate('/');
        }, 5 * 60 * 1000);
        if (inactivityTimer) {
          clearTimeout(inactivityTimer);
        }

        // Set the new inactivity timer
        setInactivityTimer(timer);
      }
      else{
        handleLoginFailure();
      }
    } catch (error) {
        
      console.log(error);
    }
  };

  const handleUserActivity = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    // Set a new inactivity timer
    const timer = setTimeout(() => {
      // Log the user out due to inactivity
      dispatch(clearUser());
      // localStorage.removeItem('userData');
      toast.info('You have been logged out due to inactivity.', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/');
    }, 5 * 60 * 1000);

    setInactivityTimer(timer);
  };


  useEffect(() => {
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
    };
  }, []);

  return (
    <div className="form-container">
      <div className='image-container'>
        <img src={`https://drive.google.com/uc?export=view&id=1hvRAGrdq0SqFBZApx2--IcuDf-DOmOBH`} alt='wissen-logo'/>
      </div>
      <Typography className='subText'><strong>Hello there, Sign in to Continue</strong></Typography>
      <form>
        <div className="form-group">
          <label className="label">Email</label>
          <TextField
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label">Password</label>
          <TextField
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{endAdornment:<VisibilityIcon color='action'/>}}
          />
        </div>
        <Box sx={{
          display:'flex',
          justifyContent:'space-between',
          textAlign:'left',
          pt:2,
          pb:4
          }}>
          <input
            type='checkbox'
            checked={checked}
            onChange={handleChange}
            required
            className='checkBox-input'
           
          />
          
            <label>By creating or logging into an account, you <br/>
              are agreeing with our <strong>Terms & Conditions</strong><br/>
              and <strong>Privacy Policys.</strong>
            </label>
          
        </Box>
        <button disabled={!checked || !email.length|| !password.length} className="button" onClick={handleLogin}>Next</button>
      </form>
      <div style={{paddingTop:'40px'}}>
        <Link underline='none'><strong>Signin with company SSO</strong></Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
