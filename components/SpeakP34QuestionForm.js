import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated, Dimensions,} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'

const {width} = Dimensions.get('window');
const SpeakP34QuestionForm = ({item}) => {
  const QuestionForm = ({question, index}) => {
      return(
          <View style={{backgroundColor:card_color, width:'98%', alignSelf:'center', marginTop:'3%'}}>
          <View style={styles.questionzone}>
          <Text style={styles.questionstyle}>{question}</Text>
          <TouchableOpacity style={{ borderRadius:30, borderWidth:3, borderColor:PRIMARY_COLOR, height:30, width:30, alignItems:'center', justifyContent:'center',}}>
          <Icon name={'microphone-alt'} style={{color: PRIMARY_COLOR, fontSize: 20}} />
          </TouchableOpacity>
          </View>
              <View
          style={{
            height: 50,
            flexDirection: 'row',
            marginTop:'1%',
            alignItems: 'center',
          }}>
              <Text style={{fontSize:18, fontWeight:'400', color:'black',marginLeft:"5%"}}>Your voice:</Text>
          <TouchableOpacity style={{marginLeft:"5%"}}>
            <FontAwesome name="play-circle" color="black" size={20} />
          </TouchableOpacity>
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
      )
  }
  return (
    <Animated.View style={styles.container}>
      <ScrollView>     
      <Text style={{color:'black', fontWeight:'500',fontSize:20,textAlign:'left',marginTop:'5%', marginLeft:"5%"}}>Respond to Questions</Text>
      <View style={{backgroundColor: card_color, width: '98%', marginTop: 10}}>
        <Text style={styles.ExamFont}>Scenario:</Text>
        <Text style={[styles.ExamFont,{fontWeight:'400'}]}>{item.Context}</Text>
      </View>
      <QuestionForm question={item.Question[0]} index={0}/>
      <QuestionForm question={item.Question[1]} index={0}/>
      <QuestionForm question={item.Question[2]} index={0}/>
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
