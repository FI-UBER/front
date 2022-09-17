import React, {useCallback, useContext, useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';

import {AuthContext} from './src/AuthContext';
import Navigation from "./src/Navigation";
import Spinner from './src/Spinner';

//import L from "./Screen/Logeado"

export default function App() {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');
  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);

      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        refreshToken: jwt.refreshToken || null,
        authenticated: jwt.accessToken !== null,
      });
      setStatus('success');
    } catch (e) {
      setStatus('failure');
      console.log('Keychain Error: ${e.message}');
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status === 'loading') {
    return <Spinner />;
  }

  if (authContext?.authState?.authenticated === false) {
    return <Login />;
  } else {
    return <Login />;
  }
};
