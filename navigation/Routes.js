import React, {useState, useContext, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import AuthStack from './AuthStack';
import DrawerNavigator from './DrawerNavigator';

const Routes = () => {
    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) 
          setInitializing(false);
      };
    
      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
    if (initializing) return null;
    
    return (
      <NavigationContainer>
        {user ? <DrawerNavigator/> : <AuthStack/>}
      </NavigationContainer>
    );
}

export default Routes