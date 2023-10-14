import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import AppStyle from '../theme'
import QuestionCard from './QuestionCard';
const {width} = Dimensions.get('window');
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
const ListenP34QuestionForm = ({item,list}) => {
  const [sign, setsign] = useState('1');
  const [playState, setPlayState] = useState('paused')
  const [Qindex, setQindex] = useState('');
  const [Qhistory, setQhistory] = useState(null);
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
  const sethistory=(index)=>{
    const list = [...Qhistory]
    list.push(index)
    setQhistory(list);
  }
  function Card({question, index}){
    return(
      <View style={styles.boxstyle}>
      <Text style={{color:'black', fontSize:20,textAlign:'left', marginLeft:"5%", marginTop:'3%'}}>{question.Q}</Text>
      <View style={{flexDirection:'colunm',}}>
        <View  style={styles.answerZone}>
        <TouchableOpacity style={[styles.answerboxStyle,(Qindex== index)?sign=='A'&&(question.A[0].status?styles.answerboxStyleTrue:styles.answerboxStyleFalse):null]} onPress={()=>{setsign('A'), setQindex(index)}}>
              <Text style={styles.answertext}>A</Text>
          </TouchableOpacity>
          <Text style={styles.answerLong}> {question.A[0].script}</Text>
        </View>
        <View  style={styles.answerZone}>
        <TouchableOpacity style={[styles.answerboxStyle,(Qindex== index)?sign=='B'&&(question.A[1].status?styles.answerboxStyleTrue:styles.answerboxStyleFalse):null]} onPress={()=>{setsign('B'), setQindex(index)}}>
              <Text style={styles.answertext}>B</Text>
          </TouchableOpacity>
          <Text style={styles.answerLong}>{question.A[1].script}</Text>
        </View>
        <View  style={styles.answerZone}>
        <TouchableOpacity style={[styles.answerboxStyle,(Qindex== index)?sign=='C'&&(question.A[2].status?styles.answerboxStyleTrue:styles.answerboxStyleFalse):null]} onPress={()=>{setsign('C'), setQindex(index)}}>
              <Text style={styles.answertext}>C</Text>
          </TouchableOpacity>
          <Text style={styles.answerLong}>{question.A[2].script}</Text>
        </View>
        <View  style={styles.answerZone}>
        <TouchableOpacity style={[styles.answerboxStyle,(Qindex== index)?sign=='D'&&(question.A[3].status?styles.answerboxStyleTrue:styles.answerboxStyleFalse):null]} onPress={()=>{setsign('D'), setQindex(index)}}>
              <Text style={styles.answertext}>D</Text>
          </TouchableOpacity>
          <Text style={styles.answerLong}>{question.A[3].script}</Text>
        </View>
      </View>
    </View>
    )
  }
  return (
    <Animated.View style={styles.container}>
      <ScrollView>
     <View style={styles.box}>
      {/* <FlatList
            data={item.Question}
            renderItem={({item, index}) => (
          <Card 
              question={item} 
              index = {index}
               />
          )}/> */}
           <FlatList
            data={item.Question}
            renderItem={({item, index}) => (
          <QuestionCard
              question={item.Q} 
              answer={item.A}
               />
          )}/>
     </View>
     </ScrollView>
      
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
    width:width
  },
  TimeFont: {
    textAlign: 'left',
    color: 'black',
    fontSize: 20,
  },
  boxstyle:{
    flexDirection:'column',width:'90%', backgroundColor:card_color, marginTop:"5", height:300,borderRadius:15
  },
  box:{
    flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:"5%", height:900,borderWidth: 1,
    borderColor: '#CFCFCF', borderRadius:15,
  },
  answerboxStyle:{
    width:40, height:40,backgroundColor:'white', borderRadius:25,borderColor:PRIMARY_COLOR, borderWidth:2, alignItems:'center', justifyContent:'center',marginLeft:"5%"
  },
  answerboxStyleTrue:{
    width:40, height:40,backgroundColor:PRIMARY_COLOR, borderRadius:25,borderColor:PRIMARY_COLOR, borderWidth:2, alignItems:'center', justifyContent:'center'
  },
  answerboxStyleFalse:{
    width:40, height:40,backgroundColor:'red', borderRadius:25,borderColor:'red', borderWidth:2, alignItems:'center', justifyContent:'center'
  },
  answertext:{
    color:'black',fontWeight:'500', fontSize:20
  },
  answerLong:{
      color:'black', fontSize:18,marginLeft:"5%"   
  },
  answerZone:{
      flexDirection:'row', alignItems:'center', marginTop:'3%'
  }
});
export default ListenP34QuestionForm;
