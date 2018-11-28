import React from 'react'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CONSTANTS from './helpers/constants';
import Home from './Home';
import Promo from './Promo';
import Payment from './Payment';
import Profile from './Profile';
import More from './More';

import Message from './Message';

//Tab Navigation for the main screen after login
const MainScreen = TabNavigator(
  {
    Home: {
      screen: Home, 
      navigationOptions: {
        tabBarIcon: <Icon size={24} color="#555" name="home" />,
      }
    },
    Promo: {
      screen: Promo,
      navigationOptions: {
        tabBarLabel: 'News',
        tabBarIcon: <Icon size={24} color="#555" name="volume-medium" />,
      }
    },
    Payment: {
      screen: Payment, 
      navigationOptions: {
        tabBarIcon: <Icon size={24} color="#555" name="gesture-tap" />,
      }
    },
    Profile: {
      screen: Profile, 
      navigationOptions: {
        tabBarLabel: 'My Profile',        
        tabBarIcon: <Icon size={24} color="#555" name="account-outline" />,
      }
    },
    More: {
      screen: More, 
      navigationOptions: {
        tabBarIcon: <Icon size={24} color="#555" name="dots-horizontal" />,
      }
    },

  },
  {
    tabBarComponent: NavigationComponent,
    tabBarPosition: 'bottom',
    swipeEnabled:false,
    tabBarOptions: {
      style:{
        borderTopColor:'#ddd',
        borderTopWidth:1,
        elevation:10,
      },
      bottomNavigationOptions: {
        labelColor: '#555',
        activeLabelColor: CONSTANTS.primaryColor,
        rippleColor: '#555',
        shifting:false, 
        tabs: {
          //to styling every single tab
          Home: {
            activeIcon: <Icon size={24} color={CONSTANTS.primaryColor} name="home" />,
          },
          Promo: {
            activeIcon: <Icon size={24} color={CONSTANTS.primaryColor} name="volume-medium" />            
          },
          Payment: {
            activeIcon: <Icon size={24} color={CONSTANTS.primaryColor} name="gesture-tap" />,
          },
          Profile: {
            activeIcon: <Icon size={24} color={CONSTANTS.primaryColor} name="account-outline" />,
          },
          More: {
            activeIcon: <Icon size={24} color={CONSTANTS.primaryColor} name="dots-horizontal" />,
          },
        }
      }
    }
  });

  export default MainScreen;