import React, {useState, useEffect, useContext} from 'react';
import {View, Image, ActivityIndicator, Text} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import PartFormat from '../components/PartFormat';
import Test from '../screens/Test';
import InPartCard from '../components/InPartCard';
import InTestCard from '../components/InTestCard';
import CompleteCard from '../components/CompleteCard';
import ListenP1QuestionForm from '../components/ListenP1QuestionForm';
import ListenP2QuestionForm from '../components/ListenP2QuestionForm';
import ListenP34QuestionForm from '../components/ListenP34QuestionForm';
import SpeakP1QuestionForm from '../components/SpeakP1QuestionForm';
import SpeakP2QuestionForm from '../components/SpeakP2QuestionForm';
import SpeakP34QuestionForm from '../components/SpeakP34QuestionForm';
import SpeakP5QuestionForm from '../components/SpeakP5QuestionForm';
import SpeakP6QuestionForm from '../components/SpeakP6QuestionForm';
import WriteP1QuestionForm from '../components/WriteP1QuestionForm';
import WriteP23QuestionForm from '../components/WriteP23QuestionForm';
import ReadP1QuestionForm from '../components/ReadP1QuestionForm';
import ReadP23QuestionForm from '../components/ReadP23QuestionForm';
import QuestionScreen from '../screens/QuestionScreen';
import SavedVocabScreen from '../screens/SavedVocabScreen';
import Game from '../components/Game';
import GameScreen from '../screens/GameScreen';
import GetUserGoal from '../screens/GetUserGoal';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import Api from '../api/Api';

const Stack = createNativeStackNavigator();
export default function HomeStack() {
    const {user} = useContext(AuthContext);
    const [initialScreen, setInitialScreen] = useState('');
    const [isLoading, setLoading] = useState(true);
    const isUserGoalDataNull = async () => {
        // const userData = await Api.getAllUsers()
        // .catch(error => console.error(error));
        // userData.forEach((data) => {
        //     if(data.id == user.uid && data.Target){
        //         setInitialScreen('Homeinstack');
        //         setLoading(false); 
        //     } else {
        //         setInitialScreen('GetUserGoal');
        //         setLoading(false);
        //     }          
        // })
        const userData = await Api.getUserData(user.uid)
        .catch(error => console.error(error));
        if (userData && userData.targetScore) {
            setInitialScreen('Homeinstack');
            setLoading(false); 
        } else {
            setInitialScreen('GetUserGoal');
            setLoading(false);
        }      
    };
      
    useEffect(() => {
        isUserGoalDataNull();
    }, []);

    if(isLoading){
        return (
            <View style={{backgroundColor: '#F3FFE7',position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', paddingTop: 150}}>
                <Text style={{fontSize: 28, color: '#0E7C00', fontWeight: '600', marginBottom: 15}}>TOEIC with Coco</Text>
                <Image 
                    source={require('../assets/penguin.png')} style={{height: 250, width: 200, resizeMode: 'cover'}}
                    />
                <ActivityIndicator size="large" color="#0E7C00" style={{marginTop: 20}}/>
            </View> 
        )   
      }
    return (
        <Stack.Navigator initialRouteName={initialScreen}>
            <Stack.Screen name="GetUserGoal" component={GetUserGoal} options={{ header: () => null }} /> 
            <Stack.Screen name='Homeinstack' component={Home} options={{ header: () => null }}/>
            <Stack.Screen name='PartFormat' component={PartFormat} options={{ header: () => null }}/>
            <Stack.Screen name='InPartCard' component={InPartCard} options={{ header: () => null }}/>
            <Stack.Screen name='InTestCard' component={InTestCard} options={{ header: () => null }}/>
            <Stack.Screen name='Testinstack' component={Test} options={{ header: () => null }}/>
            <Stack.Screen name='QuestionScreen' component={QuestionScreen} options={{ header: () => null }}/>
            <Stack.Screen name='ListenP1QuestionForm' component={ListenP1QuestionForm} options={{ header: () => null }}/>
            <Stack.Screen name='ListenP2QuestionForm' component={ListenP2QuestionForm} options={{ header: () => null }}/>
            <Stack.Screen name='ListenP34QuestionForm' component={ListenP34QuestionForm} options={{ header: () => null }}/>
            <Stack.Screen name='SpeakP1QuestionForm' component={SpeakP1QuestionForm} options={{ header: () => null }}/>
            <Stack.Screen name='SpeakP2QuestionForm' component={SpeakP2QuestionForm} options={{ header: () => null }}/>
            <Stack.Screen name='SpeakP34QuestionForm' component={SpeakP34QuestionForm} options={{ header: () => null }}/>
            <Stack.Screen name='SpeakP5QuestionForm' component={SpeakP5QuestionForm} options={{ header: () => null }}/>
            <Stack.Screen name='SpeakP6QuestionForm' component={SpeakP6QuestionForm} options={{ header: () => null }}/>
            <Stack.Screen name='WriteP1QuestionForm' component={WriteP1QuestionForm} options={{ header: () => null }}/>
            <Stack.Screen name='WriteP23QuestionForm' component={WriteP23QuestionForm} options={{ header: () => null }}/>
            <Stack.Screen name='CompleteCard' component={CompleteCard} options={{ header: () => null }}/>
            <Stack.Screen name='ReadP1QuestionForm' component={ReadP1QuestionForm} options={{ header: () => null }}/>
            <Stack.Screen name='ReadP23QuestionForm' component={ReadP23QuestionForm} options={{ header: () => null }}/>
            <Stack.Screen name='SavedVocabScreen' component={SavedVocabScreen} options={{ header: () => null }}/>
            <Stack.Screen name='Game' component={Game} options={{ header: () => null }}/>
            <Stack.Screen name='GameScreen' component={GameScreen} options={{ header: () => null }}/>
        </Stack.Navigator>
    );
  };