import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import Api from '../api/Api';

const CompleteCard=({navigation,route})=> {
  const {score,quantity,answer, sign, part, questionL, partName, isFromPL} = route.params
  const [questionList, setQuestionList] = useState(null)
  const [reviewList, setReviewList] = useState(null)
  const [skill, setSkill] = useState()
  const setReview= async()=>{
    const list=[]
    for(let i = 0; i < questionL.length; i++)
    {
      if(part=='L1'){
        const data = await Api.getOneQuestion('ListenPart1',questionL[i].Qid)
        list.push(data)
      }
    }
    setReviewList(list) 
  }
  const continuePractice = async()=>{
    if(part=='L1'){
      const list = await Api.getQuestion(quantity,'ListenPart1')
      setQuestionList(list) 
      setSkill('L1')
      }
    }
  
  useEffect(()=>{
    if(sign!='Home'){
      continuePractice()
    }
    else{
      setReview()
    }

  },[])
 
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg3.png')}
        style={{flex: 1, resizeMode: 'cover'}}>
        <TouchableOpacity
          style={{marginLeft: '2%', marginTop: 10}}
          onPress={() => {
            if(isFromPL){
              navigation.navigate('PartPracticePlan');
            }
            else if (skill != null) navigation.navigate('PartFormat', {skill: skill});          
            else {
              navigation.goBack();
            }
          }}>
          <FontAwesome name="chevron-left" color={PRIMARY_COLOR} size={27} />
        </TouchableOpacity>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: '50%',
            backgroundColor: 'white',
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              fontSize: 25,
              marginLeft: 5,
            }}>
            You need to try harder
          </Text>
          <Text style={[styles.TextFont, {fontWeight: '400'}]}>
            You have completed the exercise
          </Text>
          <Text style={[styles.TextFont, {fontWeight: '400'}]}>
            Listening:{' '}
            <Text style={[styles.TextFont, {fontWeight: '300'}]}>
              Photographs
            </Text>
          </Text>
        </View>
        <Text
          style={{
            marginLeft: '4%',
            marginTop: '10%',
            fontSize: 25,
            fontWeight: '500',
            color: 'black',
          }}>
          Consult: {score}/{quantity}
        </Text>
        <View style={styles.boxstyle}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[styles.TextFont, {fontWeight: '400'}]}>
              Correct rate:
            </Text>
            <Text style={[styles.TextFont, {fontWeight: '400'}]}>
              {parseInt((score * 100) / quantity)}%
            </Text>
          </View>
          <Progress.Bar
            progress={score / quantity}
            width={250}
            height={10}
            style={{height: 10}}
            color={PRIMARY_COLOR}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: '10%',
          }}>
          <TouchableOpacity
            style={[AppStyle.button.button2]}
            onPress={() =>
              navigation.push('ConsultTable', {
                History: answer,
                questionList: reviewList,
                part: part,
              })
            }>
            <Text style={AppStyle.button.button2_Text}>Show answer</Text>
          </TouchableOpacity>
          {sign == 'Home' ? (
            <TouchableOpacity
              style={[AppStyle.button.button2]}
              onPress={() =>
                navigation.push('QuestionScreen', {
                  questionList: reviewList,
                  part: part,
                  partName: partName,
                  sign: 'noMax',
                })
              }>
              <Text style={AppStyle.button.button2_Text}>Do again</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[AppStyle.button.button2]}
              onPress={() =>
                navigation.navigate('QuestionScreen', {
                  questionList: questionList,
                  part: part,
                  partName: partName,
                  sign: 'Max',
                })
              }>
              <Text style={AppStyle.button.button2_Text}>Continue</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF", 
      flex:1,
    },
    TextFont:{
        fontSize:22, marginLeft:5, color:'black'
      },
     
      boxstyle:{
        flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:5, height:120, justifyContent:'space-evenly',borderWidth: 1,
        borderColor: '#CFCFCF', borderRadius:15, alignItems:'center', 
      },})
export default CompleteCard