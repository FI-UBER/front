# front

## app

### Instalar

*NPM*

- apt install npm

*YARN*

- npm install --global yarn

*EXPO*

- npm install --global expo-cli

### Instalar Dependencias

*REACT NATIVE* 

- npx expo install react-native-screens react-native-safe-area-context

*ICONOS*

- npm i @expo/vector-icons

*BUTTON TAB DE CEL*

- npm install @react-navigation/bottom-tabs

*MAPS*

- npx expo install react-native-maps

*LOCALIZACION*

- npx expo install expo-location

*DIRECTIONS*

- npm i react-native-maps-directions

*AUTOCOMPLETE PLACE*

- npm i react-native-google-places-autocomplete

*DOTENV para usar .emv*
- npm i react-native-dotenv, configurar babel config y crear un archivo llamado
.env que tenga la API KEY de Google

*DRAWER,*
- npm i @react-navigation/drawer (y npx expo install react-native-gesture-handler react-native-reanimated ) y configurar index y babel

*REACT SPRING*
- npm install react-spring

Asi debe quedar babel.config

![image info](./app/assets/babel.png)


module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowlist": null,
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }],'react-native-reanimated/plugin',
    ],
  };
};


Poner esto al ppio de index.js

import 'react-native-gesture-handler';

### Ejecucion 

En front/app

- yarn add expo

- expo doctor --fix-dependencies

- expo start

Usar emulador de celular o la apliccion de expo para entrar a la app localmente

- Se requiere tener nodejs instalado
