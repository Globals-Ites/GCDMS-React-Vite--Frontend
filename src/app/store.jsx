import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import fileReducer from '../features/fileUpload/fileUploadSlice';
import boardReducer from '../features/auth/registerSlice'
import userReducer from '../features/auth/registerSlice';
import userDashboard from '../features/UserReg/getUserRegSlice';
import catalogDetails from '../features/personalDetails/catalogSlice';
import district from '../features/personalDetails/district2Slice';
import personal from '../features/personalDetails/personalSlice';
import globalState from '../features/personalDetails/stateSlice';
import upLoad from '../features/personalDetails/uploadSlice';
import progressbar from '../pages/component/ProgressSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    file: fileReducer,
    board: boardReducer,
    user: userReducer,
    userDetails : userDashboard,
    catalog : catalogDetails,
    district2 : district,
    labour : personal,
    global : globalState,
    upload : upLoad,
    number: progressbar
  },
});

export default store;