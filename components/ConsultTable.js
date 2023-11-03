import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  FlatList
} from 'react-native';
import React from 'react';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ConsultCard from './ConsultCard';
const ConsultTable=({route, navigation})=>{
const {History,questionList,part} = route.params
return (
  <View style={styles.container}>
       <ImageBackground
      source={require('../assets/bg7.png')}
      style={{flex: 1, resizeMode: 'cover'}}>
    <View style={AppStyle.viewstyle.component_upzone}>
      <TouchableOpacity style={{marginLeft: '2%'}} onPress={() => navigation.goBack()}>
        <FontAwesome name="chevron-left" color="white" size={20} />
      </TouchableOpacity>
      <Text
        style={{
          textAlign: 'left',
          color: 'white',
          fontSize: 20,
          marginLeft: 15,
        }}>
        Consult
      </Text>
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
    <FlatList
            data={History}
            renderItem={({item, index}) => (
          <ConsultCard
          defaultanswer={item.Default} 
          useranswer={item.Select}
          question={index}
          id={item.Qid}
          click={()=>{navigation.push('ReviewQuestion',{questionList:questionList,indication:index,History:History,part:part})}}
               />
          )}/>
    {/* <ConsultCard defaultanswer={'A'} useranswer={'A'}/>
    <ConsultCard defaultanswer={'B'} useranswer={'C'}/>
    <ConsultCard defaultanswer={'D'} useranswer={"C"}/>
    <ConsultCard defaultanswer={'A'} useranswer={"A"}/>
    <ConsultCard defaultanswer={'B'} useranswer={'B'}/>
    <ConsultCard defaultanswer={'D'} useranswer={'D'}/> */}
    </ImageBackground>
  </View>
)
}
const styles = StyleSheet.create({
  container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
  buttonstyle:{
      width:'80%', height:60, alignSelf:'center', backgroundColor:'#00CC66', borderRadius:20,justifyContent:'center', marginTop:15
  },
  buttonText:{
      color:'white', fontSize:22, fontWeight:'600', textAlign:'center'
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
})
export default ConsultTable