import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import Api from '../api/Api';

const CompleteCard2=({navigation,route})=> {
  const {quantity, sign, part, questionL, partName, isFromPL} = route.params
  const [questionList, setQuestionList] = useState(null)
  const [reviewList, setReviewList] = useState(null)
  const [skill, setSkill] = useState()
  const [skillText, setSkillText] = useState('')
//   const [quantity1, setQuantity1] = useState(route.params.quantity)
  const setReview= async()=>{
    const list=[]
    for(let i = 0; i < questionL.length; i++)
    {
      if(part=='W1'){
        const data = await Api.getOneQuestion('WritePart1',questionL[i].Qid)
        list.push(data)
        setSkillText('Writting')
      }
      else if(part=='W2'){
        const data = await Api.getOneQuestion('WritePart2',questionL[i].Qid)
        list.push(data)
        setSkillText('Writting')
      }
      else if(part=='W3'){
        const data = await Api.getOneQuestion('WritePart3',questionL[i].Qid)
        list.push(data)
        setSkillText('Writting')
      }
      else if(part=='S1'){
        const data = await Api.getOneQuestion('SpeakPart1',questionL[i].Qid)
        list.push(data)
        setSkillText('Speaking')
      }
      else if(part=='S2'){
        const data = await Api.getOneQuestion('SpeakPart2',questionL[i].Qid)
        list.push(data)
        setSkillText('Speaking')
      }
      else if(part=='S3'){
        const data = await Api.getOneQuestion('SpeakPart3',questionL[i].Qid)
        list.push(data)
        setSkillText('Speaking')
      }
      else if(part=='S4'){
        const data = await Api.getOneQuestion('SpeakPart4',questionL[i].Qid)
        list.push(data)
        setSkillText('Speaking')
      }
      else if(part=='S5'){
        const data = await Api.getOneQuestion('SpeakPart5',questionL[i].Qid)
        list.push(data)
        setSkillText('Speaking')
      }
    }
    setReviewList(list) 
  }
  const continuePractice = async()=>{
    if(part=='W1'){
      const list = await Api.getQuestion(quantity,'WritePart1')
      setQuestionList(list) 
      setSkill('W1')
      }
      else if(part=='W2'){
        const list = await Api.getQuestion(quantity,'WritePart2')
        setQuestionList(list) 
        setSkill('W2')
        }
        else if(part=='W3'){
          const list = await Api.getQuestion(quantity,'WritePart3')
          setQuestionList(list) 
          setSkill('W3')
          }
          else if(part=='S1'){
            const list = await Api.getQuestion(quantity,'SpeakPart1')
            setQuestionList(list) 
            setSkill('S1')
            }
            else if(part=='S2'){
              const list = await Api.getQuestion(quantity,'SpeakPart2')
              setQuestionList(list) 
              setSkill('S2')
              }
              else if(part=='S3'){
                const list = await Api.getQuestion(quantity,'SpeakPart3')
                setQuestionList(list) 
                setSkill('S3')
                }
                else if(part=='S4'){
                  const list = await Api.getQuestion(quantity,'SpeakPart4')
                  setQuestionList(list) 
                  setSkill('S4')
                  }
                  else if(part=='S5'){
                    const list = await Api.getQuestion(quantity,'SpeakPart5')
                    setQuestionList(list) 
                    setSkill('S5')
                    }

         
    }
  
  useEffect(()=>{
    if(sign!='Home'){
      continuePractice()
    }
      setReview()
    

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
            {skillText+' '}
            <Text style={[styles.TextFont, {fontWeight: '300'}]}>
              {partName}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: '30%',
          }}>
          <TouchableOpacity
            style={[AppStyle.button.button2]}
            onPress={() =>
                navigation.push('ReviewQuestion', {
                    questionList: reviewList,
                    indication: 0,
                    History: questionL,
                    part: part,
                  })
            }>
            <Text style={AppStyle.button.button2_Text}>Review</Text>
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
export default CompleteCard2