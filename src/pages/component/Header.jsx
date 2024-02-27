import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../assets/images/Karnataka_logo_100_Pixels.png';
import lm from '../../assets/images/lm.png';
import cm from '../../assets/images/cm.png';

const Header2 = (props) => {
  return (
    <div className="mainscreen-top-div">
      <div className="d-flex justify-content-around">
        <div className="d-flex justify-content-center align-items-center flex-column mt-2 p-0">
          <Avatar alt="Remy Sharp" src={cm} sx={{ width: 70, height: 70 }} />
          <p
            className="text-center"
            style={{ color: '#CA0027', fontWeight: '600' }}
          >
            {props.lang === 'en'
              ? 'Shri Siddaramaiah'
              : props.lang === 'ka'
                ? 'ಶ್ರೀ ಸಿದ್ದರಾಮಯ್ಯ'
                : 'Shri Siddaramaiah'}
            <br />
            <span style={{ color: '#303030', fontWeight: '700' }}>
              {props.lang === 'en'
                ? "Hon'ble Chief Minister,"
                : props.lang === 'ka'
                  ? 'ಮಾನ್ಯ ಮುಖ್ಯಮಂತ್ರಿ,'
                  : "Hon'ble Chief Minister,"}
              <br />
              {props.lang === 'en'
                ? 'Government of Karnataka'
                : props.lang === 'ka'
                  ? 'ಕರ್ನಾಟಕ ಸರ್ಕಾರ'
                  : 'Government of Karnataka'}
            </span>
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column mt-0 ms-3 p-0">
          <Link to={'/'}>
            {' '}
            <Avatar
              alt="Remy Sharp"
              src={logo}
              sx={{ width: 80, height: 80 }}
            />
          </Link>
          <p className="text-center logo-text2">
            ಕಾರ್ಮಿಕ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ <br /> Labour Department, Government
            of Karnataka
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column mt-2 p-0">
          <Avatar alt="Remy Sharp" src={lm} sx={{ width: 70, height: 70 }} />
          <p
            className="text-center"
            style={{ color: '#CA0027', fontWeight: '600' }}
          >
            {props.lang === 'en'
              ? 'Shri Santhosh S Lad'
              : props.lang === 'ka'
                ? 'ಶ್ರೀ ಸಂತೋಷ್ ಎಸ್ ಲಾಡ್'
                : 'Shri Santhosh S Lad'}
            <br />
            <span style={{ color: '#303030', fontWeight: '700' }}>
              {props.lang === 'en'
                ? "Hon'ble Minister for Labour Department,"
                : props.lang === 'ka'
                  ? 'ಮಾನ್ಯ ಕಾರ್ಮಿಕ ಸಚಿವರು,'
                  : "Hon'ble Minister for Labour Department,"}
              <br />{' '}
              {props.lang === 'en'
                ? 'Government of Karnataka'
                : props.lang === 'ka'
                  ? 'ಕರ್ನಾಟಕ ಸರ್ಕಾರ'
                  : 'Government of Karnataka'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

Header2.propTypes = {
  lang: PropTypes.string.isRequired,
};

export default Header2;