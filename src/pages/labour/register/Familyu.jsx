import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button } from 'react-bootstrap';
import {
    FormControl,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    Box,
    CircularProgress,
    ListItemText,
    InputAdornment,
    FormControlLabel,
    RadioGroup,
    Radio,
    Checkbox,
    Paper,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AddCircleRounded } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import folder from '../../../assets/images/Folderwhite-01-01.svg';
import translationsText from '../../../translations';
import { Required } from '../../../utils/tools';
import closeIcon from '../../../assets/images/closeIcon.svg';
import { toast } from 'react-toastify';
import { getCatalogDetails } from '../../../features/personalDetails/catalogSlice';
import dayjs from 'dayjs';
import { familyDetails } from '../../../features/Family-Details/Family-Details-Slice';
import Cookies from 'js-cookie';

const Family = () => {
    const { en } = translationsText;
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const [loader, setLoader] = useState(false);

    const [loading, setLoading] = useState(false);
    const [relationloading, setRealtionloading] = useState(false);
    const [proloading, setProloading] = useState(false);
    const [educationloading, setEducationloading] = useState(false);
   
    const [familyMembers, setFamilyMembers] = useState([
        {
            rationCardNumber: '',
            rationCardType: '',
            imageData: null,
            relation: '',
            firstName: '',
            middleName: '',
            lastName: '',
            aadhar: '',
            dob: null,
            profession: '',
            education: '',
            isNominee: false,
            RegisteredKBOCWWB: false
        },
    ]);

    const [rationCard, setRationCard] = useState([]);
    const [relation, setRelation] = useState([]);
    const [profession, setProfession] = useState([]);
    const [education, setEducation] = useState([]);


    const addFamilyMember = () => {
        if (familyMembers.length < 4) {
            setFamilyMembers([...familyMembers,
            {
                relation: '',
                firstName: '',
                middleName: '',
                lastName: '',
                aadhar: '',
                dob: null,
                profession: '',
                education: '',
                isNominee: false,
                RegisteredKBOCWWB: false
            },]);
        } else {
            toast.error('Only four family members are allowed');
        }
    };

    const formikData = useFormik({
        initialValues: familyMembers,
        validationSchema: Yup.object({
            rationCardNumber: Yup.string().required('Ration card number is required'),
            rationCardType: Yup.string().required('Ration card type is required'),
            imageData: Yup.mixed()
                .required('Image data is required')
                .test(
                    'fileFormat',
                    'Unsupported file format',
                    (value) =>
                        value &&
                        ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type),
                ),
            relation: Yup.string().trim().required('*Relation is required'),
            firstName: Yup.string().trim().required('*First name is required'),
            lastName: Yup.string().trim().required('*Last name is required'),
            aadhar: Yup.string()
                .matches(/^\d{12}$/, 'Aadhar number must be 12 digits')
                .required('Aadhar number is required'),
            dob: Yup.date().nullable().required('*Date of birth is required'),
            profession: Yup.string().trim().required('*Profession is required'),
            education: Yup.string().trim().required('*Education is required'),
        }),
        validateOnMount: false,
        onSubmit: async (values) => {
            const payload = {
                user_id: Cookies.get('id'),
                ration_card_no: familyMembers.rationCardNumber,
                ration_card_image_id: "????",
                ration_card_type: familyMembers.rationCardType,
                ration_card_files_xml: [
                    {
                        file_id: "??",
                        file_name: familyMembers.imageData
                    }
                ],
                families: familyMembers.map(member => ({
                    relation_type_id: member.relation,
                    first_name: member.firstName,
                    last_name: member.lastName,
                    middle_name: member.middleName,
                    aadhar_no: member.aadhar,
                    dob: member.dob,
                    profession: member.profession,
                    education: member.education,
                    is_nominee: member.isNominee,
                    is_registered: member.RegisteredKBOCWWB,
                    registeration_no: "????",
                    labour_user_id: Cookies.get('id'),
                })),
            };
            console.log(familyMembers, 'lldddd')

        },
    });


    const GetOptionOfRationCardType = async (catalog_name) => {
        setLoading(true);
        let payload = {
            "board_id": 1,
            "catalog_name": catalog_name
        };
        try {
            const response = await dispatch(getCatalogDetails(payload));
            setLoading(false);
            setRationCard(response.payload.data);
        } catch (error) {
            console.log(error, "error")
        }
    }

    const GetOptionOfRelation = async (catalog_name) => {
        setRealtionloading(true);
        let payload = {
            "board_id": 1,
            "catalog_name": catalog_name
        };
        try {
            const response = await dispatch(getCatalogDetails(payload));
            setRealtionloading(false);
            setRelation(response.payload.data);
        } catch (error) {
            console.log(error, "error")
        }
    }

    const GetOptionOfProfesssion = async (catalog_name) => {
        setProloading(true)
        let payload = {
            "board_id": 1,
            "catalog_name": catalog_name
        };
        try {
            const response = await dispatch(getCatalogDetails(payload));
            setProloading(false)
            setProfession(response.payload.data)
            return response.payload.data;
        } catch (error) {
            console.error('Error fetching catalog details:', error);
        }
    }

    const GetOptionOfEducation = async (catalog_name) => {
        setEducationloading(true)
        let payload = {
            "board_id": 1,
            "catalog_name": catalog_name
        };
        try {
            const response = await dispatch(getCatalogDetails(payload));
            setEducationloading(false)
            setEducation(response.payload.data)
            return response.payload.data;
        } catch (error) {
            console.error('Error fetching catalog details:', error);
        }
    }

    const handleChange = (e, index, fieldName) => {
        const updatedFamilyMembers = [...familyMembers];
        updatedFamilyMembers[index] = {
            ...updatedFamilyMembers[index],
            [fieldName]: e.target.value
        };
        setFamilyMembers(updatedFamilyMembers);
    };


    return (
        <>
            <Row className="m-0">
                <Row className="family-title-row">
                    <Col xs={12} className="profile-title">
                        <h1>{en.rationCardDetails}</h1>
                    </Col>
                </Row>
                <form onSubmit={formikData.handleSubmit}>
                    <Row className="form-row">
                        {/* Ration Card Number */}
                        <Col xs={12} className="family-col-1">
                            <Row>
                                <Col xs={12} md={6}>
                                    <Required className="mt-3 mb-2" title={en.rationCardNumber} />
                                    <FormControl fullWidth className="formcontrol1">
                                        <TextField
                                            name="rationCardNumber"
                                            onChange={(e) => handleChange(e, 0, 'rationCardNumber')}
                                            value={familyMembers[0].rationCardNumber}
                                            variant="outlined"
                                            placeholder="Enter Your Ration Card Number"
                                        />
                                    </FormControl>
                                    {formikData.errors.rationCardNumber && (
                                        <div className="error-message mt-2 text-danger">
                                            {formikData.errors.rationCardNumber}
                                        </div>
                                    )}
                                </Col>

                                <Col xs={12} md={6}>
                                    <Box>
                                        <Required className="mt-3 mb-2" title={en.rationCard} />
                                        <FormControl variant="outlined" fullWidth >
                                            <Select
                                                className="select-marital"
                                                labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-required"
                                                onChange={(e) => handleChange(e, 0, 'rationCardType')}
                                                value={familyMembers[0].rationCardType}
                                                name="rationCardType"
                                                displayEmpty
                                                onOpen={() => GetOptionOfRationCardType("Ration card type")}
                                            >
                                                <MenuItem value="" disabled>
                                                    <ListItemText primary={loading ? 'Loading...' : '--Select--'} />
                                                </MenuItem>
                                                {rationCard?.map((i) =>
                                                    <MenuItem key={i.value_id} value={i.value_id}>
                                                        <ListItemText style={{ color: "black" }} primary={i.short_name} />
                                                    </MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                        {formikData.errors.rationCardType && (
                                            <div className="error-message mt-2 text-danger">
                                                {formikData.errors.rationCardType}
                                            </div>
                                        )}
                                    </Box>
                                </Col>
                            </Row>
                        </Col>
                        {/* Upload Photo */}

                        <Col xs={12} className="family-col-1">
                            <div className="browsebutton2-div mt-4">
                                <label
                                    htmlFor="upload-photo"
                                    className="browse-button"
                                    style={{ fontSize: '24px' }}
                                >
                                    <img alt="..." src={folder} /> {en.browse}
                                </label>
                                <input
                                    type="file"
                                    required
                                    name="imageData"
                                    id="upload-photo"
                                    onChange={(event) => {
                                        const selectedFile = event.target.files[0];
                                        setFamilyMembers((prevMembers) => [
                                            {
                                                ...prevMembers[0],
                                                imageData: selectedFile.name,
                                            },
                                        ]);
                                    }}
                                />
                                {formikData.errors.imageData && (
                                    <div className="error-message mt-2 text-danger">
                                        {formikData.errors.imageData}
                                    </div>
                                )}
                            </div>

                            <p className="mt-4 instructions-ration">
                                <span>{en.instructions}*</span>
                                <br />
                                {en.formatsupportingdocumentshouldbeinJPEGPNGorPDF}
                                <br />
                                {en.sizecontains500KBto2MB}
                            </p>
                        </Col>

                        <Col xs={12} className="family-col-3 form-inner-card mt-4">
                            <p>{en.listofFamilyMembers}</p>
                        </Col>

                        <Row>
                            {familyMembers.map((member, index) => (
                                <Paper className="mt-5 pt-5 pb-5 px-5 family-form" key={index} elevation={3}>
                                    <Row>
                                        <Col xs={8} md={6}>
                                            <Required className="mt-3 mb-2" title={en.relation} />
                                            <FormControl fullWidth className="formControl1">
                                                <Select
                                                    labelId={`relation-label-${index}`}
                                                    id={`relation-${index}`}
                                                    name={`relation-${index}`}
                                                    onChange={(e) => handleChange(e, index, 'relation')}
                                                    value={familyMembers[index].relation}
                                                    variant="outlined"
                                                    displayEmpty
                                                    onOpen={() => GetOptionOfRelation("Relation")}
                                                >
                                                    <MenuItem value="" disabled>
                                                        <ListItemText primary={relationloading ? 'Loading...' : '--Select--'} />
                                                    </MenuItem>
                                                    {relation?.map((i) => (
                                                        <MenuItem key={i.value_id} value={i.value_id}>
                                                            <ListItemText primary={i.value} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>

                                            </FormControl>
                                        </Col>

                                        {/* First Name */}
                                        <Col xs={12} md={6}>
                                            <Required className="mt-3 mb-2" title={en.firstName} />
                                            <FormControl fullWidth>
                                                <TextField
                                                    name="firstName"
                                                    onChange={(e) => {
                                                        formikData.handleChange(e);
                                                        handleChange(e, index, 'firstName');
                                                    }}
                                                    value={familyMembers[index].firstName}
                                                    variant="outlined"
                                                    placeholder="Enter Your First Name"
                                                />
                                            </FormControl>
                                            {formikData.errors.firstName &&
                                                formikData.touched.firstName && (
                                                    <p style={{ color: 'red' }}>
                                                        {formikData.errors.firstName}
                                                    </p>
                                                )}
                                        </Col>

                                        {/* Middle Name */}
                                        <Col xs={12} md={6}>
                                            <Required className="mt-3 mb-2" title={en.middleName} />
                                            <FormControl fullWidth>
                                                <TextField
                                                    name="middleName"
                                                    onChange={(e) => {
                                                        formikData.handleChange(e);
                                                        handleChange(e, index, 'middleName');
                                                    }}
                                                    value={familyMembers[index].middleName}
                                                    variant="outlined"
                                                    placeholder="Enter Your Middle Name"
                                                />
                                            </FormControl>
                                        </Col>

                                        {/* Last Name */}
                                        <Col xs={12} md={6}>
                                            <Required className="mt-3 mb-2" title={en.lastName} />
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant="outlined"
                                                    placeholder="Enter Your Last Name"
                                                    name="lastName"
                                                    onChange={(e) => {
                                                        formikData.handleChange(e);
                                                        handleChange(e, index, 'lastName');
                                                    }}
                                                    value={familyMembers[index].lastName}
                                                />
                                            </FormControl>
                                        </Col>

                                        {/* Aadhar Number */}
                                        <Col xs={12} md={6}>
                                            <Required className="mt-3 md-2" title="Aadhar Number" />
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant="outlined"
                                                    placeholder="XXXXXXXXX234"
                                                    name="aadhar"
                                                    onChange={(e) => {
                                                        formikData.handleChange(e);
                                                        handleChange(e, index, 'aadhar');
                                                    }}
                                                    value={familyMembers[index].aadhar}
                                                    inputProps={{
                                                        minLength: 0,
                                                        maxLength: 12,
                                                        type: 'number',
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                XXXXXXXXXX
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </FormControl>
                                            {formikData.errors.aadhar && formikData.touched.aadhar && (
                                                <p style={{ color: 'red' }}>{formikData.errors.aadhar}</p>
                                            )}
                                        </Col>

                                        {/* Date of Birth */}
                                        <Col xs={12} md={6}>
                                            <Required className="mb-2 mt-4" title={en.dateofBirth} />
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    name="dob"
                                                    className="datepicker"
                                                    label="Date of Birth"
                                                    format="YYYY-MM-DD"
                                                    onChange={(date) => {
                                                        setFamilyMembers((prevMembers) => [
                                                            ...prevMembers.slice(0, index),
                                                            {
                                                                ...prevMembers[index],
                                                                dob: dayjs(date.$d).format("YYYY-MM-DD"),
                                                            },
                                                            ...prevMembers.slice(index + 1),
                                                        ]);
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </Col>

                                        {/* Profession */}
                                        <Col xs={8} md={6}>
                                            <Required className="mt-3 mb-2" title={en.profession} />
                                            <FormControl fullWidth className="formControl1">
                                                <Select
                                                    labelId="relation-label"
                                                    id="profession"
                                                    name="profession"
                                                    onChange={(e) => {
                                                        formikData.handleChange(e);
                                                        handleChange(e, index, 'profession');
                                                    }}
                                                    value={familyMembers[index].profession}
                                                    variant="outlined"
                                                    displayEmpty
                                                    onOpen={() => GetOptionOfProfesssion("Profession")}
                                                >
                                                    <MenuItem value="" disabled>
                                                        <ListItemText primary={proloading ? 'Loading...' : '--Select--'} />
                                                    </MenuItem>
                                                    {profession?.map((i) =>
                                                        <MenuItem key={i.value_id} value={i.value_id}>
                                                            <ListItemText style={{ color: "black" }} primary={i.short_name} />
                                                        </MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                            {formikData.errors.profession &&
                                                formikData.touched.profession && (
                                                    <p style={{ color: 'red' }}>
                                                        {formikData.errors.profession}
                                                    </p>
                                                )}
                                        </Col>

                                        {/* Education */}
                                        <Col xs={8} md={6}>
                                            <Required className="mt-3 mb-2" title={en.education} />
                                            <FormControl fullWidth className="formControl1">
                                                <Select
                                                    labelId="relation-label"
                                                    id="education"
                                                    name="education"
                                                    onChange={(e) => {
                                                        formikData.handleChange(e);
                                                        handleChange(e, index, 'education');
                                                    }}
                                                    value={familyMembers[index].education}
                                                    variant="outlined"
                                                    displayEmpty
                                                    onOpen={() => GetOptionOfEducation("Education")}
                                                >
                                                    <MenuItem value="" disabled>
                                                        <ListItemText primary={educationloading ? 'Loading...' : '--Select--'} />
                                                    </MenuItem>
                                                    {education?.map((i) =>
                                                        <MenuItem key={i.value_id} value={i.value_id}>
                                                            <ListItemText style={{ color: "black" }} primary={i.short_name} />
                                                        </MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                            {formikData.errors.education &&
                                                formikData.touched.education && (
                                                    <p style={{ color: 'red' }}>
                                                        {formikData.errors.education}
                                                    </p>
                                                )}
                                        </Col>

                                        {/* Nominee */}
                                        <Col xs={12} className="member-p">
                                            <FormControlLabel
                                                control={<Checkbox name={'nominee'} />}
                                                label="Nominee"
                                            />
                                        </Col>

                                        {/* Already Registered in KBOCWWB */}
                                        <Col xs={12} className="member-p mt-2">
                                            <FormControl
                                                className="interstateRadio"
                                                variant="outlined"
                                                fullWidth
                                                component="fieldset"
                                            >
                                                <RadioGroup row onChange={formikData.handleChange}>
                                                    <Required
                                                        className="mt-2 mb-2"
                                                        title="Already Registered in KBOCWWB"
                                                    />
                                                    <FormControlLabel
                                                        className="col-2"
                                                        value="1"
                                                        control={<Radio />}
                                                        label="Yes"
                                                    />
                                                    <FormControlLabel
                                                        className="col-2"
                                                        value="0"
                                                        control={<Radio />}
                                                        label="No"
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </Paper>
                            ))}
                        </Row>

                        {/* Family Members */}
                        <Col xs={12} className="family-col-3">
                            {en.familyMembers}
                        </Col>

                        {/* Add Member */}
                        <Col onClick={addFamilyMember} xs={12}
                            className="addMemberCol mt-4 family-col-10">
                            <AddCircleRounded />
                            <span>{en.addMoreFamilyMembers}</span>
                        </Col>

                        {/* Note */}
                        <Col xs={12} className="note2 text-center mt-4 family-col-11">
                            <p>
                                <span>
                                    {en.note} {en.noteafterfurtherprocess}
                                </span>
                            </p>
                        </Col>
                    </Row>

                    {/* Form Buttons */}
                    <Row className="button-inside-form-row mb-5">
                        <Col xs={12} className="next-back-button-row mt-4 ">
                            {!users?.profile_details.editmode ? (
                                <>
                                    <Link to={'/login'} style={{ flexGrow: '0.5' }}>
                                        <Button variant="danger" className="back-button">
                                            {en.back}
                                        </Button>
                                    </Link>
                                    {!loader ? (
                                        <Link
                                            to="#"
                                            onClick={formikData.handleSubmit}
                                            style={{ flexGrow: '0.5' }}
                                        >
                                            <Button variant="outline-primary" className="next-button">
                                                {en.saveandContinue}
                                            </Button>
                                        </Link>
                                    ) : (
                                        <CircularProgress className="mt-5 mx-5" />
                                    )}
                                </>
                            ) : (
                                <Link to="#" style={{ flexGrow: '0.5' }}>
                                    <Button variant="outline-primary" className="next-button">
                                        {en.saveyourDetails}
                                    </Button>
                                </Link>
                            )}
                        </Col>
                    </Row>
                </form>
            </Row>
        </>
    );
};

export default Family; 