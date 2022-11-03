import React from 'react';
import { 
   getAuth,
   signInWithEmailAndPassword, 
   createUserWithEmailAndPassword,
   signOut 
 } from "firebase/auth";
 import  {app, db}  from "../firebase"
 import { FirebaseError } from '@firebase/util';

 const RegisterUser = async (email, password) =>  {
   const auth = getAuth(app);
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
    //console.log(userCredentials.user.uid) 
    return (userCredentials.user.uid)
  }

  catch (err) {
    if( err instanceof FirebaseError ) {
    const errorCode = err.code;
     const errorMessage = err.message;
     throw new Error(errorMessage)
    }
  }
 }


 const login = async (email, password) => {
  console.log('logeando')
  const auth = getAuth(app);
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    
    console.log('Logeado');
    return (userCredentials.user.uid)
  }

  catch (error)  {
    if( error instanceof FirebaseError ) {
      const errorCode = error.code;
       const errorMessage = error.message;
       console.log('No logeado Error')
       throw new Error(errorMessage)
    }
  }
}

const logout=()=> {
  const auth = getAuth(app);
  signOut(auth).then(() => {
              // Sign-out successful.
              }).catch((error) => {
              // An error happened.
              });
}



 export {RegisterUser, login, logout};