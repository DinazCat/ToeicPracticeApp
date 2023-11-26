import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import Api from '../api/Api';

const CompleteTestCard = ({navigation,route})=> {
    const {quantity,answer, sign, questionL, partName, isFromPL, isMiniTest, DetailQty} = route.params
    const [reviewList, setReviewList] = useState(null)
    const [score, setScore] = useState(0)
    const [quantity1, setQuantity1] = useState(route.params.quantity)

    const SetScore = ()=>{
      let score = 0 , sum =0;
      for(let i = 0 ; i < questionL.length; i++){
        if(questionL[i].part=='L1'||questionL[i].part=='L2'||questionL[i].part=='R1'){
          if(answer[i].Select==answer[i].Default){
            score = score + 1;
          }
          sum++;
        }
        else{
          for(let j = 0; j < answer[i].Default.length; j++){
            if(answer[i].Select[j]==answer[i].Default[j]){
              score = score + 1;
            }
            sum++;
          }            
        }
      }
      setScore(score);
      setQuantity1(sum)
    }

    const setReview= async()=>{
      if(questionL){
        setReviewList(questionL);
      }
      else {
        const list=[]
        for(let i = 0; i < questionL.length; i++)
        {
          if(questionL[i].part=='L1'){
            const data = await Api.getOneQuestion('ListenPart1',questionL[i].Qid)  
            list.push({...data, part: questionL[i].part})
          }
          else if(questionL[i].part=='L2'){
            const data = await Api.getOneQuestion('ListenPart2',questionL[i].Qid)
            list.push({...data, part: questionL[i].part})
          }
          else if(questionL[i].part=='L3'){
            const data = await Api.getOneQuestion('ListenPart3',questionL[i].Qid)
            list.push({...data, part: questionL[i].part})
          }
          else if(questionL[i].part=='L4'){
            const data = await Api.getOneQuestion('ListenPart4',questionL[i].Qid)
            list.push({...data, part: questionL[i].part})
          }
          else if(questionL[i].part=='R1'){
            const data = await Api.getOneQuestion('ReadPart1',questionL[i].Qid)
            list.push({...data, part: questionL[i].part})
          }
          else if(questionL[i].part=='R2'){
            const data = await Api.getOneQuestion('ReadPart2',questionL[i].Qid)
            list.push({...data, part: questionL[i].part})
          }
          else if(questionL[i].part=='R3'){
            const data = await Api.getOneQuestion('ReadPart3',questionL[i].Qid)
            list.push({...data, part: questionL[i].part})
          }
        }
        setReviewList(list);
      }
    }
    
    useEffect(()=>{
      setReview();
      SetScore();
    },[])

    const onContinue = () => {
      if(isMiniTest){
        let currentLevel = 0;
        const correctPer = score / quantity1;
        if(correctPer >= 0 && correctPer < 0.2){
          currentLevel = 0;
        }
        else if(correctPer < 0.4){
          currentLevel = 1;
        }
        else if(correctPer < 0.6){
          currentLevel = 2;
        }
        else{
          currentLevel = 3;
        }
        navigation.navigate('PracticePlanTime', {targetLevel: route.params.targetLevel, currentLevel: currentLevel});
      }
    }
   
    const onShowAnswer = () =>{
      if(isMiniTest){
        navigation.push('ResultTable', {
          History: answer,
          questionList: reviewList,
          score:score,
          quantity:quantity1,
          isMiniTest: route.params.isMiniTest
        })
      }
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/bg3.png')}
          style={{flex: 1, resizeMode: 'cover'}}>
          {!isMiniTest && <TouchableOpacity
            style={{marginLeft: '2%', marginTop: 10}}
            onPress={() => {
              if(isFromPL){
                navigation.navigate('PartPracticePlan');
              }
        
              else {
                navigation.goBack();
              }
            }}>
            <FontAwesome name="chevron-left" color={PRIMARY_COLOR} size={27} />
          </TouchableOpacity>}
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
              Congratulations!
            </Text>
            <Text style={[styles.TextFont, {fontWeight: '400'}]}>
              You have completed the test
            </Text>
            {/* <Text style={[styles.TextFont, {fontWeight: '400'}]}>
              {skillText+' '}
              <Text style={[styles.TextFont, {fontWeight: '300'}]}>
                {partName}
              </Text>
            </Text> */}
          </View>
          <Text
            style={{
              marginLeft: '6%',
              marginTop: '10%',
              fontSize: 25,
              fontWeight: '500',
              color: 'black',
            }}>
            Result: {score}/{quantity1}
          </Text>
          <View style={styles.boxstyle}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.TextFont, {fontWeight: '400'}]}>
                Correct rate:
              </Text>
              <Text style={[styles.TextFont, {fontWeight: '400'}]}>
                {parseInt((score * 100) / quantity1)}%
              </Text>
            </View>
            <Progress.Bar
              progress={score / quantity1}
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
              onPress={onShowAnswer}>
              <Text style={AppStyle.button.button2_Text}>Show answer</Text>
            </TouchableOpacity>
            {sign == 'Home' ? (
              <TouchableOpacity
                style={[AppStyle.button.button2]}
                onPress={() =>
                  navigation.push('QuestionScreen', {
                    questionList: reviewList,
                    // part: part,
                    // partName: partName,
                    sign: 'noMax',
                  })
                }>
                <Text style={AppStyle.button.button2_Text}>Do again</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[AppStyle.button.button2]}
                onPress={onContinue}>
                <Text style={AppStyle.button.button2_Text}>Continue</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  }


export default CompleteTestCard

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
    },
})