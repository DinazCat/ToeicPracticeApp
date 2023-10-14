import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import AppStyle from '../theme'
import Sound from 'react-native-sound';
const {width} = Dimensions.get('window');
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
const ListenP2QuestionForm = ({item,list}) => {
  const [sign, setsign] = useState('1');
  const [playState, setPlayState] = useState('paused')
  const playPause = () => {
    
    if (playState=='playing') {
      list.pause(()=>{
        console.log('successfully pause');
      });
      setPlayState('paused')
    } else {
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
        <Text style={{color:PRIMARY_COLOR, fontWeight:'600', fontSize:20,textAlign:'left',marginTop:'5%', marginLeft:"5%"}}>Select the answer</Text>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:"space-evenly", marginTop:'10%'}}>
            <TouchableOpacity style={[styles.answerboxStyle,sign=='A'&&(item.Answer[0].status?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>setsign('A')}>
                <Text style={styles.answertext}>A</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.answerboxStyle,sign=='B'&&(item.Answer[1].status?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>setsign('B')}>
                <Text style={styles.answertext}>B</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.answerboxStyle,sign=='C'&&(item.Answer[2].status?styles.answerboxStyleTrue:styles.answerboxStyleFalse)]} onPress={()=>setsign('C')}>
                <Text style={styles.answertext}>C</Text>
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
        <Text style={styles.TimeFont}>00:00</Text>
        <Slider
          style={{width: 100, height: 40}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#990000"
        />
        <Text style={styles.TimeFont}>00:17</Text>
      </View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width:width,
  },
  upzone: {
    height: '8%',
    backgroundColor: '#990000',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  TimeFont: {
    textAlign: 'left',
    color: 'black',
    fontSize: 20,
  },
  boxstyle:{
    flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:"5%", height:"20%",borderWidth: 1,
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
export default ListenP2QuestionForm;
