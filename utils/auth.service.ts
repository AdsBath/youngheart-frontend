import { authKey } from "@/constants/storageKey";
// import { getFormCookie } from "./cookie";
import { decodedToken } from "./jwt";
import { getFormLocalStorage, setToLocalStorage } from "./local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authtoken = getFormLocalStorage(authKey);
  if (authtoken) {
    const decodedData = decodedToken(authtoken);
    return decodedData;
  } else {
    return "";
  }
};

// export const getUserInfoFromCookie = () => {
//   const authtoken = getFormCookie(authKey);
//   if (authtoken) {
//     const decodedData = decodedToken(authtoken);
//     return decodedData;
//   } else {
//     return "";
//   }
// };


// export const isLoggedIn = () => {
//   const authtoken = getFormLocalStorage(authKey);
//   if (authtoken) {
//     return true;
//   } else {
//     return false;
//   }
// };

// export const isLoggedIn = () => {
//   const authtoken = getFormCookie(authKey);
//   if (authtoken) {
//     return true;
//   } else {
//     return false;
//   }
// };

// export const removeUserInfo = (key: string) => {
//   return localStorage.removeItem(key);
// };

// export const removeUserInfo = (key: string) => {
//   return deleteCookie(key);
// };