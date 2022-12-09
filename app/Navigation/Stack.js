import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screen/Login';
import  Register  from "../Screen/Register";
const mStack = createStackNavigator();
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator'
//import Ejemplo from '../Screen/Build_trip'

function Stack() {
  return (
   <NavigationContainer>

    <mStack.Navigator  screenOptions={{headerTitleAlign: 'center'}}>
      <mStack.Screen name="Login" component={Login} />
      <mStack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
      <mStack.Screen 
      name="App" 
      component={DrawerNavigator} 
      options={{
         headerShown:false
      }} />
    </mStack.Navigator>
  </NavigationContainer>

  );
}

export default Stack;
