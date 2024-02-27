import {
  FormControl,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  IconButton,
  Typography,
  DialogContentText,
} from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Karnataka_logo_100_Pixels.png';
import graphic from '../../assets/images/undraw_under_construction_46pa.svg';
import Button from '@mui/material/Button';
import doc1 from '../../assets/documents/Employement certificate by the Employeer.pdf';
import React, { useState } from 'react';
import userManualKan from '../../assets/documents/user_manual_kan.pdf';
import DownloadIcon from '@mui/icons-material/Download';
import userManualEng from '../../assets/documents/user_manual_eng.pdf';
import mobile from '../../assets/images/Phone 1-01.svg';
import otp from '../../assets/images/Phone otp-01.svg';
import selfDec from '../../assets/documents/Self-declaration-form.pdf';
import closeIcon from '../../assets/images/close-01.svg';
import doc2 from '../../assets/documents/Employement certificate by the grama panchayath.pdf';
import doc3 from '../../assets/documents/Employement certificate by the labour inspector.pdf';
import doc4 from '../../assets/documents/Employement certificate by the Registration trade union.pdf';
import { generateOtp, getUser, loginUserHandler } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from "yup";
import cookie from 'react-cookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isActiveLogin, setIsActiveLogin] = useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [seconds, setSeconds] = React.useState(60);
  const [resendReset, setResendReset] = React.useState(false);

  const [isActiveExist, setIsActiveExist] = useState(false);

  const [allValues, setAllValues] = React.useState({
    open: false,
    phone: '',
    otp: '',
    users: PropTypes.object.isRequired,
    generate_otp: PropTypes.object.isRequired,
    login_user: PropTypes.object.isRequired,
    otp_sent: false,
    otp_sending: false,
    logging_in: false,
    phoneError: false,
    phoneErrorMessage: '',
    otpError: false,
    otpErrorMessage: '',
    openSnackbar: false,
    snackbarText: '',
    snackbarType: '',
    vertical: 'top',
    horizontal: 'right',
    resendReset: false,
  });

  const initialValues = {
    phone: "",
    otp: "",
  }

  const validationSchema = yup.object().shape({
    phone: yup.string().trim().required("*Phone Number is Required").min(10, "Phone number must be at least 10 characters").max(10, "Phone number must be at most 10 characters"),
    otp: yup.string().trim().required("*Otp is Required").min(6, "OTP must be at least 6 characters").max(6, "OTP must be at most 6 characters"),
  });

  const formik = useFormik(({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login_func()
    }
  }))

  const [isLoading, setIsLoading] = React.useState(false)

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDownloadListOpen = () => {
    setAllValues((prevState) => ({
      ...prevState,
      open: !prevState.open,
    }));
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  //To Login
  const handleLoginClick = () => {
    setIsActiveLogin(true);
    setIsActiveExist(false);
  };

  const handleExisitingClick = () => {
    navigate('/register');
    setIsActiveExist(true);
    setIsActiveLogin(false);
  };

  const handleClose = () => {
    setAllValues((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const getOtp = async (event) => {
    event.preventDefault();
    try {
      if (formik.values.phone.length === 10) {
        let dataToLogin = { phone_number: formik.values.phone };
        const response = await dispatch(generateOtp(dataToLogin));
        await dispatch(getUser(formik.values.phone))
        console.log('Successfully logged in with phone number ');
        if (response.payload.success) {
          toast.success('Otp Generated Successfully!', {
            position: 'bottom-right',
            theme: 'colored',
            autoClose: 3000,
          });
        } else if (response.payload.error) {
          console.log(response)
          toast.error(`${response.payload.errors.details.message}`, {
            position: 'bottom-right',
            theme: 'colored',
            autoClose: 3000,
          });
        }
      } else {
        setAllValues({
          ...allValues,
          phoneError: true,
          phoneErrorMessage: 'Enter Correct Mobile Number!',
        });
        console.log("Errorrrr..");
      }
    } catch (error) {
      console.log("Erorr is ", error);
      toast.error('Error Occur in Otp Generation!', {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 3000,
      });
    }

  };

  //Login function
  const login_func = async () => {
    try {
      if (formik.values.otp.length === 6) {
        const { HashData } = cookie.loadAll();
        let AllLoginData =
          { phone_number: formik.values.phone, otp: formik.values.otp, hash: HashData }
        const data = await dispatch(loginUserHandler(AllLoginData))
        console.log(data)
        if (data.payload.success) {
          toast.success('Submitted Successfully!', {
            position: 'bottom-right',
            theme: 'colored',
            autoClose: 3000,
          });
          navigate("/dashboardMigrant")
        } else if (data.payload.error) {
          toast.error(`${data.payload.errors.details.message}`, {
            position: 'bottom-right',
            theme: 'colored',
            autoClose: 3000,
          });
        }

      }
    } catch (error) {
      console.log(error);
    }
  };

  const ResendOTP = () => {
    if (seconds > 0) {
      setTimeout(
        () => setSeconds(seconds - 1),
        1000,
      );
      return (
        <p className="generate-otp2">Resend OTP after {seconds} seconds</p>
      );
    } else {
      setResendReset(true);
      setSeconds(60);
      setAllValues({
        ...allValues,
        otp_sent: false,
      });
      return null;
    }
  };

  return (
    <Row className="login-div">
      <ToastContainer />
      <Col xs={12} lg={6} xl={6} xxl={6}>
        <Row>
          <Col sm={12}>
            <div className="logo-div d-flex justify-content-start text-center">
              <img
                id="logo"
                src={logo}
                alt="..."
                className="logo-img-admin1 d-flex justify-content-start"
              />
              <div className="logo-head d-flex justify-content-start text-center">
                <h1
                  className="logo-text d-flex justify-content-start text-center"
                  style={{ color: '#CA0027', fontSize: '25px' }}
                >
                  ಕಾರ್ಮಿಕ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ
                </h1>
                <h1
                  className="logo-text d-flex justify-content-start text-center"
                  style={{ color: '#CA0027', fontSize: '25px' }}
                >
                  Labour Department, Government of Karnataka
                </h1>
              </div>
            </div>
          </Col>
          <Col sm={12} className="login-img-col">
            <img className="login-img" alt="..." src={graphic} />
          </Col>
          <Col sm={12} className="copyright">
          </Col>
        </Row>
      </Col>

      <Col xs={12} lg={6} className="login-form">
        <div className="d-flex justify-content-center align-items-center">
          <Typography color="error" className="text-center w-75 p-2 mt-2">
            Please go through once with the user manual before using the
            Application.
            <button
              style={{
                color: 'blue',
                outline: 'none',
                background: 'none',
                border: 'none',
              }}
              onClick={handleClickOpenDialog}
            >
              Click here to download the user manual
            </button>
          </Typography>

          <Dialog open={openDialog} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">
              User Manual for KBOCWWB Application
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <a
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                  href={userManualKan}
                  download="User Manual Kannada"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button color="info" startIcon={<DownloadIcon />}>
                    Download in Kannada
                  </Button>
                </a>
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                <a
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                  href={userManualEng}
                  download="User Manual English"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button color="info" startIcon={<DownloadIcon />}>
                    Download in English
                  </Button>
                </a>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="login-form-container">
          <div className="div-bar text-center row">
            <Button
              variant="contained"
              className="col w-50 btn-switch text-capitalize text-center"
              size="lg"
              onClick={handleLoginClick}
              style={{
                backgroundColor: isActiveLogin ? '#CA0027' : '#dee2e6',
                color: isActiveExist ? 'black' : '',
              }}
            >
              Login
            </Button>
            <Button
              className="col w-50 btn-switch text-capitalize text-center"
              variant="contained"
              size="lg"
              onClick={handleExisitingClick}
              style={{
                backgroundColor: isActiveExist ? '#CA0027' : '#dee2e6',
                color: isActiveExist ? '' : 'black',
              }}
            >
              Register
            </Button>
          </div>
          <div className="d-flex justify-content-center">
            <p
              className="w-100 text-center note-new-reg"
              style={{ color: '#CA0027' }}
            >
              Note: "If you are already existing Seva Sindhu Construction Worker
              / New Construction Worker then, use 'Register' tab above"
            </p>
          </div>

          <p className="phno-label" style={{ fontSize: '18px' }}>
            ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ / Enter your mobile number
          </p>

          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth className="phno-field">
              <TextField
                className='size21'
                variant="outlined"
                placeholder="XXXXX XXXXX"
                name="phone"
                type="text"
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                inputProps={{ maxLength: 10 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={mobile} alt="..." className="phone-icon" />
                      <p className="countrycode">+91</p>
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  const inputValue = event.target.value;
                  if (/^\d*$/.test(inputValue) && inputValue.length <= 10) {
                    formik.handleChange(event);
                  }
                }}
              />
            </FormControl>
            {formik.errors.phone && formik.touched.phone && (
              <p style={{ color: "red" }}>{formik.errors.phone}</p>
            )}

            {allValues.otp_sending ? (
              <CircularProgress className="loader-otp" />
            ) : (
              <>

                {!allValues.otp_sent ? (
                  <Button onClick={(event) => getOtp(event)}>
                    <p
                      className="generate-otp mb-5"
                      style={{ color: '#CA0027' }}
                    >
                      {resendReset ? 'Resend new OTP  ' : 'Generate OTP'}
                    </p>
                  </Button>
                ) : (
                  <ResendOTP />
                )}
              </>
            )}

            <p
              className="phno-label  mb-0"
              style={{ fontSize: '18px', marginTop: '100px' }}
            >
              ನೀವು ಸ್ವೀಕರಿಸಿದ OTP ಅನ್ನು ನಮೂದಿಸಿ / Enter your Received OTP
            </p>
            <FormControl fullWidth className="otp-form">
              <TextField
                className="size31"
                name="otp"
                type="password"
                value={formik.values.otp}
                placeholder=""
                helperText={
                  allValues.otpError ? 'Please enter correct OTP!' : ''
                }
                variant="outlined"
                inputProps={{ maxLength: 6 }}
                onChange={(event) => {
                  const inputValue = event.target.value;
                  if (/^\d*$/.test(inputValue) && inputValue.length <= 6) {
                    formik.handleChange(event);
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={otp} alt="..." className="otp-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            {formik.errors.otp && formik.touched.otp ? (
              <p style={{ color: "red" }}>{formik.errors.otp}</p>
            ) : (
              ""
            )}

            {allValues.logging_in ? (
              <>
                <CircularProgress className="loader-otp" />
              </>
            ) : (
              <>
                <FormControl fullWidth className="loginbuttondiv">
                  <button className="login-button" type="submit">
                    {isLoading ? <CircularProgress size={"2rem"} color='inherit' /> :
                      <div> ಲಾಗಿನ್ / Login</div>
                    }
                  </button>
                </FormControl>
              </>
            )}
          </form>

          <div className="cert-template-div" onClick={handleDownloadListOpen}>
            Click here to download Employment Certificate Template / <br />
            ಉದ್ಯೋಗ ಪ್ರಮಾಣಪತ್ರ ಟೆಂಪ್ಲೇಟ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ
          </div>

          <a
            style={{ color: 'inherit' }}
            href={selfDec}
            download="Self Declaration Form"
            target="_blank"
            rel="noreferrer"
          >
            <div className="cert-template-div">
              Click here to download Self Declaration Form Template / <br />
              ಸ್ವಯಂ ಘೋಷಿತ ಪತ್ರ ಟೆಂಪ್ಲೇಟ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ
            </div>
          </a>

          <Dialog
            //change this later with login for reason
            disaableonClose
            disableEscapeKeyDown
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            open={allValues.open}
            onClose={handleClose}
          >
            <DialogTitle className="download-dialog-title">
              Download Employee Certificate
              {handleClose ? (
                <IconButton
                  aria-label="close"
                  className="dwnldclosebtn"
                  onClick={handleClose}
                >
                  <img
                    alt="..."
                    src={closeIcon}
                    style={{ width: '30px', height: '30px' }}
                  />
                </IconButton>
              ) : null}
            </DialogTitle>
            <DialogContent className="download-dialog">
              <List component="nav" aria-label="mailbox folders">
                <a
                  href={doc1}
                  download="Employment certificate by the Employeer"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ListItem button>
                    <ListItemText primary="Employment certificate by the Employer" />
                    <GetApp />
                  </ListItem>
                </a>
                <Divider light />
                <a
                  href={doc2}
                  download="Employment certificate by the Grama Panchayat"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ListItem button>
                    <ListItemText primary="Employment certificate by the Grama Panchayat" />
                    <GetApp />
                  </ListItem>
                </a>
                <Divider light />
                <a
                  href={doc3}
                  download="Employment certificate by the Labour Inspector"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ListItem button>
                    <ListItemText primary="Employment certificate by the Labour Inspector" />
                    <GetApp />
                  </ListItem>
                </a>
                <Divider light />
                <a
                  href={doc4}
                  download="Employment certificate by the Registration Trade Union"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ListItem button>
                    <ListItemText primary="Employment certificate by the Registration Trade Union" />
                    <GetApp />
                  </ListItem>
                </a>
              </List>
            </DialogContent>
            <DialogActions className="download-dialog-button">
              <Button autoFocus color="primary" onClick={handleClose}>
                Back
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Col>

      <Col sm={12} className="copyright"></Col>
    </Row>
  );
};

export default Login;