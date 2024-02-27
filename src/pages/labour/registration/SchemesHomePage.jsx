import React, { useState } from 'react';

import { Col, Row } from 'react-bootstrap';
import accident from '../../../assets/images/Accident-01.svg';
import Medical2 from '../../../assets/images/Medical assistance-01.svg';

import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
//import { Translate } from 'react-redux-i18n';
import language from '../../../assets/images/translate (1).svg';
//import { setLocaleWithFallback } from 'store/actions/user.actions';
//import search from 'assets/images/Icon ionic-ios-search.svg';
import MarriageAssistance from '../../../assets/images/marriage assistance-01.svg';
import disability from '../../../assets/images/Continuation of disability pension-01.svg';
import continuationPension from '../../../assets/images/Continuation-of-pension-01.svg';
import pension from '../../../assets/images/Disability Pension-01.svg';
import education from '../../../assets/images/Education Assitance-01.svg';
import bmtc from '../../../assets/images/DUlicate id card-01.svg';
import pre from '../../../assets/images/Pre Coaching (UPSC and KPSC) Application 2.svg';
import Funeral from '../../../assets/images/Funeral and EX -Gratia.png';
import Group from '../../../assets/images/Group 70.svg';
import Maga from '../../../assets/images/Maga-01.svg';
import medical from '../../../assets/images/medical assisatance.svg';
import pregnant from '../../../assets/images/images-02.svg';
import Tool from '../../../assets/images/shrama samathya Tool kit-01.svg';
import Header2 from '../../component/Header';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import EducationStatus from '../../schemes/EducationStatus';
import { setLocaleWithFallback } from '../../../features/locale/localeSlice';
// import { Translate } from 'react-i18next';
import text from '../../../translations';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SchemesHomePage = (props) => {
    const { en } = text;
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const users = useSelector((state) => state.users);

    const [allValues, setAllValues] = useState({
        language: users?.profile_details.language,
        users: users?.profile_details.users,
    });

    const handleChange1 = (e) => {
        console.log('kkkkk', e.target.value);
        if (e.target.value === 'ka') {
            setAllValues({
                ...allValues,
                descriptionsKannada: true,
                [e.target.name]: e.target.value,
            });
        } else {
            setAllValues({
                ...allValues,
                descriptionsKannada: false,
                [e.target.name]: e.target.value,
            });
        }

        if (e.target.name === 'language')
            dispatch(setLocaleWithFallback(e.target.value));
    };
    // const schemesData = {
    //   accident:"accident"
    // }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div
            className=""
            onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
        >
            <Header2 lang={allValues.language} />
            <div className="d-flex justify-content-end">
                <Col
                    xs={12}
                    md={4}
                    lg={3}
                    className="d-flex justify-content-end mt-2 me-2"
                >
                    <Select
                        className="select-language"
                        style={{ width: '100%' }}
                        variant="outlined"
                        labelId="demo-simple-select-required-label"
                        value={allValues.language}
                        name="language"
                        displayEmpty
                        onChange={handleChange1}
                    >
                        <MenuItem value="">
                            <ListItemIcon>
                                <img alt="..." src={language} className="language-img" />
                            </ListItemIcon>
                            <ListItemText primary="Select Language" />
                        </MenuItem>

                        <MenuItem value="en">
                            <ListItemText primary="English" />
                        </MenuItem>
                        <MenuItem value="ka">
                            <ListItemText primary="ಕನ್ನಡ" />
                        </MenuItem>
                    </Select>
                </Col>
            </div>
            <Row className="container-fluid mt-3">
                <div
                    className="mb-5"
                    style={{ overflow: 'hidden', textAlign: 'center', width: '100%' }}
                >
                    <>
                        <Button variant="outlined" color="error" onClick={handleClickOpen}>
                            Click here to view Education Assistance Status
                        </Button>
                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle className="d-flex justify-content-center align-items-center text">
                                {'Education Assistance Status'}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    <EducationStatus />
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Close</Button>
                            </DialogActions>
                        </Dialog>
                    </>
                </div>
                <div className="schemes-home-div container-fluid m-auto ps-4">
                    <h3 className="schemesHome-title container-fluid">
                        {en.schemesBoardTitle1}
                    </h3>
                    <p className="schemes-instructions container-fluid">
                        {en.kbocwwbcontent1}
                    </p>
                    <p className="schemes-instructions container-fluid">
                        {en.kbocwwbcontent2}
                    </p>
                    <p className="schemes-instructions container-fluid">
                        {en.kbocwwbcontent3}
                    </p>

                    <div className="my-5">
                        <Link to={'/login'}>
                            <div className="schemesHome-title container-fluid d-flex align-items-center justify-content-center">
                                <button className="login-button2">
                                    Register as Construction Worker / Login
                                </button>
                            </div>
                        </Link>
                    </div>
                    <h3 className="schemesHome-title container-fluid">
                        {en.schemeTranslate}
                    </h3>
                </div>
            </Row>
            <div className="schemes-list-div">
                <div className="container-fluid">
                    <Row className="">
                        <Col
                            xs={12}
                            sm={4}
                            md={4}
                            className="mapping-cards-col schemes"
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                        >
                            <Link to="/accident">
                                <div className="mapping-card schemes">
                                    <img src={accident} alt="..." />
                                    <p style={{ fontSize: '18px', lineHeight: '23px' }}>
                                        {en.accidentSchemeTitle}
                                    </p>
                                </div>
                            </Link>
                        </Col>
                        <Col
                            xs={12}
                            sm={4}
                            md={4}
                            className="mapping-cards-col schemes"
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                        >
                            <Link to="/ailments">
                                <div className="mapping-card schemes">
                                    <img src={medical} alt="..." />
                                    <p style={{ fontSize: '18px', lineHeight: '23px' }}>
                                        {en.ailmentsSchemeTitle}
                                    </p>
                                </div>
                            </Link>
                        </Col>
                        <Col
                            xs={12}
                            sm={4}
                            md={4}
                            className="mapping-cards-col schemes"
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                        >
                            <Link to="/thayimagu">
                                <div className="mapping-card schemes">
                                    <img src={Maga} alt="..." />
                                    <p style={{ fontSize: '18px', lineHeight: '23px' }}>
                                        {en.thayimaguTitle}
                                    </p>
                                </div>
                            </Link>
                        </Col>
                        <Col
                            xs={12}
                            sm={4}
                            md={4}
                            className="mapping-cards-col schemes"
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                        >
                            <Link to="/disabilityContinuePension">
                                <div className="mapping-card schemes">
                                    <img src={disability} alt="..." />
                                    <p style={{ fontSize: '18px', lineHeight: '23px' }}>
                                        {en.contdisablepensionTitle}
                                    </p>
                                </div>
                            </Link>
                        </Col>

                        <Col
                            xs={12}
                            sm={4}
                            md={4}
                            className="mapping-cards-col schemes"
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                        >
                            <Link to="/continuePension">
                                <div className="mapping-card schemes">
                                    <img src={continuationPension} alt="..." />
                                    <p style={{ fontSize: '18px', lineHeight: '23px' }}>
                                        {en.contpensionTitle}
                                    </p>
                                </div>
                            </Link>
                        </Col>
                        <Col
                            xs={12}
                            sm={4}
                            md={4}
                            className="mapping-cards-col schemes"
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                        >
                            <Link to="/delivery">
                                <div className="mapping-card schemes">
                                    <img src={pregnant} alt="..." />
                                    <p style={{ fontSize: '18px', lineHeight: '23px' }}>
                                        {en.deliveryTitle}
                                    </p>
                                </div>
                            </Link>
                        </Col>
                        <Col
                            xs={12}
                            sm={4}
                            md={4}
                            className="mapping-cards-col schemes"
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                        >
                            <Link to="/disablePension">
                                <div className="mapping-card schemes">
                                    <img src={pension} alt="..." />
                                    <p style={{ fontSize: '18px', lineHeight: '23px' }}>
                                        {en.disablePensionTitle}
                                    </p>
                                </div>
                            </Link>
                        </Col>
                        <Col
                            xs={12}
                            sm={4}
                            md={4}
                            className="mapping-cards-col schemes"
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                        >
                            <Link to="/education">
                                <div className="mapping-card schemes">
                                    <img src={education} alt="..." />
                                    <p style={{ fontSize: '18px', lineHeight: '23px' }}>
                                        {en.laboureducationTitle}
                                    </p>
                                </div>
                            </Link>
                        </Col>

                        <Col
                            xs={12}
                            sm={4}
                            md={4}
                            className="mapping-cards-col schemes "
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                        >
                            <Link to="/funeral">
                                <div className="mapping-card schemes">
                                    <img src={Funeral} alt="..." />
                                    <p style={{ fontSize: '18px', lineHeight: '23px' }}>
                                        {en.funeralTitle}
                                    </p>
                                </div>
                            </Link>
                        </Col>

                        <Col
                            xs={12}
                            sm={4}
                            md={4}
                            className="mapping-cards-col schemes "
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                        >
                            <Link to="/marriage">
                                <div className="mapping-card schemes">
                                    <img src={MarriageAssistance} alt="..." />
                                    <p style={{ fontSize: '18px', lineHeight: '23px' }}>
                                        {en.marriageTitle}
                                    </p>
                                </div>
                            </Link>
                        </Col>
                        <Col
                            xs={12}
                            sm={4}
                            md={4}
                            className="mapping-cards-col schemes "
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                        >
                            <Link to="/medical">
                                <div className="mapping-card schemes">
                                    <img src={Medical2} alt="..." />
                                    <p style={{ fontSize: '18px', lineHeight: '23px' }}>
                                        {en.medicalTitle}
                                    </p>
                                </div>
                            </Link>
                        </Col>
                        <Col
                            xs={12}
                            sm={4}
                            md={4}
                            className="mapping-cards-col schemes "
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                        >
                            <Link to="/pension">
                                <div className="mapping-card schemes">
                                    <img src={Group} alt="..." />
                                    <p style={{ fontSize: '18px', lineHeight: '23px' }}>
                                        {en.pensionTitle}
                                    </p>
                                </div>
                            </Link>
                        </Col>
                        <Col
                            xs={12}
                            sm={4}
                            md={4}
                            className="mapping-cards-col schemes"
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                        >
                            <Link to="/shrama">
                                <div className="mapping-card schemes">
                                    <img src={Tool} alt="..." />
                                    <p style={{ fontSize: '18px', lineHeight: '23px' }}>
                                        {en.shramaTitle}
                                    </p>
                                </div>
                            </Link>
                        </Col>
                        <Col
                            xs={12}
                            sm={4}
                            md={4}
                            className="mapping-cards-col schemes"
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                        >
                            <Link to="/bmtc">
                                <div className="mapping-card schemes">
                                    <img src={bmtc} alt="..." />
                                    <p style={{ fontSize: '18px', lineHeight: '23px' }}>
                                        {en.bmtcschemeTitle}
                                    </p>
                                </div>
                            </Link>
                        </Col>
                        <Col
                            xs={12}
                            sm={4}
                            md={4}
                            className="mapping-cards-col schemes"
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                        >
                            <Link to="/precoaching">
                                <div className="mapping-card schemes">
                                    <img src={pre} alt="..." />
                                    <p style={{ fontSize: '18px', lineHeight: '23px' }}>
                                        {en.precoachingTitle}
                                    </p>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="d-flex justify-content-end mt-5 me-5 mb-5">
                <Link
                    onClick={() => {
                        props.history.goBack();
                    }}
                >
                    <Button className="back-btn-mainScreens">
                        <ArrowBackIosIcon color="secondary" className="back-icon" />
                        {en.backbtn}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SchemesHomePage;
