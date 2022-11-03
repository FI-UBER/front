import {Alert} from 'react-native';

var firebaseErrors = {
  "Firebase: Error (auth/user-not-found)": "Invalid email or password",
  "Firebase: Error (auth/email-already-in-use).": "The email is already in use",
  "Firebase: Error (auth/wrong-password).": "Invalid password",
  "Firebase: Error (auth/user-disabled).": "The user account has been disabled",
  "Firebase: Error (auth/invalid-email).": "The email is invalid",
  "Firebase: Error (auth/popup-closed-by-user).": "",
  "Firebase: Error (auth/requires-recent-login).":
  "Session expired. Please log in again\nto change your email or password",
  "Firebase: Password should be at least 6 characters (auth/weak-password).":"Password should be at least 6 characters",
  "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
  "Access to this account has been temporarily disabled due to many failed login attempts. Try later"
};

function errorMsg(errorCode) {
  //console.log(errorCode)
  return (
    firebaseErrors[errorCode] ??
    `Internal error, try again later\nError: ${errorCode}`
  );
}

export function FirebaseError( error ) {
  let text = error ? errorMsg(error) : "";
   Alert.alert("Firebase Error:",text)
}
