import ReactDOM from 'react-dom/client';
import AppRoutes from './Routes/Routes';
import { Provider } from 'react-redux';
import store from './app/store';
import '@material-ui/core/styles';
import './App.css';
import "./bootstrap.min.css";
// import './CSS/googleapis.css';
import './styles/styles.css';
import './styles/styles copy.css';
import './styles/styles-responsive.css';
import './styles/styles1.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
);
