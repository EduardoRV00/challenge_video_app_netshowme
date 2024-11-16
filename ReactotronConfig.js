// ReactotronConfig.js

import Reactotron from 'reactotron-react-native';

Reactotron
    .configure({ name: 'MeuApp' })
    .useReactNative()
    .connect();

console.tron = Reactotron;

export default Reactotron;
