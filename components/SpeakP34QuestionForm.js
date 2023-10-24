import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated, Dimensions, PermissionsAndroid, Alert, Platform} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';

const {width} = Dimensions.get('window');
const audioRecorderPlayer = new AudioRecorderPlayer();
const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
];

const SpeakP34QuestionForm = ({item}) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isRecording, setIsRecording] = useState([false, false, false]);
  const [isPlaying, setIsPlaying] = useState([false, false, false]);
  const [recordings, setRecordings] = useState([null, null, null]);
  const getPermissions = async () => {
    //const atLeastAndroid13 = Platform.OS === 'android' && Platform.Version >= 33;
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    const recordAudioGranted =
      granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';

    const externalStorageWriteGranted =
      granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
      'granted';
    const externalStorageReadGranted =
      granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
      'granted';

    if (
      !(
        recordAudioGranted ||
        externalStorageWriteGranted ||
        externalStorageReadGranted
      )
    ) {
      Alert.alert('Permissions not granted');
    } else {
      setPermissionGranted(true);
      console.log('permission granted')
    }
  };
  
  const QuestionForm = ({question, index}) => {
    //const audioRecorderPlayer = new AudioRecorderPlayer();
    const onStartRecord = async () => {
      await getPermissions().then(() => {
        if(!permissionGranted) return;
      })

      // if(isRecording) {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'You have not finished another record.',
      //     text2: 'Please try again later.',
      //   });
      //   return;
      // }

      const dirs = RNFetchBlob.fs.dirs;
      // const path = Platform.select({
      //   android: `${dirs.CacheDir}/record-${userId}-${new Date().getTime()}.mp3`,
      // });
      const path = Platform.select({
          android: `${dirs.CacheDir}/record${index}.mp3`,
        });
      console.log('start recording');
      const result = await audioRecorderPlayer.startRecorder(path);
      audioRecorderPlayer.addRecordBackListener((e) => {
        // setState({
        //   recordSecs: e.currentPosition,
        //   recordTime: this.audioRecorderPlayer.mmssss(
        //     Math.floor(e.currentPosition),
        //   ),
        // });
        //setRecordTime(e.currentPosition);
        console.log(e.currentPosition)
      });
      const newIsRecording = [...isRecording];
      newIsRecording[index] = true;
      setIsRecording(newIsRecording);
      //setIsRecording(true);
      const newRecordings = [...recordings];
      newRecordings[index] = path;
      setRecordings(newRecordings);
      console.log(result);
    };
  
    const onStopRecord = async () => {
      console.log('stop recording');
      try {
        await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
      } catch (err) {
        console.error(err);
        Toast.show({
          type: 'error',
          text1: 'Unxpected Error',
          text2: 'Please try again.',
        });
      }
      //setIsRecording(false);
      const newIsRecording = [...isRecording];
      newIsRecording[index] = false;
      setIsRecording(newIsRecording);
    };
    const onStartPlay = async () => {
      try{
        console.log('onStartPlay');
        if(recordings[index] === null) return;
        const msg = await audioRecorderPlayer.startPlayer(recordings[index]);
        console.log(msg);
        audioRecorderPlayer.addPlayBackListener((e) => {
          // this.setState({
          //   currentPositionSec: e.currentPosition,
          //   currentDurationSec: e.duration,
          //   playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
          //   duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
          // });
          console.log('currentPosition', e.currentPosition)
          console.log('playTime', audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
          console.log('duration', audioRecorderPlayer.mmssss(Math.floor(e.duration)))
          if(e.currentPosition == e.duration){
            const newIsPlaying = [...isPlaying];
            newIsPlaying[index] = false;
            setIsPlaying(newIsPlaying);
          }
        });
        const newIsPlaying = [...isPlaying];
        newIsPlaying[index] = true;
        setIsPlaying(newIsPlaying);
        //setIsPlaying(true);  
      } catch (error) {
        console.error('Error starting player:', error);
      }  
    };
    const onPausePlay = async () => {
      await audioRecorderPlayer.pausePlayer();
      //setIsPlaying(false);
      const newIsPlaying = [...isPlaying];
      newIsPlaying[index] = false;
      setIsPlaying(newIsPlaying);
    };
    return(
        <View style={{backgroundColor:card_color, width:'98%', alignSelf:'center', marginTop:'3%'}}>
          <View style={styles.questionzone}>
            <Text style={styles.questionstyle}>{question}</Text>
            {!isRecording[index] ? (
              <TouchableOpacity style={{ borderRadius:30, borderWidth:3, borderColor:PRIMARY_COLOR, height:30, width:30, alignItems:'center', justifyContent:'center',}}
              onPress={onStartRecord}>
              <Icon name={'microphone-alt'} style={{color: PRIMARY_COLOR, fontSize: 20}} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{ borderRadius:30, borderWidth:3, borderColor:PRIMARY_COLOR, height:30, width:30, alignItems:'center', justifyContent:'center', backgroundColor: '#CFF393'}}
              onPress={onStopRecord}>
              <Icon name={'microphone-alt'} style={{color: PRIMARY_COLOR, fontSize: 20}} />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ height: 50, flexDirection: 'row', marginTop:'1%', alignItems: 'center',}}>
          <Text style={{fontSize:18, fontWeight:'400', color:'black',marginLeft:"5%"}}>Your voice:</Text>
          {!isPlaying[index] ? (
            <TouchableOpacity style={{marginLeft:"5%"}}
            onPress={onStartPlay}>
              <FontAwesome name="play-circle" color="black" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{marginLeft:"5%"}}
          onPress={onPausePlay}>
            <FontAwesome name="pause-circle" color="black" size={20} />
          </TouchableOpacity>
          )}
          <Slider
            style={{width: 140, height: 40, marginLeft:"3%"}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#990000"
          />
          <Text style={styles.TimeFont}>00:00</Text>
        </View>
    </View>
  )}
  return (
    <Animated.View style={styles.container}>
      <ScrollView>     
      <Text style={{color:'black', fontWeight:'500',fontSize:20,textAlign:'left',marginTop:'5%', marginLeft:"5%"}}>Respond to Questions</Text>
      <View style={{backgroundColor: card_color, width: '98%', marginTop: 10}}>
        <Text style={styles.ExamFont}>Scenario:</Text>
        <Text style={[styles.ExamFont,{fontWeight:'400'}]}>{item.Context}</Text>
      </View>
      <QuestionForm question={item.Question[0]} index={0}/>
      <QuestionForm question={item.Question[1]} index={1}/>
      <QuestionForm question={item.Question[2]} index={2}/>
      <View style={{height:50}}/>
      </ScrollView>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: width
  },

  TimeFont: {
    textAlign: 'left',
    color: 'black',
    fontSize: 17,
  },
  ExamFont:{
      fontSize:18,
      color:'black',
      fontWeight:'500',
      marginLeft:'5%',
      marginRight:'5%'
  },
  questionzone:{
      flexDirection:'row', width:'98%', alignSelf:'center', justifyContent:'space-evenly', alignItems:'center'
  },
  questionstyle:{
      fontSize:18,color:'black', fontWeight:'400', width:'80%'
  },
});
export default SpeakP34QuestionForm;
