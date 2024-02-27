import { toast } from 'react-toastify';

export const showToast = (type, msg) => {
  toast.configure();
  var randNum = Math.floor(100000 + Math.random() * 900000);
  console.log('randNum: ' + randNum);

  switch (type) {
    case 'SUCCESS':
      toast.success(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: randNum,
      });
      break;
    case 'ERROR':
      toast.error(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: randNum,
      });
      break;
    case 'WARN':
      toast.warn(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: randNum,
      });
      break;
    default:
      return false;
  }
};
