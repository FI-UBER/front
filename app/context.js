import React, { useRef, useState, useContext}  from 'react';
import * as Notifications from 'expo-notifications';
import registerForPushNotificationsAsync from './components/registerPushNotificationsAsync';

let UserContext = React.createContext('default');

export function currentSession () {
   return useContext(UserContext)
}

export function UserProvider({ children }) {
//**************************** */
//Notification
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  var GoTo;

  const Noti = Notifications;
  Noti.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Notif = () =>{
  registerForPushNotificationsAsync().then((token) =>
  setExpoPushToken(token)
  );

  notificationListener.current =
    Noti.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

  responseListener.current =
    Noti.addNotificationResponseReceivedListener((response) => {
      //console.log(response.notification.request.content.data);
      GoTo =response.notification.request.content.data.data;
      console.log(GoTo)
    });

  return () => {
    Noti.removeNotificationSubscription(
      notificationListener.current
    );
    Noti.removeNotificationSubscription(responseListener.current);
  };
}

//***************************** */

  let [user, setUser] = useState(false);
  const [passenger, setPassenger] = useState('')
  const [uid,setUid] = useState('')
  const [trip_id,setTrip] = useState(null)



  function setTokenUid(uid){
    setUid(uid)
    console.log('{context}:',uid)
  }

  function setTrip_id(tripId) {
    setTrip(tripId);
    console.log('Trip Creado')
  }

  function getTrip_id(uid){
    return trip_id;
  }

  function dropTrip_id() {
    setTrip(null);
    console.log('Trip Quitado o no encontrado')
  }

  function setPassenger_() {
    setPassenger(true);
    console.log('Passenger')
  }

  function setDriver() {
    setPassenger(false);
    console.log('Driver')
  }

  function login(uid) {
    setTokenUid(uid);
    setUser(true);
    console.log('login')
    Notif()
    console.log('notification')
  }

  function logout() {
    disconnect();
    setUser(false);
    console.log('logout')
  }

  function disconnect() {
    setUid('')
    setPassenger('')
    dropTrip_id();
  }

  return <UserContext.Provider value={{
    /********** */
    Notif,
    GoTo,
    /********** */
    trip_id,
    uid,
    passenger, 
    user, 
    login, 
    logout, 
    setPassenger_, 
    setDriver,
    setTrip_id,
    dropTrip_id,
    getTrip_id
  }}>{children}</UserContext.Provider>;
}

export function WithSession ({children}) {
  const {user} = useContext(UserContext);
  if (user) {
    return children
  }
  return null;
}

export function WithoutSession ({children}) {
  const {user} = useContext(UserContext);
  if (!user) {
    return children
  }
  return null;
}
