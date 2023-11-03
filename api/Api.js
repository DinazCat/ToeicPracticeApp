import client from "./client";
import auth from '@react-native-firebase/auth';

const getVocabLesson = async ()=>{
    try{
        const response = await client.get('/VocabLessons')
        if(response.data.success){
            return response.data.vocablesson
        }
        else{
            console.log("not get")
        }
        
    }
    catch(error){
        console.log('error: ', error.message)
        return [];
    }
}
const getVocabinLesson = async(TopicId)=>{
    const endpoint = '/VocabinLesson/'+TopicId
    try{
        const response = await client.get(endpoint)
        if(response.data.success){
            return response.data.vocabs
        }
        else{
            console.log("not get")
        }
        
    }
    catch(error){
        console.log('error: ', error.message)
        return [];
    }
}
const getVocabs = async()=>{
    try{
        const response = await client.get('/Vocabs')
        if(response.data.success){
            return response.data.vocabs
        }
        else{
            console.log("not get")
        }
        
    }
    catch(error){
        console.log('error: ', error.message)
        return [];
    }
}
const setAlarmVocab = async(userId, vocabAlarms)=>{
    const endpoint = "/alarmVocab/"+userId
    try{
        const response = await client.post(endpoint, vocabAlarms)   
        console.log(response.data);
    }
    catch(error){
        console.log('error: ', error.message)
    }
}
const getAlarmVocab = async()=>{
    const endpoint = "/getAlarmVocab/" + auth().currentUser.uid
    try{
        const response = await client.get(endpoint)
        if(response.data.success){
            return response.data.vocabAlarm
        }
        else{
            console.log("not get")
        }
        
    }
    catch(error){
        console.log('error: ', error.message)
        return [];
    }
}
const updateAlarmVocab = async(vocabAlarms)=>{
    const endpoint = "/updateAlarmVocab/" + auth().currentUser.uid
    try{
        const response = await client.put(endpoint, vocabAlarms)
        console.log(response.data)
    }
    catch(error){
        console.log('error: ', error.message)
    }

}
const setUserInfo = async(userData) => {
    const endpoint = '/setUserInfo/' + userData.id;
    console.log(endpoint);
    try {
        const response = await client.put(endpoint, userData);
        console.log(response.data)
      } catch (error) {
        console.log('error: ', error.message);
    }
}
const updateUser = async(userData) => {
    const endpoint = '/updateUser/' + userData.id;
    console.log(endpoint);
    try {
        const response = await client.put(endpoint, userData);
        console.log(response.data)
      } catch (error) {
        console.log('error: ', error.message);
    }
}
const getAllUsers = async() => {
    try{
        const response = await client.get('/Users')
        if(response.data.success){
            return response.data.users           
        }
        else{
            console.log("not get users")
        }        
    }
    catch(error){
        console.log('error: ', error.message)
        return [];
    }
}
const getUserData = async(userId)=>{
    const endpoint = "/UserData/" + userId
    try{
        const response = await client.get(endpoint)
        if(response.data.success){
            return response.data.userData
        }
        else{
            console.log("not get user data")
        }        
    }
    catch(error){
        console.log('error: ', error.message)
        return [];
    }
}
const uploadAudio = async (audioData) => {
    const userId = auth().currentUser.uid;
    try {
        const response = await client.post('/uploadAudio', {userId, audioData})
        if(response.data.success){
            return response.data.downloadUrl;
        }
        else{
            console.log("upload audio failed");
        }
    } catch (error) {
        console.error('Error uploading audio:', error);
        console.log('error: ', error.message);
    }
};
const uploadPracticeHistory = async (data) => {
    try {
        const response = await client.post('/uploadPracticeHistory', data)
        console.log(response.data)
    } catch (error) {
        console.log('error: ', error.message);
    }
};
export default {
    getVocabLesson,
    getVocabinLesson,
    getVocabs,
    getAlarmVocab,
    setAlarmVocab,
    updateAlarmVocab, 
    setUserInfo,
    updateUser,
    getAllUsers,
    getUserData,
    uploadAudio,
    uploadPracticeHistory,
}