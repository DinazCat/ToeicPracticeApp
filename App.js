import { View, Text, StatusBar} from 'react-native'
import React, {useState, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SettingScreen from './screens/SettingScreen';
import Route from './screens/Route';
import Test from './screens/Test';
import Vocab from './screens/Vocab';
import DrawerNavigator from './navigation/DrawerNavigator';
const Drawer = createDrawerNavigator();
export default function App() {

  return (
    
    <NavigationContainer>
      <DrawerNavigator/>
    </NavigationContainer>
  );
  
}