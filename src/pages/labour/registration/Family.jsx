import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button } from 'react-bootstrap';
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  ListItemText,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Paper,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AddCircleRounded } from '@material-ui/icons';
import * as Yup from 'yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import folder from '../../../assets/images/Folderwhite-01-01.svg';
import translationsText from '../../../../src/translations';
import { Required } from '../../../utils/tools';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCatalogDetails } from '../../../features/personalDetails/catalogSlice';
import dayjs from 'dayjs';
import { familyDetails } from '../../../features/Family-Details/Family-Details-Slice';
import Cookies from 'js-cookie';
import CancelIcon from '@mui/icons-material/Cancel';
import { GetupdateFamilyDetails } from '../../../features/Family-Details/GetUpdateFamilyDetails';
import { RationCardDetails } from '../../../features/Family-Details/RationCardDetails';
import { updateFamilyMemberDetails } from '../../../features/Family-Details/UpdateFamilyMemberData';

const Family = ({ setRenderComponent, editFamily }) => {
  const { en } = translationsText;
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [loader, setLoader] = useState(false);
  const [rationCard, setRationCard] = useState([]);
  const [relation, setRelation] = useState([]);
  const [profession, setProfession] = useState([]);
  const [education, setEducation] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [relationloading, setRealtionloading] = useState(false);
  const [proloading, setProloading] = useState(false);
  const [educationloading, setEducationloading] = useState(false);
  const [test, setTest] = useState(false);

  const [apiCalling, setApiCalling] = useState({
    rationType: 0,
    ration: 0,
    education: 0,
    profession: 0,
  });

  const [familyMembers, setFamilyMembers] = useState([
    {
      relation: 'Father',
      firstName: '',
      middleName: '',
      lastName: '',
      aadhar: '',
      dob: null,
      profession: '',
      education: '',
      isNominee: 0,
      RegisteredKBOCWWB: null,
      relationString: '',
      professionString: '',
      educationSting: '',
    },
  ]);

  const [familyMemberStaticData, setFamilyMemberStatiData] = useState({
    rationCardNumber: '',
    rationCardType: '',
    imageData: '',
    rationCardTypestring: '',
    document_uploaded_id: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: parseInt(Cookies.get('id')),
      ration_card_no: familyMemberStaticData.rationCardNumber,
      ration_card_image_id: 0,
      ration_card_type: familyMemberStaticData.rationCardType,
      ration_card_files_xml: [
        {
          file_id: null,
          file_name: familyMemberStaticData?.imageData,
        },
      ],
      families: familyMembers.map((member) => ({
        relation_type_id: member.relation === 'Father' ? 49 : member.relation,
        first_name: member.firstName,
        last_name: member.lastName,
        middle_name: member.middleName,
        aadhar_no: member.aadhar,
        dob: member.dob,
        profession: member.profession,
        education: member.education,
        is_nominee: member.isNominee,
        is_registered: member.RegisteredKBOCWWB,
        registeration_no: 0,
        labour_user_id: parseInt(Cookies.get('id')),
      })),
    };
    console.log(payload);

    try {
      await familyMembersSchema.validate(
        { familyMembers, familyMemberStaticData },
        { abortEarly: false },
      );
      const respose = await dispatch(familyDetails(payload));
      if (respose.payload.success) {
        toast.success('Add family details successfully');
        setRenderComponent(3);
      } else {
        toast.success('Please provide valid ration card no.!');
      }
    } catch (error) {
      setLoader(false);
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        setValidationErrors(errors);
      }
    }
  };

  const familyMembersSchema = Yup.object().shape({
    familyMemberStaticData: Yup.object().shape({
      rationCardNumber: Yup.string()
        .required('Ration card number is required')
        .min(9, 'Ration card should have 9 number atleast')
        .max(10, 'Ration card number must be at most 10 characters long'),
      rationCardType: Yup.string().required('Ration card type is required'),
      imageData: Yup.string().required('Image data is required'),
    }),

    familyMembers: Yup.array().of(
      Yup.object().shape({
        relation: Yup.string().trim().required('*Relation is required'),
        firstName: Yup.string().trim().required('*First name is required'),
        middleName: Yup.string().trim().required('*middle name is required'),
        lastName: Yup.string().trim().required('*Last name is required'),
        aadhar: Yup.string()
          .required('Aadhar number is required')
          .max(12, 'Ration card number must be at most 12 characters long'),
        dob: Yup.date().nullable().required('*Date of birth is required'),
        profession: Yup.string().trim().required('*Profession is required'),
        education: Yup.string().trim().required('*Education is required'),
        isNominee: Yup.string().trim().required('*isNominee is required'),
        RegisteredKBOCWWB: Yup.string()
          .trim()
          .required('*RegisteredKBOCWWB is required'),
      }),
    ),
  });

  const GetOptionOfRationCardType = async (catalog_name) => {
    setLoading(true);
    let payload = {
      board_id: 1,
      catalog_name: catalog_name,
    };

    try {
      if (apiCalling.rationType === 0) {
        const response = await dispatch(getCatalogDetails(payload));
        setRationCard(response.payload.data);
        if (response.payload.data) {
          setApiCalling({
            ...apiCalling,
            rationType: 1,
          });
          setLoading(false);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const GetOptionOfRelation = async (catalog_name) => {
    setRealtionloading(true);
    let payload = {
      board_id: 1,
      catalog_name: catalog_name,
    };
    try {
      if (apiCalling.ration === 0) {
        const response = await dispatch(getCatalogDetails(payload));
        setRealtionloading(false);
        if (response.payload.data) {
          setApiCalling({
            ...apiCalling,
            ration: 1,
          });
        }
        setRelation(response.payload.data);
      }
      setRealtionloading(false);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const GetOptionOfProfesssion = async (catalog_name) => {
    setProloading(true);
    let payload = {
      board_id: 1,
      catalog_name: catalog_name,
    };
    try {
      if (apiCalling.profession === 0) {
        const response = await dispatch(getCatalogDetails(payload));
        setProfession(response.payload.data);
        setProloading(false);
        if (response.payload.data) {
          setApiCalling({
            ...apiCalling,
            profession: 1,
          });
        }
        return response.payload.data;
      }
      setProloading(false);
    } catch (error) {
      console.error('Error fetching catalog details:', error);
    }
  };

  const GetOptionOfEducation = async (catalog_name) => {
    setEducationloading(true);
    let payload = {
      board_id: 1,
      catalog_name: catalog_name,
    };
    try {
      if (apiCalling.education === 0) {
        const response = await dispatch(getCatalogDetails(payload));
        setEducation(response.payload.data);
        setEducationloading(false);
        if (response.payload.data) {
          setApiCalling({
            ...apiCalling,
            education: 1,
          });
        }
        return response.payload.data;
      }
      setEducationloading(false);
    } catch (error) {
      console.error('Error fetching catalog details:', error);
    }
  };

  const addFamilyMember = () => {
    if (familyMembers.length < 4) {
      setFamilyMembers([
        ...familyMembers,
        {
          relation: '',
          firstName: '',
          middleName: '',
          lastName: '',
          aadhar: '',
          dob: null,
          profession: '',
          education: '',
          isNominee: 0,
          RegisteredKBOCWWB: 0,
        },
      ]);
    } else {
      toast.error('maximum four members are allowed');
    }
  };

  const handleChange = (e, index, fieldName) => {
    const updatedFamilyMembers = [...familyMembers];
    updatedFamilyMembers[index] = {
      ...updatedFamilyMembers[index],
      [fieldName]: e.target.value,
    };
    setFamilyMembers(updatedFamilyMembers);
  };

  const removeFamilyMember = (index) => {
    const allFamilyMembers = [...familyMembers];
    allFamilyMembers.splice(index, index);
    setFamilyMembers(allFamilyMembers);
  };

  const removeDoc = () => {
    setFamilyMemberStatiData({
      ...familyMemberStaticData,
      imageData: '',
    });
  };

  const getEditFamilyDetails = async () => {
    const details = {
      key: 'user_id',
      value: Cookies.get('id'),
      board_id: 1,
      procedure_name: 'family_details',
    };
    const rationPayload = {
      board_id: 1,
      key: 'user_id',
      value: Cookies.get('id'),
      procedure_name: 'ration_card_details',
    };
    const { payload } = await dispatch(GetupdateFamilyDetails(details));
    const res = await dispatch(RationCardDetails(rationPayload));
    console.log(res, 'lololo');
    const { data } = payload;
    const allFamilyMembersData = await Promise.all(
      data.map(async (member) => {
        return {
          firstName: member.first_name,
          relation: member.catalog_value_parent_child_type_id,
          education: member.catalog_value_qualification_id,
          lastName: member.last_name,
          profession: member.catalog_value_profession_id,
          middleName: member.middle_name,
          aadhar: member.aadhar_no,
          dob: member.date_of_birth,
          isNominee: member.is_nominee ? 1 : 0,
          RegisteredKBOCWWB: member.is_regisrered_user,
          relationString: member.parent_child_relation,
          professionString: member.proffession,
          educationSting: member.education,
        };
      }),
    );
    const rationCardDetails = await Promise.all(
      res?.payload?.data?.map((data) => {
        const parsedData = JSON.parse(data?.ration_card_files_xml);
        const fileNameArray = parsedData[0]?.file_name;
        return {
          rationCardTypestring: data.ration_card_type,
          rationCardNumber: data?.catalog_value_ration_card_type_id,
          rationCardType: parseInt(data?.ration_card_no),
          imageData: fileNameArray,
          document_uploaded_id: data?.ration_card_document_upload_id,
        };
      }),
    );
    setFamilyMembers(allFamilyMembersData);
    setFamilyMemberStatiData(rationCardDetails[0]);
    if (res?.payload?.data[0]?.ration_card_no) {
      setTest(true);
    }
  };

  const handleUpdateFamilyDetails = async () => {
    // const payload = {
    //   user_id: parseInt(Cookies.get('id')),
    //   ration_card_no: familyMemberStaticData.rationCardNumber,
    //   ration_card_image_id: 'null',
    //   ration_card_type: familyMemberStaticData.rationCardType,
    //   ration_card_files_xml: familyMemberStaticData.imageData,
    //   families: familyMembers.map((member) => ({
    //     relation_id: 203210,
    //     labour_user_id: parseInt(Cookies.get('id')),
    //     parent_child_user_id: 4431567,
    //     isinsert: 0,
    //     isdeleted: 0,
    //     isactive: 1,

    //     relation_type_id: member.relation,
    //     first_name: member.firstName,
    //     last_name: member.lastName,
    //     middle_name: member.middleName,
    //     aadhar_no: member.aadhar,
    //     dob: member.dob,
    //     profession: member.profession,
    //     education: member.education,
    //     is_nominee: member.isNominee,
    //     is_registered: member.RegisteredKBOCWWB,
    //     registeration_no: 0,
    //   })),
    // };
    const payload = {
      user_id: parseInt(Cookies.get('id')),
      ration_card_no: null,
      ration_card_image_id: 'null',
      ration_card_type: familyMemberStaticData.rationCardType,
      ration_card_files_xml: familyMemberStaticData.imageData,
      families: familyMembers.map((member) => ({
        relation_id: 203210,
        labour_user_id: parseInt(Cookies.get('id')),
        parent_child_user_id: 4431567,
        isinsert: 0,
        isdeleted: 0,
        isactive: 1,

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
        registeration_no: 0,
      })),
    };
    try {
      await familyMembersSchema.validate(
        { familyMembers, familyMemberStaticData },
        { abortEarly: false },
      );
      const respose = await dispatch(updateFamilyMemberDetails(payload));

      if (respose.payload.success) {
        toast.success('update details successfully');
        setRenderComponent(3);
      } else {
        toast.success('Please provide valid ration card no.!');
      }
    } catch (error) {
      setLoader(false);
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        setValidationErrors(errors);
      }
    }
  };

  useEffect(() => {
    getEditFamilyDetails();
  }, []);

  return (
    <>
      <ToastContainer />
      <Row className="m-0">
        <Row className="family-title-row">
          <Col xs={12} className="profile-title">
            <h1 className="mx-5">{en.rationCardDetails}</h1>
          </Col>
        </Row>
        <form onSubmit={handleSubmit}>
          <Row className="form-row">
            {/* Ration Card Number */}
            <Col xs={12} className="family-col-1">
              <Row>
                <Col xs={12} md={6}>
                  <Required className="mt-3 mb-2" title={en.rationCardNumber} />
                  <FormControl fullWidth className="formcontrol1">
                    <TextField
                      className="size21"
                      variant="outlined"
                      name="rationCardNumber"
                      type="text"
                      inputProps={{ maxLength: 10 }}
                      onChange={(e) => {
                        setFamilyMemberStatiData({
                          ...familyMemberStaticData,
                          rationCardNumber: e.target.value,
                        });
                      }}
                      value={familyMemberStaticData?.rationCardNumber}
                      placeholder="Enter Your Ration Card Number"
                    />
                  </FormControl>
                  {validationErrors[
                    `familyMemberStaticData.rationCardNumber`
                  ] && (
                    <span className="text-danger">
                      {
                        validationErrors[
                          `familyMemberStaticData.rationCardNumber`
                        ]
                      }
                    </span>
                  )}
                </Col>

                <Col xs={12} md={6}>
                  <Box>
                    <Required className="mt-3 mb-2" title={en.rationCard} />
                    <FormControl variant="outlined" fullWidth>
                      <Select
                        className="select-marital"
                        name="rationCardType"
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        onChange={(e) => {
                          setFamilyMemberStatiData({
                            ...familyMemberStaticData,
                            rationCardType: e.target.value,
                          });
                        }}
                        defaultValue={
                          familyMemberStaticData.rationCardType == ''
                            ? 'select'
                            : familyMemberStaticData.rationCardType
                        }
                        value={
                          familyMemberStaticData.rationCardType
                            ? familyMemberStaticData.rationCardType
                            : 'select'
                        }
                        onOpen={() =>
                          GetOptionOfRationCardType('Ration card type')
                        }
                      >
                        <MenuItem
                          value={
                            familyMemberStaticData.rationCardType == ''
                              ? 'select'
                              : familyMemberStaticData.rationCardType
                          }
                        >
                          <Box style={{ width: '30%', margin: 'auto' }}>
                            {loading
                              ? 'loading...'
                              : familyMemberStaticData.rationCardType === 42
                                ? 'APL'
                                : familyMemberStaticData.rationCardType === 43
                                  ? 'BPL'
                                  : familyMemberStaticData.rationCardType === 44
                                    ? 'None of these'
                                    : 'select'}
                          </Box>
                        </MenuItem>
                        {rationCard?.map((i) => (
                          <MenuItem key={i.value_id} value={i.value_id}>
                            <ListItemText
                              style={{ color: 'black' }}
                              primary={i.short_name}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {validationErrors[
                      `familyMemberStaticData.rationCardType`
                    ] && (
                      <span className="text-danger">
                        {
                          validationErrors[
                            `familyMemberStaticData.rationCardType`
                          ]
                        }
                      </span>
                    )}
                  </Box>
                </Col>
              </Row>
            </Col>

            {/* Upload Photo */}
            <Col xs={12} className="family-col-1">
              <div className="browsebutton2-div mt-4 d-flex">
                <label
                  htmlFor="upload-photo"
                  className="browse-button"
                  style={{ fontSize: '24px' }}
                >
                  <img alt="..." src={folder} /> {en.browse}
                </label>
                <div>
                  <FormControl className="d-flex">
                    <TextField
                      style={{ height: '60px', color: 'black' }}
                      variant="outlined"
                      disabled
                      name="passbookDocumentName"
                      value={
                        familyMemberStaticData.imageData
                          ? familyMemberStaticData.imageData
                          : ''
                      }
                    ></TextField>
                    <div className="d-flex justify-content-end">
                      {familyMemberStaticData.imageData && (
                        <CancelIcon
                          onClick={removeDoc}
                          style={{
                            fontSize: '30px',
                            cursor: 'pointer',
                            color: '#9B1D03',
                          }}
                        />
                      )}
                    </div>
                  </FormControl>
                </div>
                <input
                  type="file"
                  required
                  key={familyMemberStaticData.imageData}
                  name="imageData"
                  id="upload-photo"
                  onChange={(event) => {
                    const selectedFile = event.target.files[0];
                    setFamilyMemberStatiData({
                      ...familyMemberStaticData,
                      imageData: selectedFile?.name,
                    });
                  }}
                />
              </div>
              {validationErrors[`familyMemberStaticData.imageData`] && (
                <span className="text-danger">
                  {validationErrors[`familyMemberStaticData.imageData`]}
                </span>
              )}

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
                <div key={index}>
                  <Paper className="mt-5 pb-5 px-5 family-form" elevation={3}>
                    {familyMembers.length > 1 && index !== 0 && (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'end',
                          alignItems: 'end',
                        }}
                      >
                        <CancelIcon
                          onClick={() => removeFamilyMember(index)}
                          className="mt-2"
                          style={{
                            width: '30px',
                            height: '30px',
                            cursor: 'pointer',
                            color: '9B1D03',
                          }}
                        />
                      </div>
                    )}

                    <Row>
                      {/* Relation */}
                      <Col xs={8} md={6}>
                        <Required className="mt-3 mb-2" title={en.relation} />
                        <FormControl fullWidth className="formControl1">
                          <Select
                            style={{ height: '45px' }}
                            labelId={`relation-label`}
                            id={`relation`}
                            name={`relation`}
                            defaultValue={
                              familyMembers[index].relation == ''
                                ? 'select'
                                : familyMembers[index].relation
                            }
                            value={
                              familyMembers[index].relation
                                ? familyMembers[index].relation
                                : 'select'
                            }
                            onChange={(e) => handleChange(e, index, 'relation')}
                            onOpen={() => GetOptionOfRelation('Relation')}
                          >
                            <MenuItem
                              onChange={() => {}}
                              value={familyMembers[index].relation || 'select'}
                            >
                              {apiCalling.ration > 0
                                ? 'select'
                                : familyMembers[index]?.relationString ||
                                  (relationloading
                                    ? 'Loading...'
                                    : index == 0
                                      ? 'Father'
                                      : 'select')}
                            </MenuItem>
                            {relation?.map((i) => (
                              <MenuItem
                                onChange={() => {}}
                                key={i.value_id}
                                value={i.value_id}
                              >
                                <ListItemText primary={i.value} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {validationErrors[
                          `familyMembers[${index}].relation`
                        ] && (
                          <span className="text-danger">
                            {
                              validationErrors[
                                `familyMembers[${index}].relation`
                              ]
                            }
                          </span>
                        )}
                      </Col>

                      {/* First Name */}
                      <Col xs={12} md={6}>
                        <Required className="mt-3 mb-2" title={en.firstName} />
                        <FormControl fullWidth>
                          <TextField
                            name="firstName"
                            onChange={(e) => {
                              handleChange(e, index, 'firstName');
                            }}
                            value={familyMembers[index].firstName}
                            variant="outlined"
                            placeholder="Enter Your First Name"
                          />
                        </FormControl>
                        {validationErrors[
                          `familyMembers[${index}].firstName`
                        ] && (
                          <span className="text-danger">
                            {
                              validationErrors[
                                `familyMembers[${index}].firstName`
                              ]
                            }
                          </span>
                        )}
                      </Col>

                      {/* Middle Name */}
                      <Col xs={12} md={6}>
                        <Required className="mt-3 mb-2" title={en.middleName} />
                        <FormControl fullWidth>
                          <TextField
                            name="middleName"
                            onChange={(e) => {
                              handleChange(e, index, 'middleName');
                            }}
                            value={
                              familyMembers[index]?.middleName
                                ? familyMembers[index]?.middleName
                                : ''
                            }
                            variant="outlined"
                            placeholder="Enter Your Middle Name"
                          />
                        </FormControl>
                        {validationErrors[
                          `familyMembers[${index}].middleName`
                        ] && (
                          <span className="text-danger">
                            {
                              validationErrors[
                                `familyMembers[${index}].middleName`
                              ]
                            }
                          </span>
                        )}
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
                              handleChange(e, index, 'lastName');
                            }}
                            value={
                              familyMembers[index].lastName
                                ? familyMembers[index].lastName
                                : ''
                            }
                          />
                        </FormControl>
                        {validationErrors[
                          `familyMembers[${index}].lastName`
                        ] && (
                          <span className="text-danger">
                            {
                              validationErrors[
                                `familyMembers[${index}].lastName`
                              ]
                            }
                          </span>
                        )}
                      </Col>

                      {/* Aadhar Number */}
                      <Col xs={12} md={6}>
                        <Required className="mt-3 md-2" title="Aadhar Number" />
                        <FormControl fullWidth>
                          <TextField
                            inputProps={{ maxLength: 12 }}
                            variant="outlined"
                            placeholder="XXXXXXXXX234"
                            name="aadhar"
                            onChange={(e) => {
                              handleChange(e, index, 'aadhar');
                            }}
                            value={
                              familyMembers[index].aadhar
                                ? familyMembers[index].aadhar
                                : ''
                            }
                          />
                        </FormControl>
                        {validationErrors[`familyMembers[${index}].aadhar`] && (
                          <span className="text-danger">
                            {validationErrors[`familyMembers[${index}].aadhar`]}
                          </span>
                        )}
                      </Col>

                      {/* Date of Birth */}
                      <Col xs={12} md={6}>
                        <Required
                          className="mb-2 mt-4"
                          title={en.dateofBirth}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            name="dob"
                            className="datepicker"
                            format="YYYY-MM-DD"
                            value={dayjs(member.dob)}
                            onChange={(date) => {
                              setFamilyMembers((prevMembers) => [
                                ...prevMembers.slice(0, index),
                                {
                                  ...prevMembers[index],
                                  dob: dayjs(date.$d).format('YYYY-MM-DD'),
                                },
                                ...prevMembers.slice(index + 1),
                              ]);
                            }}
                          />
                        </LocalizationProvider>
                        {validationErrors[`familyMembers[${index}].dob`] && (
                          <span className="text-danger">
                            {validationErrors[`familyMembers[${index}].dob`]}
                          </span>
                        )}
                      </Col>

                      {/* Profession */}
                      <Col xs={8} md={6}>
                        <Required className="mt-3 mb-2" title={en.profession} />
                        <FormControl fullWidth className="formControl1">
                          <Select
                            style={{ height: '45px' }}
                            labelId="relation-label"
                            id="profession"
                            name="profession"
                            onChange={(e) => {
                              handleChange(e, index, 'profession');
                            }}
                            onOpen={() => GetOptionOfProfesssion('Profession')}
                            defaultValue={
                              familyMembers[index].profession == ''
                                ? 'select'
                                : familyMembers[index].profession
                            }
                            value={
                              familyMembers[index].profession
                                ? familyMembers[index].profession
                                : 'select'
                            }
                          >
                            <MenuItem
                              value={
                                familyMembers[index].profession == ''
                                  ? 'select'
                                  : familyMembers[index].profession
                              }
                            >
                              {apiCalling.profession > 0
                                ? 'select'
                                : familyMembers[index]?.professionString ||
                                  (proloading ? 'Loading...' : '--Select--')}
                            </MenuItem>
                            {profession?.map((i) => (
                              <MenuItem key={i.value_id} value={i.value_id}>
                                <ListItemText primary={i.short_name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {validationErrors[
                          `familyMembers[${index}].profession`
                        ] && (
                          <span className="text-danger">
                            {
                              validationErrors[
                                `familyMembers[${index}].profession`
                              ]
                            }
                          </span>
                        )}
                      </Col>

                      {/* Education */}
                      <Col xs={8} md={6}>
                        <Required className="mt-3 mb-2" title={en.education} />
                        <FormControl fullWidth className="formControl1">
                          <Select
                            style={{ height: '45px' }}
                            labelId="relation-label"
                            id="education"
                            name="education"
                            onChange={(e) => {
                              handleChange(e, index, 'education');
                            }}
                            onOpen={() => GetOptionOfEducation('Education')}
                            defaultValue={
                              familyMembers[index].education == ''
                                ? 'select'
                                : familyMembers[index].education
                            }
                            value={
                              familyMembers[index].education
                                ? familyMembers[index].education
                                : 'select'
                            }
                          >
                            <MenuItem
                              value={
                                familyMembers[index].education == ''
                                  ? 'select'
                                  : familyMembers[index].education
                              }
                            >
                              {apiCalling.education > 0
                                ? 'select'
                                : familyMembers[index]?.educationSting ||
                                  (educationloading
                                    ? 'Loading...'
                                    : '--Select--')}
                            </MenuItem>
                            {education?.map((i) => (
                              <MenuItem key={i.value_id} value={i.value_id}>
                                <ListItemText primary={i.short_name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {validationErrors[
                          `familyMembers[${index}].education`
                        ] && (
                          <span className="text-danger">
                            {
                              validationErrors[
                                `familyMembers[${index}].education`
                              ]
                            }
                          </span>
                        )}
                      </Col>

                      {/* Nominee */}
                      <div>
                        <Col xs={12} className="member-p" key={index}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={'isNominee'}
                                checked={member.isNominee === 1 ? true : false}
                                onClick={() => {
                                  const updatedFamilyMembers = [
                                    ...familyMembers,
                                  ];
                                  updatedFamilyMembers.forEach((mem, i) => {
                                    mem.isNominee = i === index ? 1 : 0;
                                  });
                                  setFamilyMembers(updatedFamilyMembers);
                                }}
                              />
                            }
                            label="Nominee"
                          />
                        </Col>
                        {validationErrors[
                          `familyMembers[${index}].isNominee`
                        ] && (
                          <span className="text-danger">
                            {
                              validationErrors[
                                `familyMembers[${index}].isNominee`
                              ]
                            }
                          </span>
                        )}
                      </div>

                      {/* Already Registered in KBOCWWB */}
                      <div>
                        <Col xs={12} className="member-p mt-4">
                          <FormControl
                            className="interstateRadio"
                            variant="outlined"
                            fullWidth
                            component="fieldset"
                          >
                            <RadioGroup row>
                              <Required
                                className="mt-2 mb-2"
                                title="Already Registered in KBOCWWB"
                                value={'0'}
                                onChange={() => {}}
                              />
                              <FormControlLabel
                                className="col-2"
                                value="1"
                                checked={
                                  member.RegisteredKBOCWWB === 1 ? true : false
                                }
                                onClick={() => {
                                  const updatedFamilyMembers = [
                                    ...familyMembers,
                                  ];
                                  updatedFamilyMembers[index] = {
                                    ...updatedFamilyMembers[index],
                                    RegisteredKBOCWWB: 1,
                                  };
                                  setFamilyMembers(updatedFamilyMembers);
                                }}
                                control={<Radio />}
                                label="Yes"
                              />
                              <FormControlLabel
                                className="col-2"
                                value="0"
                                control={<Radio />}
                                label="No"
                                checked={
                                  member.RegisteredKBOCWWB === 0 ? true : false
                                }
                                onClick={() => {
                                  const updatedFamilyMembers = [
                                    ...familyMembers,
                                  ];
                                  updatedFamilyMembers[index] = {
                                    ...updatedFamilyMembers[index],
                                    RegisteredKBOCWWB: 0,
                                  };
                                  setFamilyMembers(updatedFamilyMembers);
                                }}
                              />
                            </RadioGroup>
                          </FormControl>
                        </Col>
                        {validationErrors[
                          `familyMembers[${index}].RegisteredKBOCWWB`
                        ] && (
                          <span className="text-danger">
                            {
                              validationErrors[
                                `familyMembers[${index}].RegisteredKBOCWWB`
                              ]
                            }
                          </span>
                        )}
                      </div>
                    </Row>
                  </Paper>
                </div>
              ))}
            </Row>

            {/* Family Members */}
            <Col xs={12} className="family-col-3">
              {en.familyMembers}
            </Col>

            {/* Add Member */}
            <Col
              onClick={addFamilyMember}
              xs={12}
              className="addMemberCol mt-4 family-col-10"
            >
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
                  {test ? (
                    <div>
                      {!loader ? (
                        <Link to="#" style={{ flexGrow: '0.5' }}>
                          <Button
                            onClick={handleUpdateFamilyDetails}
                            variant="outline-primary"
                            className="next-button"
                          >
                          {en.saveyourDetails}
                          </Button>
                        </Link>
                      ) : (
                        <CircularProgress className="mt-5 mx-5" />
                      )}
                    </div>
                  ) : (
                    <div>
                      {!loader ? (
                        <Link to="#" style={{ flexGrow: '0.5' }}>
                          <Button
                            onClick={handleSubmit}
                            variant="outline-primary"
                            className="next-button"
                          >
                            {en.saveandContinue}
                          </Button>
                        </Link>
                      ) : (
                        <CircularProgress className="mt-5 mx-5" />
                      )}
                    </div>
                  )}
                </>
              ) : (
                <Link to="#" onClick={handleSubmit} style={{ flexGrow: '0.5' }}>
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
