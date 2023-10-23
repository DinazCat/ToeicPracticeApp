import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import Sound from 'react-native-sound';

const ListenP1QuestionForm = ({item,list}) => {
  const [sign, setsign] = useState('1');
  const [duration, setduration] = useState('00:00')
  const [position, setPosition] = useState('00:00');
  const [duration1, setduration1] = useState(0)
  const [position1, setPosition1] = useState(0);
  const [playState, setPlayState] = useState('paused')
  const [load, setload] = useState(false);
  const [SliderEditing, setSliderEditing] = useState(false)

//  const sound = new Sound(
//   item.Audio,null,
//     error => {
//       if (error) {
//         console.log('failed to load the sound', error);
//         return;
//       }   
//       setload(true);
//     },)
   


  // const onSliderEditStart = () => {
  //     setSliderEditing(true);
  // }
  //  const onSliderEditEnd = () => {
  //   setSliderEditing(false);
  // }
  //  const onSliderEditing = (value) => {
  //     if(sound){
  //       sound.setCurrentTime(value);
  //       const P = getAudioTimeString(value)
  //         setPosition(P);
  //         setPosition1(value);
  //     }
  // }

  // const play =  () => {
  //     if(sound){
  //       sound.play(playComplete);
  //         setPlayState('playing')
  //     }else{
          
  
  //         sound = new Sound(dings, (error) => {
  //             if (error) {
  //                 console.log('failed to load the sound', error);
                 
  //                 setPlayState('paused')
  //             }else{
  //               setPlayState('playing');
  //               const duration = getAudioTimeString(sound.getDuration())
  //               setduration(duration)
  //               setduration1(sound.getDuration())
  //               sound.play(playComplete);
  //             }
  //         });    
  //     }
  // }
  // const playComplete = (success) => {
  //     if(sound){
  //         if (success) {
  //             console.log('successfully finished playing');
  //             setPlayState('paused');
  //         setPosition1(0);
  //         setPosition('00:00')
  //          sound.setCurrentTime(0);
  //         } else {
  //             console.log('playback failed due to audio decoding errors');
  //            // Alert.alert('Notice', 'audio file error. (Error code : 2)');
  //         }
  //         setPlayState('paused');
  //         setPosition1(0);
  //         setPosition('00:00')
  //         //this.setState({playState:'paused', playSeconds:0});
  //         sound.setCurrentTime(0);
  //     }
  // }
// useEffect(()=>{
//   const duration = getAudioTimeString(sound.getDuration())
//   setduration(duration)
//   setduration1(sound.getDuration())
// },[])
  // const pause = () => {
  //     if(sound){
  //        sound.pause();
  //        sound.setCurrentTime(position1)
  //     }
  //     setPlayState('paused')
  //     //this.setState({playState:'paused'});
  // }

  // const jumpPrev15Seconds = () => {this.jumpSeconds(-5);}
  // const jumpNext15Seconds = () => {this.jumpSeconds(5);}
  // const jumpSeconds = (secsDelta) => {
  //     if(this.sound){
  //         this.sound.getCurrentTime((secs, isPlaying) => {
  //             let nextSecs = secs + secsDelta;
  //             if(nextSecs < 0) nextSecs = 0;
  //             else if(nextSecs > duration) nextSecs = duration;
  //             this.sound.setCurrentTime(nextSecs);
  //            // this.setState({playSeconds:nextSecs});
  //             setPosition(nextSecs);
  //         })
  //     }
  // }

  // const getAudioTimeString=(seconds)=>{
  //     const h = parseInt(seconds/(60*60));
  //     const m = parseInt(seconds%(60*60)/60);
  //     const s = parseInt(seconds%60);

  //     return ( (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
  // }

    // const getPosition = async () => {
    //   try {
    //   const currentPosition =  sound.getCurrentTime();
    //   setPosition1(currentPosition);
    //   setPosition(getAudioTimeString(currentPosition));
    //   } catch (error) {
    //   console.log('Error getting sound position:', error);
    //   }
    //   };
    // useEffect(() => {
     // console.log(item.Audio)
      // const interval = setInterval(() => {
      //   if (sound && duration1 <= 0) {
      //     setduration1(sound.getDuration())
      //   }
      //   if (sound && playState=='playing') {
      //     sound.getCurrentTime((seconds) => {
      //       setPosition1(seconds)
      //     })
      //   }
      // }, 100)
      // return () => clearInterval(interval); 
      // }, []);
    const playPause = () => {
      
      if (playState=='playing') {
        list.pause(()=>{
          console.log('successfully pause');
        });
        console.log('0')
       // sound.setCurrentTime(position1)
        setPlayState('paused')
      } else {
        // sound.play(playComplete);
        setPlayState('playing')
        list.play(success => {
          if (success) {
            console.log('successfully finished playing');
            setPlayState('paused')
            list.stop()
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }
    };
    
  return (
    <Animated.View style={styles.container}>    
      <View style={styles.boxstyle}>
        <Text style={{color:PRIMARY_COLOR, fontSize:20,textAlign:'left', fontWeight:'600',marginTop:'5%', marginLeft:"5%"}}>Select the answer</Text>
        <Image  source={{uri: item.Image}} style={{height:200, width:"88%", alignSelf:'center', marginTop:'5%'}}></Image>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:"space-evenly", marginTop:'7%'}}>
        <TouchableOpacity style={[styles.answerboxStyle,sign=='A'&&(item.Answer[0].status?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>setsign('A')}>
                <Text style={styles.answertext}>A</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.answerboxStyle,sign=='B'&&(item.Answer[1].status?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>setsign('B')}>
                <Text style={styles.answertext}>B</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.answerboxStyle,sign=='C'&&(item.Answer[2].status?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>setsign('C')}>
                <Text style={styles.answertext}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.answerboxStyle,sign=='D'&&(item.Answer[3].status?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>setsign('D')}>
                <Text style={styles.answertext}>D</Text>
            </TouchableOpacity>
        </View>
      </View>
      <View style={{flex:1}}/>
      <View
        style={{
          height: 70,
          backgroundColor: card_color,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity>
          <FontAwesome name="backward" color="black" size={20} />
        </TouchableOpacity>
       <TouchableOpacity onPress={playPause}>
       {playState == 'playing'?<FontAwesome name="pause-circle" color="black" size={20} />:
       <FontAwesome name="play-circle" color="black" size={20} />
       }
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="forward" color="black" size={20} />
        </TouchableOpacity>
        <Text style={styles.TimeFont}>{position}</Text>
        <Slider
          style={{width: 100, height: 40}}
          minimumValue={0}
          maximumValue={duration1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#990000"
          // onTouchStart={onSliderEditStart}
          // // onTouchMove={() => console.log('onTouchMove')}
          // onTouchEnd={onSliderEditEnd}
          // // onTouchEndCapture={() => console.log('onTouchEndCapture')}
          // // onTouchCancel={() => console.log('onTouchCancel')}
          // onValueChange={onSliderEditing}
          // value={position1}
        />
       {duration&&<Text style={styles.TimeFont}>{ duration}</Text>}
      </View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex:1
  },
  TimeFont: {
    textAlign: 'left',
    color: 'black',
    fontSize: 20,
  },
  boxstyle:{
    flexDirection:'column',width:390, backgroundColor:card_color, alignSelf:'center', marginTop:10, height:400,borderWidth: 1,
    borderColor: '#CFCFCF', borderRadius:15,
  },
  answerboxStyle:{
    width:40, height:40,backgroundColor:'white', borderRadius:25,borderColor:PRIMARY_COLOR, borderWidth:2, alignItems:'center', justifyContent:'center'
  },
  answerboxStyleTrue:{
    width:40, height:40,backgroundColor:PRIMARY_COLOR, borderRadius:25,borderColor:PRIMARY_COLOR, borderWidth:2, alignItems:'center', justifyContent:'center'
  },
  answerboxStyleFalse:{
    width:40, height:40,backgroundColor:'red', borderRadius:25,borderColor:'red', borderWidth:2, alignItems:'center', justifyContent:'center'
  },
  answertext:{
    color:'black',fontWeight:'500', fontSize:20
  }
});
export default ListenP1QuestionForm;
