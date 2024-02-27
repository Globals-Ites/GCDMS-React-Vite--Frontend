//import Header2 from 'components/mainScreens/Header2';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, Paper } from '@material-ui/core';
import axios from 'axios';
//import { SERVER } from 'store/actions/user.actions';
import { Button, Typography } from '@mui/material';
//mport { showToast } from 'utils/tools';
import Button2 from '@mui/material/Button';
import { SERVER } from '../../features/auth/authSlice';
const EducationStatus = () => {
  const [referenceNumber, setReferenceNumber] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const handleStatus = () => {
    if (referenceNumber) {
      setShowStatus(true);
      setLoading(true);
      axios
        .get(
          `${SERVER}/internal/schemes/education/status?refNumber=${referenceNumber}`,
        )
        .then((res) => {
          console.log(res.data.message);
          setFetchStatus(res.data.message);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      showToast('ERROR', 'Please enter Application Reference Number');
    }
  };
  return (
    <>
      {/* <Header2/> */}
      {/* <div className='d-flex justify-content-center align-items-center w-100 flex-column my-5'>
<h4 className='schemesHome-title' >Education Assistance Status</h4> 
<div className='d-flex justify-content-center align-content-center flex-row w-25 mx-3'>
    <input
        className='w-100 education-input-field'
        placeholder='Enter Application Reference Number'
        value={referenceNumber}
        onChange={(ev) => setReferenceNumber(ev.target.value) }
    />  
    <Button onClick={handleStatus} className='mx-3' variant='contained' color='info'>Check</Button>
    </div>
   {showStatus ?  
   <h4 
   className={` ${loading ? null :'status-message'}`}>
   {loading ? "Please wait..." : fetchStatus && fetchStatus.length && fetchStatus}
   </h4>
    : null}
</div> */}
      <div className="root">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 400,
              height: 420,
            },
          }}
        >
          <Paper elevation={0}>
            <div
              className="d-flex justify-content-center align-items-center flex-column p-2 m-2"
              style={{}}
            >
              {/* <p style={{fontSize:'18px',color:'#CA0027',padding:'2px',margin:'2px',fontWeight:'700'}}>Enter Application Reference Number</p> */}
              <div className="p-2 m-2">
                <input
                  className="change-password-input"
                  type="text"
                  placeholder="Enter Reference Number"
                  // name="oldpassword"
                  value={referenceNumber}
                  onChange={(ev) => setReferenceNumber(ev.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center align-items-center w-100">
                <Button2
                  className="w-50"
                  onClick={handleStatus}
                  variant="contained"
                  color="info"
                >
                  Check
                </Button2>
              </div>
              {showStatus ? (
                <div className="d-flex justify-content-center text-center align-items-center py-5">
                  <Paper
                    style={{ width: '320px', height: '160px' }}
                    elevation={3}
                  >
                    <Typography className="d-flex justify-content-center text-center align-items-center pt-5">
                      {loading
                        ? 'Please wait'
                        : fetchStatus && fetchStatus.length && fetchStatus}
                    </Typography>
                  </Paper>
                </div>
              ) : null}
            </div>
          </Paper>
        </Box>
      </div>
    </>
  );
};
export default EducationStatus;