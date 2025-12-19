import { scale } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';

export function scaler(size: number) {
  return scale(size);
}

export function showErrorMsg(msg: string) {
  Toast.show({
    type: 'error',
    text2: msg,
  });
}

export function showSuccessMsg(msg: string) {
  Toast.show({
    type: 'success',
    text2: msg,
  });
}

export function showInfoMsg(msg: string) {
  Toast.show({
    type: 'info',
    text2: msg,
  });
}
