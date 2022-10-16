import React, { useRef, useState, useContext}  from 'react';
import DrawerNavigation from "./DrawerNavigator"
import { createContext } from "react";
import {UserProvider, WithSession,WithoutSession} from './context'

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
