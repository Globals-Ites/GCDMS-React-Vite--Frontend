import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/labour/Login';
import Register from '../pages/labour/Register';
import DashboardMigrant from '../profile/dashBoardMigrant';
import Registration from '../pages/labour/registration/Registration';
import Family from '../pages/labour/registration/Family';
import Address from '../pages/labour/registration/Address';
import Personal from '../pages/labour/registration/Personal';
import Bank from '../pages/labour/registration/Bank';
import NintyDays from '../pages/labour/registration/NintyDays';
import BoardsHome from '../pages/HomePage/BoardsHome';
import SchemesHomePage from '../pages/labour/registration/schemesHomePage';
import Review from '../pages/labour/registration/Review';

const AppRoutes = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BoardsHome />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="/boardsHome" element={<BoardsHome />} />
                <Route path='/dashboardMigrant' element={<DashboardMigrant />} />
                <Route path="/schemeshomepage" element= {<SchemesHomePage />} />
                <Route path='/registration' element={<Registration />} />
                <Route path='/family' element={<Family />} />
                <Route path='/address' element={<Address />} />
                <Route path='/personal' element={<Personal />} />
                <Route path='/bank' element={<Bank />} />
                <Route path='/ninetyDays' element={<NintyDays />} />
                <Route path='/review' element={<Review />} />
            </Routes>
        </BrowserRouter>

    );
}

export default AppRoutes;