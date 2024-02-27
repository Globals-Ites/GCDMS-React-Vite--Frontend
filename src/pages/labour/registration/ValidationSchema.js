import * as yup from 'yup';


const validationSchema = yup.object().shape({
    // state: yup.string().trim().required('*State is Required'),
    // district: yup.string().trim().required('*district is Required'),
    // taluk: yup.string().trim().required('*taluk is Required'),
    // CityName: yup.string().trim().required('*City Name is Required'),
    // VillageName: yup.string().trim().required('*Village Name is Required'),
    // StreetName: yup.string().trim().required('*Street Name is Required'),
    // HouseBuildingNumber: yup
    //     .string()
    //     .trim()
    //     .required('*House Number is Required'),
    // Landmark: yup.string().trim().required('*Landmark is Required'),
    // Pincode: yup.string().trim().required('*Pincode is Required'),
    Residence: yup.string().trim().required('*Residence is Required'),
    residence_state: yup.string().trim().required('*State is Required'),
    residence_district: yup.string().trim().required('*district is Required'),
    residence_taluk: yup.string().trim().required('*taluk is Required'),
    residence_CityName: yup.string().trim().required('*City Name is Required'),
    residence_VillageName: yup
        .string()
        .trim()
        .required('*Village Name is Required'),
    residence_StreetName: yup
        .string()
        .trim()
        .required('*Street Name is Required'),
    residence_HouseBuildingNumber: yup
        .string()
        .trim()
        .required('*House Number is Required'),
    residence_Landmark: yup.string().trim().required('*Landmark is Required'),
    residence_Pincode: yup.string().trim().required('*Pincode is Required'),
});
export default validationSchema