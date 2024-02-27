// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// //import cookie from 'react-cookies';
// import moment from 'moment';
import { Tooltip } from '@material-ui/core';
// import { Cookies } from 'react-cookie';
// //import firebase from 'firebase';

// // require("firebase/firestore");

// // require('dotenv').config()

// // var crypto = require("crypto");
// // var CryptoJS = require("crypto-js");

// const secret = process.env.REACT_APP_URL_SECRET

// export const encrypt = (text) => {
//     console.error("in encrypt- secret:" + secret + " text:" + text)
//     // var encrypted = CryptoJS.AES.encrypt(text, secret).salt
//     var encrypted = CryptoJS.RC4.encrypt(JSON.stringify(text), secret)
//     return encrypted
// }

// export const decrypt = (ciphertext) => {
//     console.error("in decrypt- secret:" + secret + " ciphertext:" + ciphertext)
//     // var salt = CryptoJS.enc.Hex.parse(ciphertext)
//     var decrypted = CryptoJS.RC4.decrypt(ciphertext, secret)

//     return decrypted.toString(CryptoJS.enc.Utf8)
// }

// export const encryptAuthbridge = (plainText) => {
//     var requestData = ""
//     try {

//         console.error("iprocess.env.REACT_APP_AUTHBRIDGE_PASS:" + process.env.REACT_APP_AUTHBRIDGE_PASS)
//         var iv = crypto.randomBytes(16);
//         const hash = crypto.createHash('sha512');
//         const dataKey = hash.update(process.env.REACT_APP_AUTHBRIDGE_PASS, 'utf-8');
//         const genHash = dataKey.digest('hex');
//         const key = genHash.substring(0, 16);
//         const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key), iv);
//         requestData = cipher.update(plainText, 'utf-8', 'base64');
//         requestData += cipher.final('base64') + ":" + new Buffer(iv).toString('base64');
//     }
//     catch (error) {
//         console.error("error in encryptAuthbridge: " + error)
//     }
//     return requestData;
// }

// export const decryptAuthbridge = (encText) => {
//     var m = crypto.createHash('sha512');
//     var datakey = m.update(process.env.REACT_APP_AUTHBRIDGE_PASS, 'utf-8');
//     var genHash = datakey.digest('hex');
//     var key = genHash.substring(0, 16);
//     var result = encText.split(":");
//     var iv = Buffer.from(result[1], 'base64');
//     var decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(key), iv);
//     var decoded = decipher.update(result[0], 'base64', 'utf8');
//     decoded += decipher.final('utf8');
//     return decoded;
// }

export const Required = (props) => {
    return (
        <>
            <Tooltip title="Mandatory Field!" placement="top-start" arrow interactive>
                <p className={`required-p ${props.className}`}>{props.title}<span>*</span></p>
            </Tooltip>
        </>
    )
}

// export const deleteAllCookies = () => {
//     var cookies = document.cookie.split(";");

//     console.log("in deleteAllCookies: " + JSON.stringify(cookies))

//     for (var i = 0; i < cookies.length; i++) {
//         var cookie = cookies[i];
//         var eqPos = cookie.indexOf("=");
//         var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//         document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//     }

//     return true
// }

// export const showToast = (type, msg) => {
//     toast.configure();
//     var randNum = Math.floor(100000 + Math.random() * 900000)
//     console.log("randNum: " + randNum);

//     switch (type) {
//         case 'SUCCESS':
//             toast.success(msg, {
//                 position: toast.POSITION.BOTTOM_RIGHT,
//                 toastId: randNum
//             })
//             break;
//         case 'ERROR':
//             toast.error(msg, {
//                 position: toast.POSITION.BOTTOM_RIGHT,
//                 toastId: randNum
//             })
//             break;
//         case 'WARN':
//             toast.warn(msg, {
//                 position: toast.POSITION.BOTTOM_RIGHT,
//                 toastId: randNum
//             })
//             break;
//         default:
//             return false
//     }
// }

// export const saveTokenCookie = (token) => {
//     cookie.save("Temp", token, { path: '/', secure: true, })
//     console.log("Token001", token);
//     // cookie.save('jwt', token)
//     cookie.save('jwt', token, { path: '/', secure: true, })
//     cookie.save(
//         'jwt2',
//         token,
//         {
//             path: '/',
//             secure: true,
//             httpOnly: true
//         }
//     )
// }
// export const saveTokenCookieAdmin = (token) => {
//     cookie.save('jwtAdmin', token, { path: '/', secure: true, })
// }

// export const getTokenCookieAdmin = () => cookie.load('jwtAdmin')

// export const getTokenCookie = () =>
//     cookie.load('jwtAdmin') !== undefined ? cookie.load('jwtAdmin') : cookie.load('jwt') !== undefined ? cookie.load('jwt') : cookie.load('Temp')

// export const getTokenTempCookie = () =>
//     cookie.load('Temp')

// export const removeTokenCookie = () => cookie.remove('jwt', { path: '/' });
// export const removeTokenCookieAdmin = () => cookie.remove('jwtAdmin', { path: '/' });
// export const getAuthHeader = () => {
//     return { headers: { 'Authorization': `Bearer ${getTokenCookie()}` } }
// }

// export const dataURLtoFile = (dataurl, filename) => {
//     var arr = dataurl.split(','),
//         mime = arr[0].match(/:(.*?);/)[1],
//         bstr = atob(arr[1]),
//         n = bstr.length,
//         u8arr = new Uint8Array(n);

//     while (n--) {
//         u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new File([u8arr], filename, { type: mime });
// }

// // firebase.initializeApp({
// //     apiKey: "AIzaSyBNPCaaP34N6sCcyg0OGRLUnjLxPX1mjeo",
// //     authDomain: "gcdms-c2b78.firebaseapp.com",
// //     projectId: "gcdms-c2b78",
// //   });
// // var db = firebase.firestore();

// export const saveLog = async (mob, name, id, log) => {

//     console.log("in saveLog!");

//     let cookieData = Cookie.load('LoginData')

//     db.collection("logs").add({
//         date_time: moment().toDate(),
//         department_user_id: cookieData.department_user_id,
//         labour_mobile: mob,
//         labour_name: name,
//         labour_user_id: id,
//         log: log
//     })
//         .then((docRef) => {
//             console.log("Document written with ID: ", docRef.id);
//         })
//         .catch((error) => {
//             console.error("Error adding document: ", error);
//         });
// }
