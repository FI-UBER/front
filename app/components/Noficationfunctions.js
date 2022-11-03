import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

const GoTo= (where)=>{
   const Nav = useNavigation();
   console.log(where);
   Nav.navigate("Profile")   
}


async function schedulePushNotification(title, body, redir) {
   await Notifications.scheduleNotificationAsync({
     content: {
       title: title,
       body: body,
       data: { data: redir },
     },
     trigger: { seconds: 2 },
   });
 }

 export {schedulePushNotification, GoTo}