import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import construction from '../../assets/images/construction.svg';
import welfare from '../../assets/images/welfare.svg';
import unorganised from '../../assets/images/unorganised.svg';
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
//import language from '../../assets/images/translate (1).svg';
import { useState } from 'react';
//import Header2 from '../homepages/Header';
import { setLocaleWithFallback } from '../../features/locale/localeSlice';
import { lazy } from 'react';
//mport language from 'assets/images/translate (1).svg'
import langss from '../../assets/images/translate (1).svg';
const Header2 = lazy(() => import('./Header2'));
import text from '../../translations';


const BoardsHome = () => {
  const { en } = text;
  const [isHover1, setIsHover1] = useState(false);
  const [isHover2, setIsHover2] = useState(false);
  const [isHover3, setIsHover3] = useState(false);
  const [allValues, setAllValues] = useState({
    language: '',
    users: null,
  });
  const dispatch = useDispatch();
  const language = allValues.users?.profile_details?.language || '';
  const handlemouseOver1 = () => {
    setIsHover1(true);
  };
  const handlemouseOut1 = () => {
    setIsHover1(false);
  };
  const handlemouseOver2 = () => {
    setIsHover2(true);
  };
  const handlemouseOut2 = () => {
    setIsHover2(false);
  };
  const handlemouseOver3 = () => {
    setIsHover3(true);
  };
  const handlemouseOut3 = () => {
    setIsHover3(false);
  };

  const handleChange1 = (e) => {
    console.log('kkkkk', e.target.value);
    if (e.target.value === 'ka') {
      setAllValues({
        ...allValues,
        descriptionsKannada: true,
        langage: e.target.value,
      });
    } else {
      setAllValues({
        ...allValues,
        descriptionsKannada: false,
        language: e.target.value,
      });
    }
    if (e.target.name === 'language')
      dispatch(setLocaleWithFallback(e.target.value));
  };

  return (
    <div className="container-fluid my-0 p-0">
      <Header2 lang={language} />
      <div className="d-flex justify-content-end container-fluid m-0 p-0">
        <Col
          xs={12}
          md={3}
          lg={3}
          className="d-flex justify-content-end mt-2 me-2 container-fluid m-0 p-0"
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
                <img alt="..." src={langss} className="language-img" />
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
      <div className="container-fluid my-5 p-0">
        <Row className="homepage-row main-screens-boardsHome container-fluid m-0 p-0">

          <Col
            xs={6}
            sm={6}
            md={6}
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
          >
            <Link to="/schemesHomePage">
              <div
                className={
                  isHover1
                    ? 'homepage-image-div boards-hover'
                    : 'homepage-image-div boards'
                }
                onMouseOver={handlemouseOver1}
                onMouseOut={handlemouseOut1}
                style={{ height: '260px' }}
              >
                {isHover1 ? (
                  <div className="outer-img-boards-hover mt-3">
                    <img
                      className="position-absolute top-50 start-50 translate-middle"
                      alt="..."
                      src={construction}
                      onMouseOver={handlemouseOver1}
                    />
                  </div>
                ) : (
                  <div className="outer-img-boards mt-3">
                    <img
                      className="position-absolute top-50 start-50 translate-middle"
                      alt="..."
                      src={construction}
                      onMouseOut={handlemouseOut1}
                    />
                  </div>
                )}
                <p
                  className={isHover1 ? 'text-hover' : 'text-nohover'}
                  onMouseOver={handlemouseOver1}
                  onMouseOut={handlemouseOut1}
                >
                  <span
                    style={{ fontSize: '17px' }}
                  > {en.kbocwwbTitle1}</span>
                  <br />
                  <span
                    style={{ fontSize: '17px' }}
                  >{en.kbocwwbTitle2}</span>
                  <br />
                  <span
                    style={{ fontSize: '17px' }}
                  >{en.kbocwwbTitle3}</span>
                </p>
              </div>
            </Link>
          </Col>

          <Col
            xs={6}
            sm={6}
            md={6}
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
          >
            <Link to="/labourschemesHomePage">
              <div
                className={
                  isHover2
                    ? 'homepage-image-div boards-hover'
                    : 'homepage-image-div boards'
                }
                onMouseOver={handlemouseOver2}
                onMouseOut={handlemouseOut2}
                style={{ height: '260px' }}
              >
                {isHover2 ? (
                  <div className="outer-img-boards-hover mt-3">
                    <img
                      className="position-absolute top-50 start-50 translate-middle"
                      alt="..."
                      src={welfare}
                      onMouseOver={handlemouseOver2}
                    />
                  </div>
                ) : (
                  <div className="outer-img-boards mt-3">
                    <img
                      className="position-absolute top-50 start-50 translate-middle"
                      alt="..."
                      src={welfare}
                      onMouseOut={handlemouseOut2}
                    />
                  </div>
                )}
                <p
                  className={isHover2 ? 'text-hover' : 'text-nohover'}
                  onMouseOver={handlemouseOver2}
                  onMouseOut={handlemouseOut2}
                >
                  <span style={{ fontSize: '17px' }}>{en.klwbTitle1}</span>
                  <br />
                  <span style={{ fontSize: '17px' }}>{en.klwbTitle2}</span>
                </p>
              </div>
            </Link>
          </Col>

          <Col
            xs={12}
            className="mt-5 mb-5"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
          >
            <Link to="/socialsecurityschemesHomePage">
              <div
                className={
                  isHover3
                    ? 'homepage-image-div boards-hover'
                    : 'homepage-image-div boards'
                }
                onMouseOver={handlemouseOver3}
                onMouseOut={handlemouseOut3}
                style={{ height: '260px' }}
              >
                {isHover3 ? (
                  <div className="outer-img-boards-hover mt-3">
                    <img
                      className="position-absolute top-50 start-50 translate-middle"
                      alt="..."
                      src={unorganised}
                      onMouseOver={handlemouseOver3}
                    />
                  </div>
                ) : (
                  <div className="outer-img-boards mt-3">
                    <img
                      className="position-absolute top-50 start-50 translate-middle"
                      alt="..."
                      src={unorganised}
                      onMouseOut={handlemouseOut3}
                    />
                  </div>
                )}
                <p
                  className={isHover3 ? 'text-hover' : 'text-nohover'}
                  onMouseOver={handlemouseOver3}
                  onMouseOut={handlemouseOut3}
                >
                  <span
                    style={{ fontSize: '17px' }}                    
                  >{en.ksuwssbTitle1}</span>
                  <br />
                  <span
                    style={{ fontSize: '17px' }}
                  >{en.ksuwssbTitle2}</span>
                  <br />
                  <span
                    style={{ fontSize: '17px' }}
                  >{en.ksuwssbTitle3}</span>
                </p>
              </div>
            </Link>
          </Col>

        </Row>
      </div>
    </div>
  );
};
export default BoardsHome;