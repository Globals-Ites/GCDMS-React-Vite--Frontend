import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import logo from '../../assets/images/Karnataka_logo_100_Pixels.png';
import graphic from '../../assets/images/undraw_under_construction_46pa.svg';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import validator from 'validator';
import mobile from '../../assets/images/Phone 1-01.svg';
import otp from '../../assets/images/Phone otp-01.svg';
import { Link } from 'react-router-dom';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import DownloadIcon from '@mui/icons-material/Download';
import userManualEng from '../../assets/documents/user_manual_eng.pdf';
import userManualKan from '../../assets/documents/user_manual_kan.pdf';
import Button2 from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { SERVER, generateOtpRegistration } from '../../features/auth/authSlice';
import { showToast } from '../../utils/tools1';
import { registerUser } from '../../features/auth/registerSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = React.useState('sevasindhu');

  const [registrationNumber, setRegistrationNumber] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [sevaSindhuPhone, setSevaSindhuPhone] = useState('');
  const [sevaSindhuOTP, setSevaSindhuOTP] = useState('');
  const [isOTPSending, setIsOTPSending] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [seconds, setSeconds] = React.useState(60);
  const [resendReset, setResendReset] = React.useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isDisableBtn, setIsDisableBtn] = useState(false);
  const [userId, setUserId] = useState('');
  const [isSevaOTPSending, setIsSevaOTPSending] = useState(false);
  const [isSevaOTPSent, setIsSevaOTPSent] = useState(false);
  const [isSevaPhoneError, setIsSevaPhoneError] = useState(false);
  const [sevaPhoneErrorMessage, setSevaPhoneErrorMessage] = useState('');
  const [isSevaOTPError, setIsSevaOTPError] = useState(false);
  const [sevaOTPErrorMessage, setSevaOTPErrorMessage] = useState('');
  const [hashNumber, setHashNumber] = useState('');

  const [isActiveLogin, setIsActiveLogin] = useState(false);
  const [isActiveExist, setIsActiveExist] = useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);

  const [isDisableVerifyBtn, setIsDisableVerifyBtn] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleLoginClick = () => {
    // history.push("/login")
    navigate('/login');
    setIsActiveLogin(true);
    setIsActiveExist(false);
  };

  const handleExisitingClick = () => {
    // history.push("/register")
    navigate('/register');
    setIsActiveExist(true);
    setIsActiveLogin(false);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const sevaSindhuRegistrationHandler = (event) => {
    if (event.target.name === 'regNo') {
      setRegistrationNumber(event.target.value);
    } else if (event.target.name === 'refNo') {
      setReferenceNumber(event.target.value);
    } else if (event.target.name === 'sevaPhone') {
      if (
        validator.isNumeric(event.target.value) &&
        event.target.value.length === 10
      ) {
        setIsSevaPhoneError(false);
        setIsSevaOTPSent(false);
        setIsSevaOTPError(false);
        setSevaPhoneErrorMessage('');
      } else {
        setIsSevaPhoneError(true);
        setSevaPhoneErrorMessage('Enter Correct Mobile Number');
      }
      setSevaSindhuPhone(event.target.value);
    } else if (event.target.name === 'sevaOTP') {
      setSevaSindhuOTP(event.target.value);
    }
  };

  const getOtp = async (event) => {
    event.preventDefault();
    if (
      formik.values.newPhone !== undefined &&
      formik.values.newPhone !== null &&
      formik.values.newPhone.length === 10
    ) {
      setError(false);
      var boardId = 1;
      let dataToDispatch = {
        mobile_code: '+91',
        phone_number: formik.values.newPhone,
        board_id: boardId,
      };
      console.log(dataToDispatch);
      const response = await dispatch(generateOtpRegistration(dataToDispatch));
      console.log(response);
      if (response.payload.success) {
        toast.success('Otp Generated Successfully!', {
          position: 'bottom-right',
          theme: 'colored',
          autoClose: 3000,
        });
      } else if (response.payload.error) {
        console.log(response);
        toast.error(`${response.payload.errors.details.message}`, {
          position: 'bottom-right',
          theme: 'colored',
          autoClose: 3000,
        });
      }
    } else {
      setError(true);
      toast.error('Error Occur in Otp Generation!', {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 3000,
      });
    }
  };

  const registration_func = async () => {
    let dataToRegister = {
      hash: Cookies.get('hash'),
      phone_number: formik.values.newPhone,
      mobile_code: '+91',
      board_id: 1,
      otp: formik.values.newOTP,
      login_user_id: 1,
      inspection_id: 0,
    };
    const data = await dispatch(registerUser(dataToRegister));
    if (data.payload.success) {
      toast.success('Submitted Successfully!', {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 3000,
      });
      navigate('/dashboardMigrant');
    } else if (data.payload.error) {
      toast.error(`${data.payload.errors.details.message}`, {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 3000,
      });
    } else {
      toast.error('Internal Error', {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 3000,
      });
    }
  };

  const handleVerify = (ev) => {
    if (registrationNumber && referenceNumber) {
      setIsDisableVerifyBtn(true);
      console.log('in_Verify');
      var data = JSON.stringify({
        registration_number: registrationNumber,
        application_reference_number: referenceNumber,
      });

      var config = {
        method: 'post',
        url: SERVER + '/seva_sindhu/check_user_in_seva_sindhu',
        data: data,
      };

      axios(config)
        .then(function (response) {
          if (response.data.data.length > 0) {
            if (
              response.data.data[0].IS_Freezed ||
              +response.data.data[0].ISACTIVEUSER === 0
            ) {
              showToast('ERROR', 'Your Card has been freezed');
            } else {
              setIsVerified(true);
              setIsDisableBtn(false);
              showToast('SUCCESS', 'Successfully Verified');
              sessionStorage.setItem('TempID', response.data.data[0].id);
              sessionStorage.setItem(
                'LabourName',
                response.data.data[0].applicantname,
              );
            }
          }
        })
        .catch(function (error) {
          console.log(error);
          showToast('ERROR', `${error.response.data.errors.msg}`);
          setIsDisableVerifyBtn(false);
        });
    } else {
      showToast('ERROR', 'Please fill all the mandatory fields');
    }
  };

  const getSevaSindhuOtp = (event) => {
    event.preventDefault();
    console.log('USerID', userId);

    if (userId > 0) {
      showToast('ERROR', 'Mobile Number already registered');
    } else {
      if (!isSevaPhoneError && sevaSindhuPhone.length === 10) {
        setIsSevaOTPSending(!isSevaOTPSending);

        let dataToLogin = {
          mobile_code: '+91',
          phone_number: sevaSindhuPhone,
          board_id: 1,
        };
        // console.log("dataToLogin: " + JSON.stringify(dataToLogin))

        var config = {
          method: 'post',
          url: SERVER + '/user/non-register-labour-send',
          data: dataToLogin,
        };

        axios(config)
          .then(function (response) {
            console.log('response', response);

            setIsSevaOTPSending(false);
            setIsSevaOTPSent(true);
            setHashNumber(response.data.data.hash);
            showToast('SUCCESS', 'OTP has been sent Successfully.');
          })
          .catch(function (error) {
            console.log(error);
            showToast('ERROR', 'There was an error connecting to the server.');
          });
      } else {
        setIsSevaPhoneError(true);
        setSevaPhoneErrorMessage('Enter Correct Mobile Number!');
      }
    }
  };

  const login_func = (event) => {
    event.preventDefault();
    if (
      !isSevaPhoneError &&
      sevaSindhuPhone.length === 10 &&
      sevaSindhuOTP !== ''
    ) {
      let dataToLogin = {
        otp: sevaSindhuOTP,

        hash: hashNumber,
        phone_number: sevaSindhuPhone,
      };
      var config = {
        method: 'post',
        url: SERVER + '/auth/verify-otp-nonuser',
        data: dataToLogin,
      };

      axios(config)
        .then(function (response) {
          console.log('response', response);
          sessionStorage.setItem('mobileNumber', sevaSindhuPhone);
          sessionStorage.setItem('registrationID', registrationNumber);
          sessionStorage.setItem('referenceID', referenceNumber);
          navigate('/already-registered');
        })
        .catch(function (error) {
          console.log(error);
          showToast('ERROR', 'Please enter correct OTP.');
        });
    } else if (isSevaPhoneError || sevaSindhuPhone.length !== 10) {
      setIsSevaPhoneError(true);
      setSevaPhoneErrorMessage('Enter Correct Mobile Number!');
    } else if (otp === '') {
      setIsSevaOTPError(true);
      setSevaOTPErrorMessage('Please enter correct OTP!');
    }
  };

  const ResendOTP = () => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
      return (
        <p className="generate-otp2 mb-5">Resend OTP after {seconds} seconds</p>
      );
    } else {
      setResendReset(true);
      setSeconds(60);

      setIsSevaOTPSent(false);
      return null;
    }
  };

  const initialValues = {
    newPhone: '',
    newOTP: '',
  };

  const validationSchema = yup.object().shape({
    newPhone: yup
      .string()
      .trim()
      .required('*Phone Number is Required')
      .min(10, 'Phone number must be at least 10 characters')
      .max(10, 'Phone number must be at most 10 characters'),
    newOTP: yup
      .string()
      .trim()
      .required('*Otp is Required')
      .min(6, 'OTP must be at least 6 characters')
      .max(6, 'OTP must be at most 6 characters'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      console.log(values);
      registration_func(values);
    },
  });

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
                  {/* Karnataka Building & Other Construction <br />Workers Welfare Board (KBOCWWB) */}
                </h1>
              </div>
            </div>
          </Col>
          <Col sm={12} className="login-img-col">
            <img className="login-img" alt="..." src={graphic} />
          </Col>
          <Col sm={12} className="copyright">
            {/* <p>Karnataka Building & Other Construction Workers Welfare Board (KBOCWWB), Government of Karnataka</p> */}
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
          <Dialog open={openDialog} onClose={handleCloseDialog}>
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
                  <Button2 color="info" startIcon={<DownloadIcon />}>
                    Download in Kannada
                  </Button2>
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
                  <Button2 color="info" startIcon={<DownloadIcon />}>
                    Download in English
                  </Button2>
                </a>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button2 onClick={handleCloseDialog}>Close</Button2>
            </DialogActions>
          </Dialog>
        </div>

        <div className="login-form-container">
          {/* <h2 className="login-form-head" style={{color:'#535353'}}>ಲಾಗಿನ್ / LOGIN </h2> */}

          {/* 6 month removal */}
          <div className="div-bar text-center row">
            <Button
              variant="contained"
              className="col btn-switch text-capitalize text-center"
              size="large"
              onClick={handleLoginClick}
              style={{
                backgroundColor: isActiveLogin ? '#CA0027' : '#dee2e6',
                color: isActiveExist ? 'black' : '',
              }}
            >
              Login
            </Button>
            <Button
              className="col btn-switch text-capitalize text-center"
              variant="contained"
              size="large"
              onClick={handleExisitingClick}
              style={{
                backgroundColor: isActiveExist ? '#CA0027' : '#dee2e6',
                color: isActiveExist ? 'white' : 'black',
              }}
            >
              Register
            </Button>
          </div>

          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="sevasindhu"
                control={<Radio />}
                label="Already Existing Seva Sindhu Construction Worker / E-Karmika Construction Worker"
              />
              <FormControlLabel
                value="newlabour"
                control={<Radio />}
                label="Register as New Construction Worker"
              />
            </RadioGroup>
          </FormControl>

          <div className="d-flex justify-content-center align-items-center mt-5 flex-column">
            {/* <p className='w-100 text-center note-new-reg' style={{color:'#CA0027'}}>Note 1: "If you are already registered user and linked your Mobile number,kindly use 'Login' tab above for logging in"</p> */}
            <p
              className="w-100 text-center note-new-reg"
              style={{ color: '#CA0027' }}
            >
              Note : "For E-Karmika Labour Registration, Reference Number will
              be same as Registration Number"
            </p>
          </div>

          {value === 'sevasindhu' ? (
            <div className="row d-flex flex-column">
              <p
                className="login-form-head-sub2 w-100 ms-2 col"
                style={{ fontSize: '21px' }}
              >
                Registration Number* / ನೋಂದಣಿ ಸಂಖ್ಯೆ*
              </p>
              <div
                className="col mt-1 mb-4 ms-5 w-100 newReg"
                style={{ border: '1px solid #707070' }}
              >
                <TextField
                  type={'text'}
                  className="w-100"
                  variant="outlined"
                  name="regNo"
                  value={registrationNumber}
                  onChange={sevaSindhuRegistrationHandler}
                  disabled={isVerified ? true : false}
                  // error={allValues.registration_id_error}
                  placeholder="Example: Lo-Bhadravati 2/SHI/RGN.660583/2020-21"
                  // helperText={allValues.registration_id_error ? "Please enter numbers only" : ""}

                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                ></TextField>
              </div>
              <p className="d-flex ms-5 justify-content-end sub-reg-req">
                As per Labour Card
              </p>

              <p
                className="login-form-head-sub2 w-100 ms-2 col"
                style={{ fontSize: '21px' }}
              >
                Reference Number* / ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ*
              </p>
              <div
                className="col mt-1 mb-4 ms-5 w-100 newReg"
                style={{ border: '1px solid #707070' }}
              >
                <TextField
                  type={'text'}
                  className="w-100"
                  variant="outlined"
                  name="refNo"
                  value={referenceNumber}
                  onChange={sevaSindhuRegistrationHandler}
                  disabled={isVerified ? true : false}
                  // error={allValues.registration_id_error}
                  placeholder="Example: LD007S200847322"
                  // helperText={allValues.registration_id_error ? "Please enter numbers only" : ""}

                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                ></TextField>
              </div>
              <p className="d-flex ms-5 justify-content-end sub-reg-req">
                As per Labour Card
              </p>

              {isVerified === false ? (
                <div className="d-flex justify-content-end align-items-end ms-2">
                  <div
                    className="row ms-4 d-flex justify-content-end"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <p
                      style={{
                        pointerEvents: isDisableVerifyBtn ? 'none' : 'all',
                      }}
                      className="login-button w-25 bottom-btn"
                      onClick={handleVerify}
                    >
                      Verify
                    </p>
                  </div>
                </div>
              ) : null}

              {isVerified ? (
                <div>
                  <p
                    className="login-form-head-sub2 w-100 ms-2 my-0 col"
                    style={{ fontSize: '21px' }}
                  >
                    Mobile Number* / ಮೊಬೈಲ್ ಸಂಖ್ಯೆ*
                  </p>
                  <div
                    className="col mt-1 mb-4 ms-5 w-100 newReg"
                    style={{ border: '1px solid #707070' }}
                  >
                    <TextField
                      type={'text'}
                      className="w-100"
                      variant="outlined"
                      name="sevaPhone"
                      value={sevaSindhuPhone}
                      onChange={sevaSindhuRegistrationHandler}
                      error={isSevaPhoneError}
                      placeholder=""
                      helperText={
                        isSevaPhoneError
                          ? 'Please enter correct Phone Number'
                          : ''
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <img
                              src={mobile}
                              alt="Mobile Icon"
                              className="phone-icon"
                            />
                          </InputAdornment>
                        ),
                      }}
                    ></TextField>
                  </div>

                  <div className="row">
                    {!isSevaOTPSent ? (
                      <div className="d-flex justify-content-end align-items-end ms-5">
                        <Link
                          to="#"
                          onClick={(event) => getSevaSindhuOtp(event)}
                        >
                          <p className="login-button bottom-btn otp-btn">
                            {resendReset ? 'Resend new OTP  ' : 'Generate OTP'}
                          </p>
                        </Link>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-end align-items-end ms-4">
                        <ResendOTP />
                      </div>
                    )}
                  </div>

                  <p
                    className="login-form-head-sub2 w-100 ms-2 col"
                    style={{ fontSize: '21px' }}
                  >
                    Enter OTP* / ಒಟಿಪಿ ನಮೂದಿಸಿ*
                  </p>
                  <div
                    className="col mt-1 mb-4 ms-5 w-100 newReg"
                    style={{ border: '1px solid #707070' }}
                  >
                    <TextField
                      type={'password'}
                      className="w-100"
                      variant="outlined"
                      name="sevaOTP"
                      value={sevaSindhuOTP}
                      onChange={sevaSindhuRegistrationHandler}
                      error={isSevaOTPError}
                      // placeholder=""
                      helperText={
                        isSevaOTPError ? 'Please enter correct OTP!' : ''
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    ></TextField>
                  </div>
                  <div className="d-flex justify-content-end align-items-end ms-4">
                    <Link to="#" onClick={(event) => login_func(event)}>
                      <p className="login-button bottom-btn" type="submit">
                        Submit
                      </p>
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <div className="note">
                ಆಧಾರ್ ನೋಂದಾಯಿತ ಪ್ರಕಾರ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ / Enter Mobile
                Number as per the Aadhaar Registered
              </div>

              <form noValidate onSubmit={formik.handleSubmit}>
                <FormControl fullWidth className="reg-phno-field">
                  <TextField
                    className="size21"
                    variant="outlined"
                    placeholder="XXXXX XXXXX"
                    name="newPhone"
                    type="text"
                    value={formik.values.newPhone}
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
                {formik.errors.newPhone && formik.touched.newPhone ? (
                  <p style={{ color: 'red' }}>{formik.errors.newPhone}</p>
                ) : (
                  ''
                )}
                {error && (
                  <p style={{ color: 'red' }}>Enter Valid Mobile Number</p>
                )}

                {isOTPSending ? (
                  <CircularProgress className="loader-otp" />
                ) : (
                  <Link to="#" onClick={(event) => getOtp(event)}>
                    <p className="generate-otp">
                      {/* ಒಟಿಪಿ ಬಳಸಿ / Generate OTP */}
                      {isOTPSent
                        ? 'ಹೊಸ ಒಟಿಪಿ ಅನ್ನು ಮರುಕಳುಹಿಸಿ / Resend new OTP'
                        : 'ಒಟಿಪಿ ಬಳಸಿ / Generate OTP'}
                    </p>
                  </Link>
                )}

                <p className="reg-otp-label">
                  ನಿಮ್ಮ ಒಟಿಪಿಯನ್ನು ನಮೂದಿಸಿ / Enter Your OTP
                </p>

                <FormControl fullWidth className="reg-otp-form">
                  <TextField
                    name="newOTP"
                    type="password"
                    className="size31"
                    variant="outlined"
                    value={formik.values.newOTP}
                    placeholder="ನಿಮ್ಮ ಒಟಿಪಿಯನ್ನು ನಮೂದಿಸಿ / Enter Your OTP"
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
                {formik.errors.newOTP && formik.touched.newOTP ? (
                  <p style={{ color: 'red' }}>{formik.errors.newOTP}</p>
                ) : (
                  ''
                )}

                {isSubmitting ? (
                  <CircularProgress className="loader-otp" />
                ) : (
                  <button className="login-button" type="submit">
                    ಸಲ್ಲಿಸು / Submit
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Register;
