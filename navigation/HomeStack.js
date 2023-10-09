import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
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
const Stack = createNativeStackNavigator();
export default function HomeStack() {
    return (
            <Stack.Navigator >
                <Stack.Screen name='Homeinstack' component={Home} options={{ header: () => null }}/>
                <Stack.Screen name='PartFormat' component={PartFormat} options={{ header: () => null }}/>
                <Stack.Screen name='InPartCard' component={InPartCard} options={{ header: () => null }}/>
                <Stack.Screen name='InTestCard' component={InTestCard} options={{ header: () => null }}/>
                <Stack.Screen name='Testinstack' component={Test} options={{ header: () => null }}/>
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
                <Stack.Screen name='ReadP12QuestionForm' component={ReadP1QuestionForm} options={{ header: () => null }}/>
                <Stack.Screen name='ReadP3QuestionForm' component={ReadP23QuestionForm} options={{ header: () => null }}/>
            </Stack.Navigator>
    );
  };