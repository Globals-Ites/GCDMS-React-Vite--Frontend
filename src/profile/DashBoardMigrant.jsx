// import 'date-fns';
import {
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  Divider,
  withStyles,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextareaAutosize,
  SwipeableDrawer,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import logo from '../assets/images/Karnataka_logo_100_Pixels.png';
// import home from '../assets/images/Icon material-dashboard 2.svg'
// import homewhite from '../assets/images/Icon material-dashboard.svg'
// import register from '../assets/images/register-01.svg'
// import user from '../assets/images/Icon awesome-user-edit.svg'
// import userwhite from '../assets/images/Icon awesome-user-edit 2.svg'
// import board from '../assets/images/Icon awesome-chalkboard-teacher.svg'
// import boardwhite from '../assets/images/Icon awesome-chalkboard-teacher 2.svg'
// import config from '../assets/images/Icon awesome-tools.svg'
// import configwhite from '../assets/images/Icon awesome-tools 2.svg'
// import mapping from '../assets/images/Icon awesome-link.svg'
// import arrowForward from '../assets/images/Icon ionic-ios-arrow-forward.svg'
import CloseIcon from '@material-ui/icons/Close';
import ECard from '../assets/images/ecard-01.svg';
import incomplete from '../assets/images/2931158-200-01 copy.svg';
import pendingicon from '../assets/images/2931158-200-01.svg';
import usericon from '../assets/images/Icon awesome-user.svg';
import checkwhite from '../assets/images/Subtraction 1.svg';
import Registration from '../assets/images/Registration svg-01.svg';
import Renewal from '../assets/images/Renew Subscription-595b40b75ba036ed117d9bb4.svg';
import Schemes from '../assets/images/scheme-svgrepo-com.svg';
import SchemeStatus from '../assets/images/schemss-01.svg';
// import SchemeStatus from 'assets/images/scheme-svgrepo-com (1).svg'
import rejected from '../assets/images/close (2).svg';
import notification from '../assets/images/Icon material-notifications-active.svg';
import { useDispatch, useSelector } from 'react-redux';
// import { getUser, getFile, getUserRegistrationDetails, SERVER, setLocaleWithFallback, update90DaysData, updateProfileData, updateUploadFile } from 'store/actions/user.actions'
// import { Translate } from "react-redux-i18n";
import Modal from '@mui/material/Modal';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link, useNavigate } from 'react-router-dom';
// import { deleteAllCookies, getTokenCookie, getTokenCookieAdmin, showToast } from 'utils/tools';
import axios from 'axios';
import moment from 'moment';
import logout from '../assets/images/Logout.svg';
import { Tooltip } from '@material-ui/core';
import back from '../assets/images/Icon awesome-arrow-circle-left.svg';
import Badge from '@mui/material/Badge';
import NotificationIcon from '../assets/images/NotificationIcon.svg';
import Box from '@mui/material/Box';
// import ReactPaginate from "react-paginate";
// import cookie from 'react-cookies';
import { Pagination, Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';
// import history from "../../history";
import { SERVER } from '../features/auth/authSlice';

const DashBoardMigrant = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const location = useLocation();
  const navigate = useNavigate();

  const [renewaldate, setrenewaldate] = React.useState('');

  const [allnotifications, setallNotifications] = React.useState([]);

  const [notification, setNotification] = React.useState([]);
  const [showAppStatus, setshowAppStatus] = React.useState(true);
  const [get_user_appeal, setget_user_appeal] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [allValues, setAllValues] = React.useState({
    language: users?.profile_details.language,
    users: users?.profile_details.users,
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage, setPostPerPage] = React.useState(4);
  const [pageNumber, setPageNumber] = React.useState(0);

  const handleChange = (event) => {
    console.log(event.target);
    console.log(event.target.value);
    setAllValues({
      ...allValues,

      [event.target.name]: event.target.value,
    });

    if (event.target.name === 'language')
      dispatch(setLocaleWithFallback(event.target.value));
  };

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
      width: '350px',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const [rejectReason, setRejectReason] = React.useState(null);

  useEffect(() => {
    if (
      get_user_appeal === '' &&
      get_user_appeal === undefined &&
      users?.getUserRegistrationDetails !== undefined &&
      users?.getUserRegistrationDetails !== null &&
      users?.getUserRegistrationDetails.personal_details !== undefined &&
      users?.getUserRegistrationDetails.personal_details.length > 0 &&
      users?.getUserRegistrationDetails.personal_details[0]
        .is_renewal_rejected === 1
    ) {
      setStatus('renewalRejected');
    } else if (
      get_user_appeal === undefined &&
      users?.getUserRegistrationDetails !== undefined &&
      users?.getUserRegistrationDetails !== null &&
      users?.getUserRegistrationDetails.personal_details !== undefined &&
      users?.getUserRegistrationDetails.personal_details.length > 0 &&
      users?.getUserRegistrationDetails.personal_details[0].is_approved
    ) {
      setStatus('approved');
    } else if (
      get_user_appeal === '' &&
      users?.getUserRegistrationDetails !== undefined &&
      users?.getUserRegistrationDetails !== null &&
      users?.getUserRegistrationDetails.personal_details !== undefined &&
      users?.getUserRegistrationDetails.personal_details.length > 0 &&
      users?.getUserRegistrationDetails.personal_details[0].is_approved
    ) {
      setStatus('approved');
    } else if (
      get_user_appeal === undefined &&
      users.getUserRegistrationDetails !== null &&
      users.getUserRegistrationDetails.personal_details !== undefined &&
      users.getUserRegistrationDetails.personal_details !== null &&
      users.getUserRegistrationDetails.personal_details.length > 0 &&
      users.getUserRegistrationDetails.personal_details[0].is_appealed !== null
    ) {
      setStatus('appealed');
    }
  }, [get_user_appeal]);

  useEffect(() => {
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
      setStatus('editProfile');
    } else if (
      users?.getUserRegistrationDetails !== undefined &&
      users?.getUserRegistrationDetails !== null &&
      users?.getUserRegistrationDetails.personal_details !== undefined &&
      users?.getUserRegistrationDetails.personal_details.length > 0 &&
      users?.getUserRegistrationDetails.personal_details[0]
        .is_renewal_scheme_claimed &&
      users?.getUserRegistrationDetails.personal_details[0]
        .is_renewal_scheme_claimed === 1
    ) {
      setStatus('renewed');
    } else if (
      users?.getUserRegistrationDetails !== undefined &&
      users?.getUserRegistrationDetails !== null &&
      users?.getUserRegistrationDetails.personal_details !== undefined &&
      users?.getUserRegistrationDetails.personal_details.length > 0
    ) {
      setRejectReason(
        users?.getUserRegistrationDetails.personal_details[0]
          .approval_rejection_description,
      );

      console.error(
        'users.getUserRegistrationDetails.personal_details[0]: ' +
          JSON.stringify(
            users.getUserRegistrationDetails.personal_details[0],
            undefined,
            2,
          ),
      );
      if (
        users?.getUserRegistrationDetails.personal_details[0].is_sent_approval
      ) {
        if (
          users?.getUserRegistrationDetails.personal_details[0]
            .is_renewal_rejected == 1
        ) {
          setStatus('renewalRejected');
        } else if (
          users?.getUserRegistrationDetails.personal_details[0].is_approved
        ) {
          setStatus('approved');
        } else if (
          users?.getUserRegistrationDetails.personal_details[0].is_rejected
        ) {
          setStatus('rejected');
        } else if (
          users?.getUserRegistrationDetails.personal_details[0].is_rejected ===
          null
        ) {
          setStatus('pending');
        }
      } else {
        setStatus('incomplete');
      }

      if (
        get_user_appeal === undefined &&
        get_user_appeal === '' &&
        users?.getUserRegistrationDetails !== undefined &&
        users?.getUserRegistrationDetails !== null &&
        users?.getUserRegistrationDetails.personal_details !== undefined &&
        users?.getUserRegistrationDetails.personal_details.length > 0 &&
        users?.getUserRegistrationDetails.personal_details[0]
          .is_renewal_rejected === 1
      ) {
        setStatus('renewalRejected');
      } else if (
        get_user_appeal === undefined &&
        users?.getUserRegistrationDetails !== undefined &&
        users?.getUserRegistrationDetails !== null &&
        users?.getUserRegistrationDetails.personal_details !== undefined &&
        users?.getUserRegistrationDetails.personal_details.length > 0 &&
        users?.getUserRegistrationDetails.personal_details[0].is_approved
      ) {
        setStatus('approved');
      } else if (
        get_user_appeal === '' &&
        users?.getUserRegistrationDetails !== undefined &&
        users?.getUserRegistrationDetails !== null &&
        users?.getUserRegistrationDetails.personal_details !== undefined &&
        users?.getUserRegistrationDetails.personal_details.length > 0 &&
        users?.getUserRegistrationDetails.personal_details[0].is_approved
      ) {
        setStatus('approved');
      } else if (
        get_user_appeal === undefined &&
        users?.getUserRegistrationDetails !== null &&
        users?.getUserRegistrationDetails.personal_details !== undefined &&
        users?.getUserRegistrationDetails.personal_details !== null &&
        users?.getUserRegistrationDetails.personal_details.length > 0 &&
        users?.getUserRegistrationDetails.personal_details[0].is_appealed !==
          null
      ) {
        setStatus('appealed');
      }
    }
  }, [users?.getUserRegistrationDetails]);

  const SchemesClicked = () => {
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
        'Please wait after your Edit Profile request is processed, you will be able to apply schemes.',
      );
    } else {
      if (renewaldate !== undefined && renewaldate !== '') {
        var dateString2 = renewaldate;
        var dateObj2 = new Date(dateString2);
        var momentObj2 = moment(dateObj2);
        var days_diff = momentObj2.diff(
          moment(Date.now()).startOf('day'),
          'days',
          false,
        );

        console.log('days_diff= ' + days_diff);

        if (days_diff <= 0) {
          showToast('ERROR', 'Please Renew!');
        } else {
          if (users.user !== null && users.user.is_approved) {
            navigate('/schemes-home');
          } else {
            showToast('ERROR', 'Your Application is Not Yet Approved!');
          }
        }
      } else {
        showToast('ERROR', 'Your Application is Not Yet Approved!');
      }
    }
  };

  const EcardClicked = () => {
    if (users.user !== null && users.user.is_approved) {
      // navigate("/e-card");
      navigate(`/e-card/uid=${users.user.id}_bid=${users.user.board_id}`);
    } else {
      showToast('ERROR', 'Your Application is Not Yet Approved!');
    }
  };

  const RenewalClicked = () => {
    console.log('RenewalClicked');
    if (
      users.getUserRegistrationDetails.personal_details[0] !== null &&
      users.getUserRegistrationDetails.personal_details[0] !== undefined &&
      users.getUserRegistrationDetails.personal_details[0]
        .is_renewal_scheme_claimed === 0
    ) {
      if (renewaldate !== undefined && renewaldate !== '') {
        //     navigate("/renewals");
        // }
        var dateString2 = renewaldate;
        var dateObj2 = new Date(dateString2);
        var momentObj2 = moment(dateObj2);
        var days_diff = momentObj2.diff(
          moment(Date.now()).startOf('day'),
          'days',
          false,
        );

        console.log('days_diff= ' + days_diff);

        if (days_diff <= 0) {
          navigate('/renewals');
        } else {
          showToast(
            'ERROR',
            'You Cannot Renew Before 3 Years of Registration!',
          );
        }
      } else {
        showToast('ERROR', 'Your Application is Not Yet Approved!');
      }
    } else if (
      users.getUserRegistrationDetails.personal_details[0]
        .is_renewal_scheme_claimed === 2
    ) {
      showToast(
        'ERROR',
        'Please wait, after your schemes status are approved or rejected, renewals status will change.',
      );
    } else {
      showToast(
        'ERROR',
        'Your Application has been already applied for Renewal!',
      );
    }
  };

  const RegistrationClicked = () => {
    navigate('/registration');
  };

  const AppealButtonPressed = () => {
    if (get_user_appeal !== undefined && get_user_appeal !== '') {
      if (
        allValues.appealreason !== undefined &&
        allValues.appealreason !== null &&
        allValues.appealreason !== ''
      ) {
        var data = JSON.stringify({
          board_id: get_user_appeal.board_id,
          user_id: users.user.id,
          approval_id: get_user_appeal.approval_id,
          labour_work_certificate_id:
            get_user_appeal.labour_work_certificate_id,
          appeal_to_user_id: get_user_appeal.appeal_to_user_id,
          appeal_description: allValues.appealreason,
        });
        console.log('data: ', data);

        var config = {
          method: 'post',
          url: SERVER + '/appeal/make_an_appeal',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenCookie()}`,
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            console.log(
              'make_an_appeal response: ' + JSON.stringify(response.data),
            );

            if (
              response.data.success !== undefined &&
              response.data.success === true
            ) {
              handleClose();
              showToast('SUCCESS', 'Successfully Appealed!');
              // props.history.push("/dashboard-user");
              // window.location.reload();

              let dataForRegDetails = {
                key: 'user_id',
                value: users.user.id,
                board_id: 1,
                procedure_name: 'all',
              };
              dispatch(getUserRegistrationDetails(dataForRegDetails));

              var config = {
                method: 'get',
                url:
                  SERVER +
                  '/appeal/get_user_appeal?board_id=1&user_id=' +
                  users.user.id,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${getTokenCookie()}`,
                },
              };

              axios(config)
                .then(function (response) {
                  setget_user_appeal(response.data.data[0]);
                })
                .catch(function (error) {
                  console.error('get_user_appeal error: ' + error);
                });
              setshowAppStatus(true);
            }
          })
          .catch(function (error) {
            console.log('make_an_appeal error:' + error);
            handleClose();
            setshowAppStatus(true);
          });
      } else {
        showToast('ERROR', 'Please write reason to appeal.');
      }
    }
  };

  const [open, setOpen] = React.useState(false);
  const [opennotification, setopennotification] = React.useState(false);

  const handleClickOpen = () => {
    if (get_user_appeal !== undefined && get_user_appeal !== '') {
      setOpen(true);
      setshowAppStatus(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setshowAppStatus(true);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = notification.slice(indexOfFirstPost, indexOfLastPost);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);
  const paginate = (pageNum) => setCurrentPage(pageNum);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(notification.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const updateNotification = async (_id) => {
    var config = {
      method: 'patch',
      url: SERVER + '/notifications/update_notification_read',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getTokenCookie()}`,
      },
      data: {
        id: _id,
        reader_id: users.user.id,
      },
    };
    await axios(config)
      .then(function (response) {
        console.log(response);
        console.log('updated notification', response.data.data);
      })
      .catch(function (error) {
        console.error('notification error: ' + error);
      });

    var data = {
      receiver_id: users.user.id,
      is_global: false,
      is_labour: true,
    };
    getNotifications(data, 1);
  };

  const clearAllNotification = () => {
    notification.map((x) => {
      updateNotification(x._id);
    });
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [openNotifications, setOpenNotifications] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenNotifications(open);
  };

  const handlePageChange = (event, value) => {
    console.log('event: ', event);
    console.log('value: ', value);

    var data = {
      reader_id: users.user.id,
      receiver_id: users.user.id,
      is_global: false,
      is_labour: true,
    };
    getNotifications(data, value);
  };

  const getNotifications = (data, page) => {
    var config = {
      method: 'post',
      url: `${SERVER}/notifications/get_user_notifications?limit=5&page=${page}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getTokenCookie()}`,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log('notification', response);

        setallNotifications(response.data);

        setNotification(response.data.docs);
      })
      .catch(function (error) {
        console.error('notification error: ' + error);
      });
  };

  return (
    <>
      <SwipeableDrawer
        anchor={'right'}
        open={openNotifications}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          // sx={{ width: 412 }}
          sx={{ width: 'auto', maxWidth: 412 }}
          role="presentation"
          // onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          className="list_notifications_box"
        >
          <div className="list_notifications_header">
            <div>Notifications</div>
            <CloseIcon
              className="closeNoti mr-2"
              onClick={toggleDrawer(false)}
            />
          </div>

          {/* <li key="index" className="list_notifications_clearall">
                        <Tooltip title="Clear All Notifications" placement="bottom-start" arrow interactive> 
                            <Link to="#">Clear All</Link>
                        </Tooltip>
                    </li> */}

          {allnotifications !== undefined &&
            allnotifications.docs !== undefined &&
            allnotifications.docs.map((x, index) => (
              <li key={index} className="list_notifications">
                <div>
                  <Tooltip
                    title="Clear Notification"
                    placement="left"
                    arrow
                    interactive
                  >
                    <CloseIcon
                      className="dismissNoti"
                      onClick={() => updateNotification(x._id)}
                    />
                  </Tooltip>
                  <p className="notification_time m-0 mb-2 p-0">
                    {moment(x.updatedAt).format('DD/MM/YYYY  hh:mm  a')}
                  </p>
                  <p className="m-0 p-0">{x.message}</p>
                </div>
              </li>
            ))}

          <nav>
            <Stack
              // spacing={2}
              className="p-2 pagination_noti"
            >
              <Pagination
                // showFirstButton showLastButton
                color="primary"
                count={allnotifications.totalPages}
                page={allnotifications.page}
                variant="outlined"
                onChange={handlePageChange}
              />
            </Stack>
          </nav>
        </Box>
      </SwipeableDrawer>

      <div className="root">
        <Dialog
          backdropClick
          disableEscapeKeyDown
          maxWidth="xl"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="form-dialog-title">
            Are you sure you want to Appeal?
          </DialogTitle>
          <DialogContent>
            <TextareaAutosize
              variant="outlined"
              multiline
              minRows={3}
              style={{ width: '500px', padding: '10px' }}
              placeholder="Appeal Reason!"
              name="appealreason"
              value={allValues.appealreason}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outline-secondary">
              Cancel
            </Button>
            <Button onClick={AppealButtonPressed} variant="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        <Row className="top-div">
          <Row className="topbar-row">
            <Col xs={12} md={6} lg={6} className="top-bar-col">
              <div className="logo-div-profile">
                <img id="logo" src={logo} alt="..." className="logo-img" />
                <h1 className="logo-text">
                  Karnataka Building & Other Construction Workers Welfare Board{' '}
                  <br />
                  (KBOCWWB) Government of Karnataka
                </h1>
              </div>
            </Col>
            <Col className="notifications-logout-usericon-labour-dashboard">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '20px',
                  marginTop: '3px',
                }}
              >
                <Badge
                  badgeContent={
                    allnotifications !== undefined && allnotifications.totalDocs
                  }
                  color="primary"
                >
                  <img
                    onClick={toggleDrawer(true)}
                    src={NotificationIcon}
                    alt="image"
                  />
                </Badge>
              </div>

              <div className="usericon-header-logout">
                <img alt="..." src={usericon} className="usericon-img" />

                <p>
                  {users?.user !== undefined &&
                    users?.user !== null &&
                    users?.user.first_name}
                </p>
                <Tooltip title="Logout" placement="top-start" arrow interactive>
                  <img
                    alt="..."
                    src={logout}
                    className="logout-img"
                    onClick={() => {
                      navigate('/');
                    }}
                  />
                </Tooltip>
              </div>
            </Col>
          </Row>
        </Row>

        <Row className="dashboarduser-row2">
          <Col xs={12} className="dashboarduser-col2 status p-0">
            {/* <Link to="#" className="profile-title-status-scheme" onClick={() => props.history.goBack()}>
                                <img alt="..." className="cal-icon hover-icn" src={back} />
                            </Link> */}
            <div className="ApplicationStatus">Application Status</div>

            {showAppStatus ? (
              {
                renewalRejected: (
                  <>
                    <div className="statusbar rejected">
                      <img alt="..." src={rejected} />
                      <p>Your Renewal has been rejected!</p>
                    </div>
                  </>
                ),
                approved: (
                  <>
                    <div className="statusbar approved">
                      <img alt="..." src={checkwhite} />
                      <p>Your Registration is Approved Successfully</p>
                    </div>
                  </>
                ),
                pending: (
                  <>
                    <div className="statusbar pending">
                      <img alt="..." src={pendingicon} />
                      <p>Your Registration is Pending for Approval</p>
                    </div>
                  </>
                ),
                renewed: (
                  <>
                    <div className="statusbar pending">
                      <img alt="..." src={pendingicon} />
                      <p>Your Renewal is pending for approval</p>
                    </div>
                  </>
                ),
                incomplete: (
                  <>
                    <Link to="#" onClick={() => RegistrationClicked()}>
                      <div className="statusbar incomplete">
                        <img alt="..." src={incomplete} />
                        <p>Click here to complete your registration</p>
                      </div>
                    </Link>
                  </>
                ),
                editProfile: (
                  <>
                    <div className="statusbar pending">
                      <img alt="..." src={incomplete} />
                      <p>Your Edit Profile Request is Pending</p>
                    </div>
                  </>
                ),
                rejected: (
                  <>
                    <div className="statusbar outer">
                      <div className="statusbar rejected">
                        <img alt="..." src={rejected} />
                        <p>
                          Your Registration is Rejected.
                          {get_user_appeal === undefined ||
                          (users?.getUserRegistrationDetails !== undefined &&
                            users?.getUserRegistrationDetails !== null &&
                            users?.getUserRegistrationDetails
                              .personal_details !== undefined &&
                            users?.getUserRegistrationDetails
                              .personal_details[0] !== undefined &&
                            users?.getUserRegistrationDetails
                              .personal_details[0].is_appealed &&
                            users?.getUserRegistrationDetails
                              .personal_details[0].is_rejected) ? null : (
                            <>
                              <Link
                                to="#"
                                onClick={handleClickOpen}
                                className="ml-3 appealLink"
                              >
                                Click here to Appeal
                              </Link>
                            </>
                          )}
                        </p>
                      </div>
                      <div className="statusbar reason">
                        <p className="mb-2 reason-title">Reason: </p>
                        <p className="pl-0">
                          {' '}
                          {users?.getUserRegistrationDetails !== undefined &&
                            users?.getUserRegistrationDetails !== null &&
                            users?.getUserRegistrationDetails
                              .personal_details !== undefined &&
                            users?.getUserRegistrationDetails
                              .personal_details[0] !== undefined &&
                            users?.getUserRegistrationDetails
                              .personal_details[0].approval_reject_description}
                        </p>
                      </div>
                    </div>
                  </>
                ),
                appealed: (
                  <>
                    <div className="statusbar pending">
                      <img alt="..." src={pendingicon} />
                      <p>Your Appeal is pending!</p>
                    </div>
                  </>
                ),
              }[status]
            ) : (
              <></>
            )}
          </Col>

          {/* <Col xs={12} sm={12} md={12} className="dashboarduser-col-noti">
                        <p> - No New Notifications - </p>
                    </Col> */}
        </Row>

        <Row className="dashboarduser-row">
          <Col xs={3} sm={1} md={3} className="dashboarduser-col mt-3">
            <Link to="/registration">
              <div className="icondiv">
                <img alt="..." src={Registration} />
                <p>Registration</p>
              </div>
            </Link>
          </Col>
          <Col xs={3} sm={1} md={3} className="dashboarduser-col mt-3">
            {/* <Link to="/renewals"> */}
            <Link to="#" onClick={RenewalClicked}>
              <div className="icondiv">
                <img alt="..." src={Renewal} />
                <p>Renewal</p>
              </div>
            </Link>
          </Col>
          <Col xs={3} sm={1} md={3} className="dashboarduser-col mt-3">
            <Link to="#" onClick={SchemesClicked}>
              <div className="icondiv">
                <img alt="..." src={Schemes} />
                <p>Schemes</p>
              </div>
            </Link>
          </Col>
          <Col xs={3} sm={1} md={3} className="dashboarduser-col mt-3">
            <Link to="/schemeStatus">
              <div className="icondiv">
                <img alt="..." src={SchemeStatus} />
                <p>Schemes Status</p>
              </div>
            </Link>
          </Col>
        </Row>

        <Row className="dashboarduser-row-id">
          <Col xs={12} md={6} className="dashboarduser-col id-col">
            {/* <Link to="/e-card" className="id-link"> */}
            <Link to="#" onClick={EcardClicked} className="id-link">
              {/* <div className="icondiv"> */}
              <img alt="..." src={ECard} />
              <p>E-Card</p>
            </Link>
          </Col>
        </Row>

        <Modal
          open={opennotification}
          onClose={() => setopennotification(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ overflow: 'scroll' }}
        >
          <Box className="modal_box">
            <Typography> Notification</Typography>
            <Row>
              {' '}
              {currentPosts.map((x, index) => (
                <li key="index" className="list_noti">
                  {/* <div onClick={() => updateNotification(x._id)}>  {x.message}</div> */}
                  <div className="d-flex flex-column">
                    <div
                      className="d-inline-flex justify-content-end "
                      onClick={() => updateNotification(x._id)}
                    >
                      {' '}
                      <button className="btn btn-danger" color="primary">
                        X
                      </button>
                    </div>
                    <div> {x.message}</div>
                  </div>
                </li>
              ))}
            </Row>
            <nav>
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a className="page-link" href="#" onClick={() => prevPage()}>
                    Previous
                  </a>
                </li>
                {pageNumbers.map((num) => (
                  <li className="page-item" key={num}>
                    <a
                      onClick={() => paginate(num)}
                      href="#"
                      className="page-link"
                    >
                      {num}
                    </a>
                  </li>
                ))}
                <li className="page-item">
                  <a className="page-link" href="#" onClick={() => nextPage()}>
                    Next
                  </a>
                </li>
                <button
                  className="btn btn-primary"
                  onClick={() => clearAllNotification()}
                >
                  Clear
                </button>
              </ul>
            </nav>
          </Box>
        </Modal>
      </div>
    </>
  );
};

// export default Dashboard;
export default DashBoardMigrant;
