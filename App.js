import { StackNavigator } from 'react-navigation';
import CONSTANTS from './src/helpers/constants';

import Login from './src/Login';
import Register from './src/Register';
import MainScreen from './src/MainScreen';

import Message from './src/Message';
import TukarPoin from './src/TukarPoin';

import Berita from './src/Berita';
import Promosi from './src/Promosi';

import Merchant from './src/Merchant';
import Kantor from './src/Kantor';

const App = StackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: { header:null },
        },
        Register: {
            screen: Register,
            navigationOptions: { header:null },
        },
        Main: { screen: MainScreen },

        Message: { screen: Message },
        TukarPoin: { screen: TukarPoin },

        Berita: { screen: Berita },
        Promosi: { screen: Promosi },

        Merchant: { screen: Merchant },
        Kantor: { screen: Kantor },
  },
  //default header config
  {
    initialRouteName: 'Login', //for testing directly to screen
    navigationOptions:{
        headerStyle: { backgroundColor: CONSTANTS.primaryColor },
        headerTintColor: '#fff',
    },
  }
);
  
export default App;
  