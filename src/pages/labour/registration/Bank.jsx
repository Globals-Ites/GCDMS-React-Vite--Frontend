import * as yup from 'yup';
import {
  FormControl,
  TextField,
  FormControlLabel,
  TextareaAutosize,
  CircularProgress,
  InputAdornment,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import React, { useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import folder from '../../../assets/images/Folderwhite-01-01.svg';
import text from '../../../translations';
import checkgreen from '../../../assets/images/Subtraction 1.svg';
import close from '../../../assets/images/closeIcon.svg';
import { Required } from '../../../utils/tools';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  addLabourBankDetails,
  getIfscDetails,
  updateLabourBankDetails,
} from '../../../features/Bank-details/BankSlice';
import { reviewDetails } from '../../../features/ReviewSlice/ReviewSlice';

const Bank = ({ setRenderComponent }) => {
  const { header } = text.en;
  const { en } = text;

  const myRef = React.createRef();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [phone, setPhone] = React.useState('');
  const [filesxmlPresent, setfilesxmlPresent] = React.useState(true);
  const [filesxmlPresentNominee, setfilesxmlPresentNominee] =
    React.useState(true);
  const [loadingfiles, setloadingfiles] = React.useState(true);
  const [loadingfiles_n, setloadingfiles_n] = React.useState(true);
  const [selectedfiles, setselectedfiles] = React.useState({});
  const [selectedfilesNominee, setselectedfilesNominee] = React.useState({});

  const [removedFile, setRemovedFile] = React.useState(false);
  const [fetchedData, setFetchedData] = React.useState({});
  const [edit, setEdit] = React.useState(false);
  const [passbookDoc,setPassbookDoc]=React.useState([])
  const [passbookDocNominee,setPassbookDocNominee]=React.useState([])

  const [allValues, setAllValues] = React.useState({
    ifscCode: users?.bank_details.ifscCode,
    accountNumber: users?.bank_details.accountNumber,
    bankName: users?.bank_details.bankName,
    bankBranch: users?.bank_details.bankBranch,
    bankAddress: users?.bank_details.bankAddress,
    imgfile: users?.bank_details.imgfile,
    passbookDocumentName: users?.bank_details.passbookDocumentName,
    passbookUploadResponse: users?.bank_details.passbookUploadResponse,
    nomineeCheck: users?.bank_details.nomineeCheck,

    ifscCode_nominee: users?.bank_details.ifscCode_nominee,
    accountNumber_nominee: users?.bank_details.accountNumber_nominee,
    bankName_nominee: users?.bank_details.bankName_nominee,
    bankBranch_nominee: users?.bank_details.bankBranch_nominee,
    bankAddress_nominee: users?.bank_details.bankAddress_nominee,
    imgfile_nominee: users?.bank_details.imgfile_nominee,
    passbookDocumentName_nominee:
      users?.bank_details.passbookDocumentName_nominee,
    passbookUploadResponse_nominee:
      users?.bank_details.passbookUploadResponse_nominee,

    accountNumberError: false,
    bankNameError: false,
    accountNumberNomineeError: false,
    bankNameNomineeError: false,
  });

  useEffect(() => {
    handleEdit();
  }, []);

  const handleChangeCheckbox = (event) => {
    setAllValues({ ...allValues, [event.target.name]: event.target.checked });
  };

  const handleChange = (event) => {
    if (event.target.name === 'ifscCode') {
      setLoadingVerifyBank(false);
      setcheckBank(false);
    }
    if (event.target.name === 'ifscCode_nominee') {
      setLoadingVerifyBank_nominee(false);
      setcheckBank_nominee(false);
    }

    setAllValues({
      ...allValues,
      ...allValues,
      [event.target.name]: event.target.value,
    });
  };

  const changeHandler = (e) => {};

  const handleFileChange = (event) => {
    setloadingfiles(true);

    if (event.target.files[0].size > 2000001) {
      toast.error('ERROR', 'Please upload file of size less than 2MB.', {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 3000,
      });
    } else if (!event.target.files[0].type.includes('image')) {
      toast.error('ERROR', 'Please upload file in JPEG or PNG format.', {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 3000,
      });
    } else {
      const joined = Array.from(selectedfiles).concat(
        Array.from(event.target.files),
      );
      console.log(joined);
      setselectedfiles(joined);
    }

    setloadingfiles(false);
  };

  const handleFileChange_nominee = (event) => {
    setloadingfiles_n(true);
    if (event.target.files[0].size > 2000001) {
      toast.error('ERROR', 'Please upload file of size less than 2MB.', {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 3000,
      });
    } else if (!event.target.files[0].type.includes('image')) {
      toast.error('ERROR', 'Please upload file in JPEG or PNG format.', {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 3000,
      });
    } else {
      const joined = Array.from(selectedfilesNominee).concat(
        Array.from(event.target.files),
      );

      setselectedfilesNominee(joined);
    }
    setloadingfiles_n(false);
  };

  const handleEnter = (event) => {
    console.log('in handleEnter');
    console.log(initialValues);
  };

  const [checkBank_nominee, setcheckBank_nominee] = React.useState(false);
  const [loadingVerifyBank_nominee, setLoadingVerifyBank_nominee] =
    React.useState(false);

  const [checkBank, setcheckBank] = React.useState(false);
  const [loadingVerifyBank, setLoadingVerifyBank] = React.useState(false);

  const verifyBank = async () => {
    if (
      formik.values.ifscCode !== null &&
      formik.values.ifscCode !== '' &&
      formik.values.ifscCode !== 'null'
    ) {
      setLoadingVerifyBank(true);
      const response = await dispatch(getIfscDetails(formik.values.ifscCode));
      if (
        response.success === true &&
        response.data !== undefined &&
        response.data.BANK !== undefined
      ) {
        toast.success('Bank Account Details Fetched Successfully', {
          position: 'bottom-right',
          theme: 'colored',
          autoClose: 1000,
        });
        setAllValues({
          ...allValues,
          bankFetchedData: response.data,
          is_bank_verified: true,
          bankName: response.data.BANK,
          bankBranch: response.data.BRANCH,
          bankAddress: response.data.ADDRESS,
        });
        setLoadingVerifyBank(false);
      } else if (response.error) {
        setLoadingVerifyBank(false);
        toast.error('Bank Details Fetching Failed!', {
          position: 'bottom-right',
          theme: 'colored',
          autoClose: 1000,
        });
      }
    } else {
      toast.error('Please Fill IFSC Code!', {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 1000,
      });
    }
  };

  const verifyBankNominee = async () => {
    if (
      formik.values.ifscCode_nominee !== null &&
      formik.values.ifscCode_nominee !== '' &&
      formik.values.ifscCode_nominee !== 'null'
    ) {
      setLoadingVerifyBank(true);
      const response = await dispatch(
        getIfscDetails(formik.values.ifscCode_nominee),
      );
      console.log(response.success);
      if (
        response.success === true &&
        response.data !== undefined &&
        response.data.BANK !== undefined
      ) {
        toast.success('Bank Account Details Fetched Successfully', {
          position: 'bottom-right',
          theme: 'colored',
          autoClose: 1000,
        });
        setAllValues({
          ...allValues,
          bankFetchedData: response.data,
          is_bank_verified: true,
          bankName_nominee: response.data.BANK,
          bankBranch_nominee: response.data.BRANCH,
          bankAddress_nominee: response.data.ADDRESS,
        });
        setLoadingVerifyBank(false);
      } else if (response.error) {
        setLoadingVerifyBank(false);
        toast.error('Bank Details Fetching Failed!', {
          position: 'bottom-right',
          theme: 'colored',
          autoClose: 1000,
        });
      }
    } else {
      toast.error('Please Fill IFSC Code!', {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 1000,
      });
    }
  };

  const removefile = (index) => {
    setloadingfiles(true);
    setRemovedFile(true);
    console.log('removefile index: ' + index);
    selectedfiles.splice(index, 1);

    setTimeout(() => setloadingfiles(false), 1);
  };

  const removefileNominee = (index) => {
    setloadingfiles(true);
    console.log('removefileNominee index: ' + index);
    selectedfilesNominee.splice(index, 1);

    setTimeout(() => setloadingfiles(false), 1);
  };

  const initialValues2 = {
    accountNumber: '',
    ifscCode: '',
  };

  const validationSchema2 = yup.object().shape({
    accountNumber: yup.string().trim().required('*Account Number is Required'),
    ifscCode: yup.string().trim().required('*IFSC Code is Required'),
  });

  const initialValues = {
    accountNumber: '',
    ifscCode: '',
    accountNumber_nominee: '',
    ifscCode_nominee: '',
  };

  const validationSchema = yup.object().shape({
    accountNumber: yup.string().trim().required('*Account Number is Required'),
    ifscCode: yup.string().trim().required('*IFSC Code is Required'),
    accountNumber_nominee: yup
      .string()
      .trim()
      .required('*Account Number is Required'),
    ifscCode_nominee: yup.string().trim().required('*IFSC Code is Required'),
  });

  const update_func = async () => {
    if (allValues.nomineeCheck === undefined || !allValues.nomineeCheck) {
      let details_with_out_nominee = {
        user_id: Cookies.get('id'),
        banks: [
          {
            labour_user_id: Cookies.get('id'),
            nominee_for_user_id: null,
            nominee_first_name: null,
            nominee_middle_name: null,
            nominee_last_name: null,
            ifsc_code: formik.values.ifscCode,
            account_no: formik.values.accountNumber,
            bank_name: allValues.bankName,
            bank_branch: allValues.bankBranch,
            bank_address: allValues.bankAddress,
            files: [
              {
                file_id: 0,
                file_name: selectedfiles?.[0]?.name?selectedfiles?.[0]?.name:passbookDoc?.[0]?.file_name,
              },
            ],
            bank_passbook_upload_id: '-',
            is_nominee: 0,
            is_verified: 1,
          },
        ],
      };
      const resp = await dispatch(
        updateLabourBankDetails(details_with_out_nominee),
      );
      console.log(resp);
      if (resp.payload.error) {
        toast.error(`${resp.payload.errors.msg}`, {
          position: 'bottom-right',
          theme: 'colored',
          autoClose: 1000,
        });
      } else {
        toast.success('Updated Successfully!', {
          position: 'bottom-right',
          theme: 'colored',
          autoClose: 1000,
        });
        setRenderComponent(5);
      }
    } else if (allValues.nomineeCheck) {
      let details_with_nominee = {
        user_id: Cookies.get('id'),
        banks: [
          {
            labour_user_id: Cookies.get('id'),
            nominee_for_user_id: null,
            nominee_first_name: null,
            nominee_middle_name: null,
            nominee_last_name: null,
            ifsc_code: formik.values.ifscCode,
            account_no: formik.values.accountNumber,
            bank_name: allValues.bankName,
            bank_branch: allValues.bankBranch,
            bank_address: allValues.bankAddress,
            files: [
              {
                file_id: 0,
                file_name: selectedfiles?.[0]?.name?selectedfiles?.[0]?.name:passbookDoc?.[0]?.file_name,
              },
            ],
            bank_passbook_upload_id: 0,
            is_nominee: 0,
            is_verified: 1,
          },
          {
            labour_user_id: Cookies.get('id'),
            nominee_for_user_id: null,
            nominee_first_name: null,
            nominee_middle_name: null,
            nominee_last_name: null,
            ifsc_code: formik.values.ifscCode_nominee,
            account_no: formik.values.accountNumber_nominee,
            bank_name: allValues.bankName_nominee,
            bank_branch: allValues.bankBranch_nominee,
            bank_address: allValues.bankAddress_nominee,
            files: [
              {
                file_id: 0,
                file_name: selectedfilesNominee?.[0]?.name?selectedfilesNominee?.[0]?.name:passbookDocNominee?.[0]?.file_name,
              },
            ],
            bank_passbook_upload_id: 0,
            is_nominee: 1,
            is_verified: 1,
          },
        ],
      };
      const resp=await dispatch(updateLabourBankDetails(details_with_nominee));
      if (resp.payload.error) {
        toast.error(`${resp.payload.errors.msg}`, {
          position: 'bottom-right',
          theme: 'colored',
          autoClose: 1000,
        });
      } else {
        toast.success('Updated Successfully!', {
          position: 'bottom-right',
          theme: 'colored',
          autoClose: 1000,
        });
        setRenderComponent(5);
      }
    } else {
      toast.error('Internal Error!', {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 1000,
      });
    }
    console.log('gfhjkjlk;l');
  };

  const bank_func = () => {
    if (allValues.nomineeCheck === undefined || !allValues.nomineeCheck) {
      let details_with_out_nominee = {
        user_id: Cookies.get('id'),
        banks: [
          {
            ifsc_code: formik.values.ifscCode,
            account_no: formik.values.accountNumber,
            bank_name: allValues.bankName,
            bank_branch: allValues.bankBranch,
            bank_address: allValues.bankAddress,
            files: [
              {
                file_id: 0,
                file_name: selectedfiles?.[0]?.name,
              },
            ],
            bank_passbook_upload_id: '-',
            is_nominee: 0,
            is_verified: 1,
          },
        ],
      };
      dispatch(addLabourBankDetails(details_with_out_nominee));
      toast.success('Submitted Successfully!', {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 1000,
      });
      setRenderComponent(4);
    } else if (allValues.nomineeCheck) {
      let details_with_nominee = {
        user_id: Cookies.get('id'),
        banks: [
          {
            ifsc_code: formik.values.ifscCode,
            account_no: formik.values.accountNumber,
            bank_name: allValues.bankName,
            bank_branch: allValues.bankBranch,
            bank_address: allValues.bankAddress,
            files: [
              {
                file_id: 0,
                file_name: selectedfiles?.[0]?.name,
              },
            ],
            bank_passbook_upload_id: '-',
            is_nominee: 0,
            is_verified: 1,
          },
          {
            ifsc_code: formik.values.ifscCode_nominee,
            account_no: formik.values.accountNumber_nominee,
            bank_name: allValues.bankName_nominee,
            bank_branch: allValues.bankBranch_nominee,
            bank_address: allValues.bankAddress_nominee,
            files: [
              {
                file_id: 0,
                file_name: selectedfilesNominee?.[0]?.name,
              },
            ],
            bank_passbook_upload_id: '-',
            is_nominee: 1,
            is_verified: 1,
          },
        ],
      };
      dispatch(addLabourBankDetails(details_with_nominee));
      toast.success('Submitted Successfully!', {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 1000,
      });
      setRenderComponent(4);
    } else {
      toast.error('Internal Error!', {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 1000,
      });
    }
  };

  const formik = useFormik({
    initialValues: allValues.nomineeCheck ? initialValues : initialValues2,
    validationSchema: allValues.nomineeCheck
      ? validationSchema
      : validationSchema2,
    onSubmit: (values) => {
      if (fetchedData?.[0]) {
        update_func();
      } else {
        bank_func();
      }
    },
  });

  const handleEdit = async () => {
    setEdit(true);
    const details = {
      key: 'user_id',
      value: Cookies.get('id'),
      board_id: 1,
      procedure_name: 'all',
    };
    const response = await dispatch(reviewDetails(details));
    console.log(response.payload.data.bank_details[0].account_no);
    if(response.payload.data.bank_details?.length!==0){
      const doc1=response.payload.data.bank_details?.[0]?.bank_upload_files_xml
      setPassbookDoc(JSON.parse(doc1))
      if(response.payload.data.bank_details?.length>1){
        const doc2=response.payload.data.bank_details?.[1]?.bank_upload_files_xml
      setPassbookDocNominee(JSON.parse(doc2))
      }
    }
    setFetchedData(response.payload.data.bank_details);
    console.log(response.payload.data.bank_details);
    if (response.payload.data.bank_details.length > 1) {
      formik.setValues({
        accountNumber: response.payload.data.bank_details[0].account_no,
        ifscCode: response.payload.data.bank_details[0].ifsc_code,
        accountNumber_nominee: response.payload.data.bank_details[1].account_no,
        ifscCode_nominee: response.payload.data.bank_details[1].ifsc_code,
      });
      setAllValues({
        ...allValues,
        bankName: response.payload.data.bank_details[0].bank_name,
        bankBranch: response.payload.data.bank_details[0].bank_branch,
        bankAddress: response.payload.data.bank_details[0].bank_address,
        bankName_nominee: response.payload.data.bank_details[1].bank_name,
        bankBranch_nominee: response.payload.data.bank_details[1].bank_branch,
        bankAddress_nominee: response.payload.data.bank_details[1].bank_address,
        nomineeCheck: true,
      });
    } else {
      formik.setValues({
        accountNumber: response.payload.data.bank_details[0].account_no,
        ifscCode: response.payload.data.bank_details[0].ifsc_code,
      });
      setAllValues({
        ...allValues,
        bankName: response.payload.data.bank_details[0].bank_name,
        bankBranch: response.payload.data.bank_details[0].bank_branch,
        bankAddress: response.payload.data.bank_details[0].bank_address,
      });
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <ToastContainer />
        <Row className="m-0">
          <Row className="bank-title-row">
            <Col xs={12} className="profile-title">
              <h1>{en.bankPassbookStatement}</h1>
            </Col>
          </Row>

          <Row className="form-row">
            <Col xs={12} md={6} className="bank-col-1">
              <Row className="form-inner-card-right">
                <Col xs={12}>
                  <Required className="mt-3 mb-2" title={en.accountNumber} />
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      placeholder="Enter Your Account Number"
                      name="accountNumber"
                      value={formik.values.accountNumber}
                      onChange={formik.handleChange}
                      error={allValues.accountNumberError}
                      helperText={
                        allValues.accountNumberError
                          ? 'Please enter in correct format'
                          : ''
                      }
                    />
                  </FormControl>
                  {formik.errors.accountNumber &&
                  formik.touched.accountNumber ? (
                    <p style={{ color: 'red' }}>
                      {formik.errors.accountNumber}
                    </p>
                  ) : (
                    ''
                  )}
                </Col>

                <Col xs={12}>
                  <Required
                    className="mt-4 mb-2"
                    title={en.enterYourBankName}
                  />
                  <FormControl
                    fullWidth
                    className="formcontrol1"
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        handleEnter();
                      }
                    }}
                  >
                    <TextField
                      variant="outlined"
                      placeholder="Enter Your Bank Name"
                      name="bankName"
                      value={allValues.bankName}
                      onChange={changeHandler}
                      error={allValues.bankNameError}
                      helperText={
                        allValues.bankNameError
                          ? 'Please enter in correct format'
                          : ''
                      }
                    />
                  </FormControl>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6} className="bank-col-2">
              <Row className="form-inner-card-right">
                <Col xs={8} md={10}>
                  <Required
                    className="mt-3 mb-2"
                    title={en.enterYourIFSCcode}
                  />
                  <FormControl
                    fullWidth
                    className="formcontrol1"
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        handleEnter();
                      }
                    }}
                  >
                    <TextField
                      variant="outlined"
                      placeholder="Enter Your Bank's IFSC Code"
                      name="ifscCode"
                      value={formik.values.ifscCode}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                  {formik.errors.ifscCode && formik.touched.ifscCode ? (
                    <p style={{ color: 'red' }}>{formik.errors.ifscCode}</p>
                  ) : (
                    ''
                  )}
                </Col>
                <Col xs={4} md={2}>
                  <div className="checkDiv mt-3">
                    {checkBank ? (
                      <>
                        <img
                          alt="..."
                          src={checkgreen}
                          style={{ marginTop: '30px' }}
                        />
                      </>
                    ) : (
                      <Button
                        variant="outline-primary"
                        disabled={loadingVerifyBank}
                        onClick={verifyBank}
                        style={{ marginTop: '20px' }}
                      >
                        {loadingVerifyBank ? (
                          <p>{en.fetching}</p>
                        ) : (
                          <p>{en.fetchDetails}</p>
                        )}
                      </Button>
                    )}
                    {loadingVerifyBank && (
                      <CircularProgress
                        size={24}
                        style={{ marginTop: '30px' }}
                        className="buttonProgress"
                      />
                    )}
                  </div>
                </Col>

                <Col xs={12}>
                  <Required
                    className="mt-4 mb-2"
                    title={en.enterYourBankBranch}
                  />
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      placeholder="Enter Your Bank Branch"
                      name="bankBranch"
                      value={allValues.bankBranch}
                    />
                  </FormControl>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6} className="bank-col-3">
              <div
                className="form-inner-card-right row"
                style={{ marginLeft: '4px', marginRight: '2px' }}
              >
                <Required
                  className="mt-0 mb-2"
                  title={en.enterYourBankAddress}
                />
                <FormControl
                  fullWidth
                  className="formcontrol1"
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      handleEnter();
                    }
                  }}
                >
                  <TextareaAutosize
                    variant="outlined"
                    minRows={3}
                    placeholder="Enter Your Bank Address"
                    name="bankAddress"
                    value={allValues.bankAddress}
                  />
                </FormControl>
              </div>
            </Col>
            <Col xs={12} md={6} className="bank-col-4">
              <div
                className=" mt-4"
                style={{ marginLeft: '22px', marginRight: '40px' }}
              >
                <Required
                  className="mt-4 mb-2"
                  title={en.uploadYourPassbookDocument}
                />

                <div className="browsebutton-outerdiv">
                  <div className="browsebutton2-div filesNames">
                    {loadingfiles &&
                    fetchedData?.[0] !== undefined &&
                    fetchedData?.[0] !== null &&
                    fetchedData?.[0].bank_upload_files_xml !== undefined &&
                    fetchedData?.[0].bank_upload_files_xml !== null &&
                    fetchedData?.[0].is_nominee === false &&
                    filesxmlPresent
                      ? passbookDoc?.map(
                          (i, index) => (
                            <FormControl key={index}>
                              <TextField
                                variant="outlined"
                                name="passbookDocumentName"
                                value={i.file_name}
                                onChange={handleChange}
                                disabled
                              />
                            </FormControl>
                          ),
                        )
                      : null}

                    {loadingfiles &&
                    fetchedData?.[1] !== undefined &&
                    fetchedData?.[1] !== null &&
                    fetchedData?.[1].bank_upload_files_xml !== undefined &&
                    fetchedData?.[1].bank_upload_files_xml !== null &&
                    fetchedData?.[1].is_nominee === false &&
                    filesxmlPresent
                      ? passbookDoc?.map(
                          (i, index) => (
                            <FormControl key={index}>
                              <TextField
                                variant="outlined"
                                name="passbookDocumentName"
                                onChange={handleChange}
                                value={i.file_name}
                                disabled
                              />
                            </FormControl>
                          ),
                        )
                      : null}

                    {loadingfiles ? (
                     <></>
                    ) : (
                      selectedfiles !== null &&
                      selectedfiles.length > 0 &&
                      Array.from(selectedfiles).map((i, index) => (
                        <FormControl>
                          <TextField
                            variant="outlined"
                            name="passbookDocumentName"
                            value={i.name}
                            onChange={handleChange}
                            disabled
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  <img
                                    alt="..."
                                    src={close}
                                    className="removefilebtn"
                                    onClick={() => removefile(index)}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </FormControl>
                      ))
                    )}
                  </div>
                  <div className="browsebutton2-div">
                    <label
                      htmlFor="upload-photo"
                      className="browse-button btn2"
                    >
                      <img alt="..." src={folder} /> <p>{en.browse}</p>
                    </label>
                    <input
                      type="file"
                      name="photo"
                      id="upload-photo"
                      key={passbookDoc?.[0]?.file_name?passbookDoc?.[0]?.file_name:selectedfiles?.[0]?.name}
                      onChange={handleFileChange}
                      multiple
                    />
                  </div>
                </div>

                <p className="mt-3 instructions2">
                  <span>{en.instructions}*</span>
                  <br />
                  {en.formatsupportingdocumentshouldbeinJPEGPNGorPDF}
                  <br />
                  {en.sizecontains500KBto2MB}
                </p>
              </div>
            </Col>
            <Col xs={12} className="note2 mt-4 ml-3 bank-col-5">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allValues.nomineeCheck}
                    onChange={handleChangeCheckbox}
                    name="nomineeCheck"
                  />
                }
                label={en.clickheretoaddtheNomineeBankDetails}
              />
            </Col>
          </Row>
          {allValues.nomineeCheck ? (
            <>
              <Row className="bank-title-row">
                <Col xs={12} className="profile-title">
                  <h1>{en.nomineesBankPassbookStatement}</h1>
                </Col>
              </Row>
              <Row className="form-row">
                <Col xs={12} md={6} className="bank-col-1">
                  <Row className="form-inner-card-right">
                    <Col xs={12}>
                      <Required
                        className="mt-3 mb-2"
                        title={en.accountNumber}
                      />
                      <FormControl fullWidth>
                        <TextField
                          variant="outlined"
                          placeholder="Enter Your Account Number"
                          name="accountNumber_nominee"
                          value={formik.values.accountNumber_nominee}
                          onChange={formik.handleChange}
                          error={allValues.accountNumberNomineeError}
                          helperText={
                            allValues.accountNumberNomineeError
                              ? 'Please enter in correct format'
                              : ''
                          }
                        />
                      </FormControl>
                      {formik.errors.accountNumber_nominee &&
                      formik.touched.accountNumber_nominee ? (
                        <p style={{ color: 'red' }}>
                          {formik.errors.accountNumber_nominee}
                        </p>
                      ) : (
                        ''
                      )}
                    </Col>
                    <Col xs={12}>
                      <Required
                        className="mt-4 mb-2"
                        title={en.enterYourBankName}
                      />
                      <FormControl
                        fullWidth
                        className="formcontrol1"
                        onKeyPress={(event) => {
                          if (event.key === 'Enter') {
                            handleEnter();
                          }
                        }}
                      >
                        <TextField
                          variant="outlined"
                          placeholder="Enter your Bank Name"
                          name="bankName_nominee"
                          value={allValues.bankName_nominee}
                          error={allValues.bankNameNomineeError}
                          helperText={
                            allValues.bankNameNomineeError
                              ? 'Please enter in correct format'
                              : ''
                          }
                        />
                      </FormControl>
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} md={6} className="bank-col-2">
                  <Row className="form-inner-card-right">
                    <Col xs={8} md={10}>
                      <Required
                        className="mt-3 mb-2"
                        title={en.enterYourIFSCcode}
                      />
                      <FormControl
                        fullWidth
                        className="formcontrol1"
                        onKeyPress={(event) => {
                          if (event.key === 'Enter') {
                            handleEnter();
                          }
                        }}
                      >
                        <TextField
                          variant="outlined"
                          placeholder="Enter Your Bank's IFSC Code"
                          name="ifscCode_nominee"
                          value={formik.values.ifscCode_nominee}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                      {formik.errors.ifscCode_nominee &&
                      formik.touched.ifscCode_nominee ? (
                        <p style={{ color: 'red' }}>
                          {formik.errors.ifscCode_nominee}
                        </p>
                      ) : (
                        ''
                      )}
                    </Col>
                    <Col xs={4} md={2}>
                      <div className="checkDiv mt-3">
                        {checkBank_nominee ? (
                          <>
                            <img
                              alt="..."
                              src={checkgreen}
                              style={{ marginTop: '30px' }}
                            />
                          </>
                        ) : (
                          <Button
                            variant="outline-primary"
                            disabled={loadingVerifyBank_nominee}
                            onClick={verifyBankNominee}
                            style={{ marginTop: '20px' }}
                          >
                            {loadingVerifyBank_nominee ? (
                              <>Fetching...</>
                            ) : (
                              <>Fetch Details</>
                            )}
                          </Button>
                        )}
                        {loadingVerifyBank_nominee && (
                          <CircularProgress
                            size={24}
                            style={{ marginTop: '30px' }}
                            className="buttonProgress"
                          />
                        )}
                      </div>
                    </Col>

                    <Col xs={12}>
                      <Required
                        className="mt-4 mb-2"
                        title={en.enterYourBankBranch}
                      />
                      <FormControl fullWidth>
                        <TextField
                          variant="outlined"
                          placeholder="Enter Your Bank Branch"
                          name="bankBranch_nominee"
                          value={allValues.bankBranch_nominee}
                        />
                      </FormControl>
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} md={6} className="bank-col-3">
                  <div
                    className="form-inner-card-right row"
                    style={{ marginLeft: '5px' }}
                  >
                    <Required
                      className="mt-0 mb-2"
                      title={en.enterYourBankAddress}
                    />
                    <FormControl
                      fullWidth
                      className="formcontrol1"
                      onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                          handleEnter();
                        }
                      }}
                    >
                      <TextareaAutosize
                        variant="outlined"
                        minRows={3}
                        placeholder="Enter Your Bank Address"
                        name="bankAddress_nominee"
                        value={allValues.bankAddress_nominee}
                      />
                    </FormControl>
                  </div>
                </Col>
                <Col xs={12} md={6} className="bank-col-4">
                  <div className="form-inner-card-right mt-4">
                    <Required
                      className="mt-4 mb-2"
                      title={en.uploadYourPassbookDocument}
                    />

                    <div className="browsebutton-outerdiv">
                      <div className="browsebutton2-div filesNames">
                        {loadingfiles_n &&
                        fetchedData?.[0] !== undefined &&
                        fetchedData?.[0] !== null &&
                        fetchedData?.[0].bank_upload_files_xml !== undefined &&
                        fetchedData?.[0].bank_upload_files_xml !== null &&
                        fetchedData?.[0].is_nominee === true &&
                        filesxmlPresentNominee
                          ? passbookDocNominee?.map((i, index) => (
                              <FormControl key={index}>
                                <TextField
                                  variant="outlined"
                                  name="passbookDocumentName"
                                  value={i.file_name}
                                  disabled
                                />
                              </FormControl>
                            ))
                          : null}

                        {loadingfiles_n &&
                        fetchedData?.[1] !== undefined &&
                        fetchedData?.[1] !== null &&
                        fetchedData?.[1].bank_upload_files_xml !== undefined &&
                        fetchedData?.[1].bank_upload_files_xml !== null &&
                        fetchedData?.[1].is_nominee === true &&
                        filesxmlPresentNominee
                          ?passbookDocNominee?.map((i, index) => (
                              <FormControl>
                                <TextField
                                  variant="outlined"
                                  name="passbookDocumentName"
                                  value={i.file_name}
                                  disabled
                                />
                              </FormControl>
                            ))
                          : null}

                        {loadingfiles_n ? (
                          <></>
                        ) : (
                          selectedfilesNominee !== null &&
                          selectedfilesNominee.length > 0 &&
                          Array.from(selectedfilesNominee).map((i, index) => (
                            <FormControl>
                              <TextField
                                variant="outlined"
                                name="passbookDocumentName"
                                value={i.name}
                                onChange={handleChange}
                                disabled
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="start">
                                      <img
                                        alt="..."
                                        src={close}
                                        className="removefilebtn"
                                        onClick={() => removefileNominee(index)}
                                      />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </FormControl>
                          ))
                        )}
                      </div>
                      <div className="browsebutton2-div">
                        <label
                          htmlFor="upload-photo2"
                          className="browse-button btn2"
                        >
                          <img alt="..." src={folder} /> {en.browse}
                        </label>
                        <input
                          type="file"
                          name="photo"
                          id="upload-photo2"
                          key={passbookDocNominee?.[0]?.file_name?passbookDocNominee?.[0]?.file_name:selectedfilesNominee?.[0]?.name}
                          onChange={handleFileChange_nominee}
                          multiple
                        />
                      </div>
                    </div>

                    <p className="mt-3 instructions2">
                      <span>{en.instructions}*</span>
                      <br />
                      {en.formatsupportingdocumentshouldbeinJPEGPNGorPDF}
                      <br />
                      {en.sizecontains500KBto2MB}
                    </p>
                  </div>
                </Col>
              </Row>
            </>
          ) : null}

          <Row className="form-row">
            <Col xs={12} className="note2 text-center mt-4 bank-col-6">
              <p>
                <span>{en.note}</span>
                {en.noteAftercompletion}
              </p>
            </Col>
          </Row>

          <Row className="button-inside-form-row mb-5">
            <Col xs={12} className="next-back-button-row mt-4 ">
              {!fetchedData?.[0] ? (
                <>
                  <Link
                    to="#"
                    // onClick={props.backButtonPressed}
                    style={{ flexGrow: '0.5' }}
                  >
                    <Button variant="danger" className="back-button">
                      {en.back}
                    </Button>
                  </Link>
                  <Button
                    variant="outline-primary"
                    className="next-button"
                    type="submit"
                  >
                    {en.saveandContinue}
                  </Button>
                  {/* </Link> */}
                </>
              ) : (
                <Button
                  variant="outline-primary"
                  className="next-button"
                  type="submit"
                >
                  {en.saveyourDetails}
                </Button>
              )}
            </Col>
          </Row>
        </Row>
      </form>
    </>
  );
};

export default Bank;
