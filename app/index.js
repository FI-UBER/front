import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import {name as appName} from './app.json';
import {AuthProvider} from './src/AuthContext';
import {AxiosProvider} from './src/AxiosContext';
import App from './App';

const Root = () => {
    return (
        <AuthProvider>
            <AxiosProvider>
                <App />
            </AxiosProvider>
        </AuthProvider>
    );
};

AppRegistry.registerComponent(appName, () => Root);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
