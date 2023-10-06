import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const TestResultScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={'chevron-back-outline'} style={styles.IconButton}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Result</Text>
      </View>

      <View style={styles.ResultStatsWrapper}>
          <View
            style={[
              styles.ResultStatsItem,{backgroundColor: '#D5FFDA', width: 110},
            ]}>
            <Image style={{width: 28, height: 28}} source={require('../assets/accept.png')}/>
            <Text style={styles.ResultStatsTitle}>{170}</Text>
            <Text style={styles.ResultStatsSubTitle}>
              {'Correct'}
            </Text>
          </View>
        <View
          style={[
            styles.ResultStatsItem,{backgroundColor: '#FFE2E2', width: 110},
          ]}>
          <Image style={{width: 29, height: 29}} source={require('../assets/incorrect.png')}/>
          <Text style={styles.ResultStatsTitle}>{20}</Text>
          <Text style={styles.ResultStatsSubTitle}>
            {'Incorrect'}
          </Text>
        </View>
        <View
          style={[
            styles.ResultStatsItem,{backgroundColor: '#DCDBFF', width: 110},
          ]}>
          <Image style={{width: 30, height: 30}} source={require('../assets/forbidden.png')}/>
          <Text style={styles.ResultStatsTitle}>{10}</Text>
          <Text style={styles.ResultStatsSubTitle}>
            {'Unanswered'}
          </Text>
        </View>
      </View>

      <View style={styles.ResultStatsWrapper}>
        <View
          style={[styles.ResultStatsItem,{backgroundColor: '#FFFCC2', width: 150}, ]}>
          <Text style={styles.ResultStatsTitle2}>Listening</Text>
          <Text style={styles.ResultStatsTitle}>465/495</Text>
          <Text style={styles.ResultStatsSubTitle}>
            {'Correct Answers: 90/100'}
          </Text>
        </View>
        <View
          style={[styles.ResultStatsItem,{backgroundColor: '#FFFCC2', width: 150},]}>
          <Text style={styles.ResultStatsTitle2}>Reading</Text>
          <Text style={styles.ResultStatsTitle}>445/495</Text>
          <Text style={styles.ResultStatsSubTitle}>
            {'Correct Answers: 88/100'}
          </Text>
        </View>
      </View>

      <View style={styles.StatistícsContainer}>
        <View style={{marginRight: 80}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name={'checkmark-outline'} style={styles.iconStyle}/>
            <Text style={styles.StatisticsText}>Test Result: 170/200</Text>
          </View>    
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={require('../assets/target.png')} style={{width: 23, height: 23, margin: 5}}/>
            <Text style={styles.StatisticsText}>Accuracy: 85%</Text>
          </View> 
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name={'time-outline'} style={styles.iconStyle}/>
            <Text style={styles.StatisticsText}>Time: 2:00:00</Text>
          </View>      
        </View>

        <View style={styles.ResultStatsItem}>
          <Image style={{width: 30, height: 30}} source={require('../assets/flag.png')}/>
          <Text style={styles.ResultStatsTitle}>{910}</Text>
          <Text style={styles.ResultStatsSubTitle}>
            {'Points'}
          </Text>
        </View>
      </View>

      <View style={styles.AnswersContainer}>
          <Text style={styles.PartText}>Part 1</Text>
          <TouchableOpacity style={styles.AnswersWrapper}
          onPress={() => navigation.navigate('')}>
          <Ionicons name='checkmark-outline' size={22} color={'green'}/>
          <Text style={[styles.QuestionText,]}>{'Câu 1'}</Text>
          <View style={[styles.CircleAnswer, {backgroundColor: '#89CE55'}]}>
            <Text style={styles.CircleAnswerText}>A</Text>
          </View>
          <View style={styles.CircleAnswer}>
            <Text style={styles.CircleAnswerText}>B</Text>
          </View>
          <View style={styles.CircleAnswer}>
            <Text style={styles.CircleAnswerText}>C</Text>
          </View>
          <View style={styles.CircleAnswer}>
            <Text style={styles.CircleAnswerText}>D</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.AnswersWrapper}
          onPress={() => navigation.navigate('')}>
          <Ionicons name='checkmark-outline' size={22} color={'green'}/>
          <Text style={[styles.QuestionText,]}>{'Câu 2'}</Text>
          <View style={[styles.CircleAnswer, {backgroundColor: '#89CE55'}]}>
            <Text style={styles.CircleAnswerText}>A</Text>
          </View>
          <View style={[styles.CircleAnswer, {backgroundColor: 'transparent'}]}>
            <Text style={styles.CircleAnswerText}>B</Text>
          </View>
          <View style={styles.CircleAnswer}>
            <Text style={styles.CircleAnswerText}>C</Text>
          </View>
          <View style={styles.CircleAnswer}>
            <Text style={styles.CircleAnswerText}>D</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.AnswersWrapper}
          onPress={() => navigation.navigate('')}>
          <Ionicons name='close-outline' size={22} color={'red'}/>
          <Text style={[styles.QuestionText,]}>{'Câu 3'}</Text>
          <View style={[styles.CircleAnswer, {backgroundColor: '#F43C3C'}]}>
            <Text style={styles.CircleAnswerText}>A</Text>
          </View>
          <View style={[styles.CircleAnswer, {backgroundColor: '#89CE55'}]}>
            <Text style={styles.CircleAnswerText}>B</Text>
          </View>
          <View style={styles.CircleAnswer}>
            <Text style={styles.CircleAnswerText}>C</Text>
          </View>
          <View style={styles.CircleAnswer}>
            <Text style={styles.CircleAnswerText}>D</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.PartText}>Part 2</Text>
      </View>

    </View>
  )
}

export default TestResultScreen
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'column',
  },
  header:{
    flexDirection:'row', 
    backgroundColor: '#9ACC1C', 
    alignItems: 'center', 
    padding: 8
  },
  headerText:{
    marginLeft: 120,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  IconButton:{
    color: '#fff', 
    fontSize: 30, 
    padding: 5,
  },
  ResultStatsWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  ResultStatsItem: {
    justifyContent: 'center',
    //width: 110,
    borderRadius: 5,
    paddingVertical: 4,
    alignItems: 'center',
    borderRadius: 5

  },
  ResultStatsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  ResultStatsSubTitle: {
    fontSize: 12,
    color: '#666',
  },
  StatistícsContainer:{
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    flexDirection: 'row'
  },
  StatisticsText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '700'
  },
  iconStyle:{
    color: '#000',
    fontSize: 25, 
    padding: 5
  },
  ResultStatsTitle2:{
    fontSize: 16,
    fontWeight: '500',
    color: '#9ACC1C'
  },
  AnswersContainer:{
    margin: 10,
  },
  AnswersWrapper: {
    flexDirection: 'row',
    width: '100%',
    borderColor: '#DDD',
    borderBottomWidth: 1,
    paddingVertical: 10,  
    paddingHorizontal: 12,
    alignItems: 'center'
  },
  QuestionText: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: '500',
    color: '#222',
    marginRight: 10
  },
  PartText: {
    fontSize: 15,
    color: '#222',
    fontWeight: '700',
    fontStyle: 'italic',
    marginTop: 10
  },
  CircleAnswer:{
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: '#555',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20
  },
  CircleAnswerText:{
    fontSize: 17,
    fontWeight: '500',
    color: '#000'
  }
})