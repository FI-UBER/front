import React, { useRef, useState, useContext}  from 'react';
import DrawerNavigation from "./DrawerNavigator"
import { createContext } from "react";
//import Login from './Screen/Login';
import {UserProvider, WithSession,WithoutSession} from './context'
import Login from './Screen/Login';


export default function App() {
  return (
    <UserProvider>
        <WithSession>
          <DrawerNavigation />
        </WithSession>
        <WithoutSession>
          <DrawerNavigation />
        </WithoutSession>
    </UserProvider>
  )
    
  
}
