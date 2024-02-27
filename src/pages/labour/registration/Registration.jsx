import PersonalDetailsForm from './Personal';
import {
  LinearProgress,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import logo from '../../../assets/images/Karnataka_logo_100_Pixels.png';
import language from '../../../assets/images/translate (1).svg';
import address from '../../../assets/images/apartment.svg';
import addressWhite from '../../../assets/images/apartment-white.svg';
import person from '../../../assets/images/person black-01.svg';
import personWhite from '../../../assets/images/person-01.svg';
import family from '../../../assets/images/family-silhouette.svg';
import familyWhite from '../../../assets/images/family-silhouette-white.svg';
import bank from '../../../assets/images/bank-building-grey.svg';
import bankRed from '../../../assets/images/bank-building.svg';
import certificate from '../../../assets/images/certificate.svg';
import certificateWhite from '../../../assets/images/All-01.svg';
import bankWhite from '../../../assets/images/bank-building-white.svg';
import text from '../../../translations';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import back from '../../../assets/images/Icon awesome-arrow-circle-left.svg';
import Address from './Address';
import Family from './Family';
import Bank from './Bank';
import NintyDays from './NintyDays';
import Review from './Review';

const Registration = (props) => {
  const navigate = useNavigate();
  const [renderComponent, setRenderComponent] = useState(0);
  const [editFamily, setEditFamiy] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const bar = useSelector((state) => state.number);

  const [allValues, setAllValues] = React.useState({
    language: '',
    users: null,
    activestep: 1,
    percentComplete: 30,
    editmode: false,
  });

  const { header } = text.en;
  const { en } = text;

  const editButtonPressed = (step) => {
    window.scrollTo(0, 0);

    setAllValues({
      ...allValues,
      activestep: step,
      percentComplete: 100,
      editmode: true,
    });
  };

  const saveEditButtonPressed = () => {
    window.scrollTo(0, 0);

    setAllValues({
      ...allValues,
      activestep: 6,
      editmode: false,
    });
  };

  const editDetails = () => {
    if (
      users?.getUserRegistrationDetails !== undefined &&
      users?.getUserRegistrationDetails !== null &&
      users?.getUserRegistrationDetails.personal_details !== undefined &&
      users?.getUserRegistrationDetails.personal_details.length > 0 &&
      users?.getUserRegistrationDetails.personal_details[0]
        .is_edit_profile_availed &&
      users?.getUserRegistrationDetails.personal_details[0]
        .is_edit_profile_availed === 1
    ) {
      showToast(
        'ERROR',
        'Please wait, you have already applied for edit profile request.',
      );
    } else if (
      users?.getUserRegistrationDetails !== undefined &&
      users?.getUserRegistrationDetails !== null &&
      users?.getUserRegistrationDetails.personal_details !== undefined &&
      users?.getUserRegistrationDetails.personal_details.length > 0 &&
      users?.getUserRegistrationDetails.personal_details[0]
        .is_renewal_scheme_claimed &&
      users?.getUserRegistrationDetails.personal_details[0]
        .is_renewal_scheme_claimed === 2
    ) {
      showToast(
        'ERROR',
        'Please wait, after your schemes status are approved or rejected, you will be able to edit your profile.',
      );
    } else {
      navigate('/edit-profile');
    }
  };

  const backButtonPressed = () => {
    if (allValues.activestep > 1) {
      setAllValues({
        ...allValues,
        activestep: allValues.activestep - 1,
      });
    } else if (allValues.activestep === 1) {
      navigate('/registration');
    }

    window.scrollTo(0, 0);

    switch (allValues.activestep - 1) {
      case 1:
        setAllValues({
          ...allValues,
          percentComplete: 0,
          activestep: 1,
        });
        break;
      case 2:
        setAllValues({
          ...allValues,
          percentComplete: 20,
          activestep: 2,
        });
        break;
      case 3:
        setAllValues({
          ...allValues,
          percentComplete: 40,
          activestep: 3,
        });
        break;
      case 4:
        setAllValues({
          ...allValues,
          percentComplete: 60,
          activestep: 4,
        });
        break;
      default:
        console.log('default');
    }
  };

  const nextButtonPressed = () => {};

  const finalSubmitButtonPressed = () => {
    setRenderComponent(5);
  };

  const handleChange = (event) => {
    setAllValues({
      ...allValues,
      [event.target.name]: event.target.value,
    });

    if (event.target.name === 'language')
      dispatch(setLocaleWithFallback(event.target.value));
  };

  return (
    <>
      <Row className="personal-div">
        <Row className="topbar-row">
          <Col xs={12} md={8} lg={9} className="top-bar-col">
            <div className="logo-div-profile">
              <Link to="/dashboard-user">
                <img id="logo" src={logo} alt="..." className="logo-img" />
              </Link>
              <h1 className="logo-text">
                {header.title} <br />
                {header.sub}
              </h1>
            </div>
          </Col>
          <Col xs={12} md={4} lg={3}>
            <Select
              className="select-language"
              style={{ width: '100%' }}
              variant="outlined"
              labelId="demo-simple-select-required-label"
              value={allValues.language}
              name="language"
              displayEmpty
              onChange={handleChange}
            >
              <MenuItem value="">
                <ListItemIcon>
                  <img alt="..." src={language} className="language-img" />
                </ListItemIcon>
                <ListItemText primary="Select Language" />
              </MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ka">Kannada</MenuItem>
              <MenuItem value="en">
                <ListItemText primary="English" />
              </MenuItem>
              <MenuItem value="ka">
                <ListItemText primary="ಕನ್ನಡ" />
              </MenuItem>
            </Select>
          </Col>
        </Row>

        <Row className="profile-title-row">
          <Col xs={10} className="profile-title">
            <Link to="/dashboardMigrant" className="profile-title-image">
              <img alt="..." className="cal-icon hover-icn" src={back} />
            </Link>
            <h1>{en.profileTitle}</h1>
          </Col>
          <Col xs={2} className="profile-title">
            {users?.user !== null && users?.user.is_approved ? (
              <>
                <Link to="/schemes-home" className="schemeLink">
                  <p>View Schemes</p>
                </Link>
              </>
            ) : (
              <></>
            )}
          </Col>
        </Row>

        <Row className="stepsdiv-above">
          <Col
            style={{ cursor: 'pointer' }}
            xs={2}
            sm={2}
            md={2}
            className="steps-col"
          >
            <div
              onClick={() => setRenderComponent(0)}
              className={`steps-div ${renderComponent == 0 && `activestep`} `}
            >
              <img
                alt="..."
                src={renderComponent == 0 ? personWhite : person}
              />
              <p className="mt-3">{en.personalDetails}</p>
            </div>
          </Col>
          <Col
            style={{ cursor: 'pointer' }}
            xs={2}
            sm={2}
            md={2}
            className="steps-col"
          >
            <div
              onClick={() => setRenderComponent(1)}
              className={`steps-div ${renderComponent == 1 && `activestep`} `}
            >
              <img
                alt="..."
                src={renderComponent == 1 ? addressWhite : address}
              />
              <p className="mt-3">{en.address}</p>
            </div>
          </Col>
          <Col
            style={{ cursor: 'pointer' }}
            xs={2}
            sm={2}
            md={2}
            className="steps-col"
          >
            <div
              onClick={() => setRenderComponent(2)}
              className={`steps-div ${renderComponent == 2 && `activestep`} `}
            >
              <img
                alt="..."
                src={renderComponent == 2 ? familyWhite : family}
              />
              <p className="mt-3">{en.familyDetails}</p>
            </div>
          </Col>
          <Col
            style={{ cursor: 'pointer' }}
            xs={2}
            sm={2}
            md={2}
            className="steps-col"
          >
            <div
              onClick={() => setRenderComponent(3)}
              className={`steps-div ${renderComponent == 3 && `activestep`} `}
            >
              <img alt="..." src={renderComponent == 3 ? bankWhite : bank} />
              <p className="mt-3">{en.bankDetails}</p>
            </div>
          </Col>
          <Col
            style={{ cursor: 'pointer' }}
            xs={2}
            sm={2}
            lg={4}
            className="steps-col"
          >
            <div
              onClick={() => setRenderComponent(4)}
              className={`steps-div ${renderComponent == 4 && `activestep`} `}
              style={{ padding: '20px 10px 12px' }}
            >
              <img
                alt="..."
                src={renderComponent == 4 ? certificateWhite : certificate}
              />
              <p className="mt-3">{en.nintyDays}</p>
            </div>
          </Col>
        </Row>

        <Row className="stepsdiv-title-responsive">
          {renderComponent === 0 && (
            <div>
              <img alt="..." src={address} />
              <p>Personal Details</p>
            </div>
          )}
          {renderComponent === 1 && (
            <div>
              <img alt="..." src={address} />
              <p>Residential Address</p>
            </div>
          )}
          {renderComponent === 2 && (
            <div>
              <img alt="..." src={family} />
              <p>Ration Card Details</p>
            </div>
          )}
          {renderComponent === 3 && (
            <div>
              <img alt="..." src={bankRed} />
              <p>Bank Passbook / Statement</p>
            </div>
          )}
          {renderComponent === 4 && (
            <div>
              <img alt="..." src={certificate} />
              <p>
                Details of 90 Days Work Certificate & Employer/Owner Details
              </p>
            </div>
          )}
        </Row>

        {allValues.activestep === 6 && (
          <Row className="all-details-title-row">
            <Col xs={12} className="profile-title">
              <h1>Find All Details</h1>
              {(users?.finalSubmit !== null &&
                users?.finalSubmit.data !== undefined &&
                users?.finalSubmit.data !== null &&
                users?.finalSubmit.data.success !== undefined &&
                users?.finalSubmit.data.success === true) ||
              (users?.user.is_sent_approval && users?.user.is_approved) ? (
                <Link
                  href="javascipt:void(0);"
                  onClick={editDetails}
                  className="linkStyle"
                >
                  (Edit Details)
                </Link>
              ) : null}
            </Col>
          </Row>
        )}

        <Row
          className={`progress-row ${allValues.activestep !== 6 ? 'sticky' : null}`}
        >
          <Col sm={12}>
            <div className="progress-text-div">
              <p className="progress-title">{en.dashRegistration}</p>
              <p className="progress-percent">{bar.number}% </p>
            </div>
            <LinearProgress
              variant="determinate"
              value={bar.number}
              className="progress"
            />
          </Col>
        </Row>

        <Row className="m-0 p-0 form-component-row">
          {renderComponent == 0 && (
            <PersonalDetailsForm
              setRenderComponent={setRenderComponent}
              backButtonPressed={backButtonPressed}
              saveEditButtonPressed={saveEditButtonPressed}
              nextButtonPressed={nextButtonPressed}
            />
          )}

          {renderComponent == 1 && (
            <Address
              setRenderComponent={setRenderComponent}
              backButtonPressed={backButtonPressed}
              saveEditButtonPressed={saveEditButtonPressed}
              nextButtonPressed={nextButtonPressed}
              {...props}
            />
          )}

          {renderComponent == 2 && (
            <Family
              editFamily={editFamily}
              setRenderComponent={setRenderComponent}
              backButtonPressed={backButtonPressed}
              saveEditButtonPressed={saveEditButtonPressed}
              nextButtonPressed={nextButtonPressed}
              {...props}
            />
          )}

          {renderComponent == 3 && (
            <Bank
              setRenderComponent={setRenderComponent}
              backButtonPressed={backButtonPressed}
              saveEditButtonPressed={saveEditButtonPressed}
              nextButtonPressed={nextButtonPressed}
              {...props}
            />
          )}

          {renderComponent == 4 && (
            <NintyDays
              setRenderComponent={setRenderComponent}
              backButtonPressed={backButtonPressed}
              saveEditButtonPressed={saveEditButtonPressed}
              nextButtonPressed={nextButtonPressed}
              {...props}
            />
          )}

          {renderComponent === 5 && (
            <Review
            setRenderComponent={setRenderComponent}
              setEditFamiy={setEditFamiy}
              backButtonPressed={backButtonPressed}
              editButtonPressed={editButtonPressed}
              finalSubmitButtonPressed={finalSubmitButtonPressed}
              {...props}
            />
          )}
        </Row>
      </Row>
    </>
  );
};

export default Registration;
