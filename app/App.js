import React, { useRef, useState, useContext}  from 'react';
import { createContext } from "react";
import {UserProvider, WithSession,WithoutSession} from './context'
import {Notifications} from "expo";
import * as Permission from "expo-permissions";
import Map_Google from './Screen/Map_Google';
import Stack from './Navigation/Stack';


export default function App() {
  return (
    <UserProvider>
        <WithSession>
          <Stack />
        </WithSession>
        <WithoutSession>
          <Stack />
        </WithoutSession>
    </UserProvider>
  )
    
  
}
