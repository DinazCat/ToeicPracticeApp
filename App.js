import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import OnboardingScreen from './screens/OnboardingScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen';
import ForgotPassword from './screens/ForgotPassword';
import GetUserGoal from './screens/GetUserGoal';
import Forum from './screens/Forum';
import CommentScreen from './screens/CommentScreen';
import AddPostScreen from './screens/AddPostScreen';
import PostScreen from './screens/PostScreen';
import FilterSide from './screens/FilterSide';
import SettingScreen from './screens/SettingScreen';
import NotificationScreen from './screens/NotificationScreen';
import SearchPostScreen from './screens/SearchPostScreen';
import ChangeProfileScreen from './screens/ChangeProfileScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChangeGoal from './screens/ChangeGoal';
import TestResultScreen from './screens/TestResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;
  // useEffect(() => {
  //   AsyncStorage.getItem('alreadyLaunched').then((value) => {
  //     if (value == null) {
  //       AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
  //       setIsFirstLaunch(true);
  //     } else {
  //       setIsFirstLaunch(false);
  //     }
  //   });
  // }, []);
  // if (isFirstLaunch === null) {
  //   return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  // } else if (isFirstLaunch == true) {
  //   routeName = 'Onboarding';
  // } else {
  //   routeName = 'Login';
  // }
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName={routeName}> */}
      <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={OnboardingScreen}
          options={{ header: () => null }} />
        <Stack.Screen name="Login" component={LoginScreen}
          options={{ header: () => null }} />
        <Stack.Screen name="Signup" component={SignupScreen}
          options={{ header: () => null }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}
          options={({navigation}) => ({
            title: 'Reset',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',
              shadowColor: '#f9fafd',
              elevation: 0,
            },
            headerLeft: () => (
              <View style={{color: '#fff'}}>
                <FontAwesome.Button 
                  name="long-arrow-left"
                  size={25}
                  backgroundColor="#fff"
                  color="#333"
                  onPress={() => navigation.goBack()}
                />
              </View>
            ), 
          })} />  
        <Stack.Screen name="GetUserGoal" component={GetUserGoal}
          options={{ header: () => null }} />  
        <Stack.Screen name="Forum" component={Forum}
          options={{ header: () => null }} />   
        <Stack.Screen name="AddPost" component={AddPostScreen}
          options={{ header: () => null }} />    
        <Stack.Screen name="PostScreen" component={PostScreen}
          options={{ header: () => null }} />    
        <Stack.Screen name="CommentScreen" component={CommentScreen}
          options={{ header: () => null }} />   
        <Stack.Screen name="FilterSide" component={FilterSide}
          options={{ header: () => null }} />   
        <Stack.Screen name="SearchPost" component={SearchPostScreen}
          options={{ header: () => null }} />      
        <Stack.Screen name="NotificationScreen" component={NotificationScreen}
          options={{ header: () => null }} />   
        <Stack.Screen name="SettingScreen" component={SettingScreen}
          options={{ header: () => null }} />   
        <Stack.Screen name="ChangeProfile" component={ChangeProfileScreen}
          options={{ header: () => null }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}
           options={{ header: () => null }}/>
        <Stack.Screen name="ChangeGoal" component={ChangeGoal}
          options={{ header: () => null }} />
        <Stack.Screen name="TestResult" component={TestResultScreen}
          options={{ header: () => null }} />
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}