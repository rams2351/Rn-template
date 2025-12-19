import { Config } from '@/config/env';
import Reactotron from 'reactotron-react-native';

Reactotron.configure({
  name: Config.APP_NAME || 'My App',
}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
