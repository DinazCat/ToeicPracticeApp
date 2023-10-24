import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated, Dimensions, PermissionsAndroid, Alert, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
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
const SpeakP1QuestionForm = ({item}) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [uri, setUri] = useState(null);

  // useEffect(() => {
  //   const listener = audioRecorderPlayer.addPlayBackListener(onPlaybackStatusChange);
  //   return () => {
  //     audioRecorderPlayer.removePlayBackListener(listener);
  //   };
  // }, []);

  // const onPlaybackStatusChange = (status) => {
  //   if (!status.isPlaying && status.didJustFinish) {
  //     console.log('Audio đã phát hết và dừng');
  //   }
  // };

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
  const onStartRecord = async () => {
    await getPermissions().then(() => {
      if(!permissionGranted) return;
    })

    const dirs = RNFetchBlob.fs.dirs;
    // const path = Platform.select({
    //   android: `${dirs.CacheDir}/record-${userId}-${new Date().getTime()}.mp3`,
    // });
    const path = Platform.select({
        android: `${dirs.CacheDir}/record.mp3`,
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
      setRecordTime(e.currentPosition);
      console.log(e.currentPosition)
    });
    setIsRecording(true);
    setUri(path);
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
    setIsRecording(false);
    setRecordTime(0);
  };
  const onStartPlay = async () => {
    try {
      console.log('onStartPlay');
      if(uri === null) return;
      const msg = await audioRecorderPlayer.startPlayer(uri);
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
          setIsPlaying(false);
        }
      });
      setIsPlaying(true); 
    } catch (error) {
      console.error('Error starting player:', error);
    }   
  };
  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
    setIsPlaying(false);
  };
  return (
    <Animated.View style={styles.container}>    
      <View style={styles.boxstyle}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{color:'black', fontWeight:'500', fontSize:20,textAlign:'left',marginTop:'5%', marginLeft:"5%"}}>Reading the document</Text>
          <TouchableOpacity style={{marginTop: '5%', marginRight:'5%'}}>
      <Icon name={'volume-down'} style={{color: PRIMARY_COLOR, fontSize: 30}} />
      </TouchableOpacity>
          </View>
          <View style={{ width:'90%', alignSelf:'center', height:1, backgroundColor:'black',marginTop:'3%'}}/>
          <ScrollView>
          <Text style={{color:'black', fontSize:18,textAlign:'left', marginLeft:'5%', marginRight:'5%', marginTop:'3%', marginBottom:'3%'}}>
          {item.Question}
      </Text>
          </ScrollView>
      </View>
      <View
      style={{
        height: 50,
        flexDirection: 'row',
        marginTop:'10%',
        alignItems: 'center',
      }}>
        <Text style={{fontSize:20, fontWeight:'400', color:'black',marginLeft:"5%"}}>Your voice:</Text>
      {!isPlaying ? (
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
    {!isRecording ? (
      <TouchableOpacity style={{ alignSelf:'center', borderRadius:30, marginTop:'10%', borderWidth:3, borderColor:PRIMARY_COLOR, height:60, width:60, alignItems:'center', justifyContent:'center'}}
      onPress={onStartRecord}>
      <Icon name={'microphone-alt'} style={{color: PRIMARY_COLOR, fontSize: 30}} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={{ alignSelf:'center', borderRadius:30, marginTop:'10%', borderWidth:3, borderColor:PRIMARY_COLOR, height:60, width:60, alignItems:'center', justifyContent:'center', backgroundColor: '#CFF393'}}
      onPress={onStopRecord}>
      <Icon name={'microphone-alt'} style={{color: PRIMARY_COLOR, fontSize: 30}} />
      </TouchableOpacity>
    )
  }
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width:width,
  },
  boxstyle:{
    flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:"5%", height:"60%",borderWidth: 1,
    borderColor: '#CFCFCF', borderRadius:15,
  },
  TimeFont: {
    textAlign: 'left',
    color: 'black',
    fontSize: 17,
  },
});
export default SpeakP1QuestionForm;
  