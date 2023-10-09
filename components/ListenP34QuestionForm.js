import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Slider from '@react-native-community/slider';
  import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
  const ListenP34QuestionForm = () => {
    function Card(){
      return(
        <View style={styles.boxstyle}>
        <Text style={{color:'black', fontSize:20,textAlign:'left', marginLeft:"5%", marginTop:'3%'}}>What is the main purpose of this report?</Text>
        <View style={{flexDirection:'colunm',}}>
          <View  style={styles.answerZone}>
          <TouchableOpacity style={styles.answerboxStyle}>
                <Text style={styles.answertext}>A</Text>
            </TouchableOpacity>
            <Text style={styles.answerLong}> To summarize major stories</Text>
          </View>
          <View  style={styles.answerZone}>
          <TouchableOpacity style={styles.answerboxStyle}>
                <Text style={styles.answertext}>B</Text>
            </TouchableOpacity>
            <Text style={styles.answerLong}> To provide in depth analysis</Text>
          </View>
          <View  style={styles.answerZone}>
          <TouchableOpacity style={styles.answerboxStyle}>
                <Text style={styles.answertext}>C</Text>
            </TouchableOpacity>
            <Text style={styles.answerLong}> To entertain listeners</Text>
          </View>
          <View  style={styles.answerZone}>
          <TouchableOpacity style={styles.answerboxStyle}>
                <Text style={styles.answertext}>D</Text>
            </TouchableOpacity>
            <Text style={styles.answerLong}> To update traffic and weather</Text>
          </View>
        </View>
      </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={AppStyle.viewstyle.component_upzone}>
          <TouchableOpacity style={{marginLeft: '2%'}}>
            <FontAwesome name="chevron-left" color="white" size={20} />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'left',
              color: 'white',
              fontSize: 20,
              marginLeft: 15,
            }}>
            Question 1
          </Text>
          <FontAwesome
            name="heart"
            color="white"
            size={20}
            style={{marginLeft: '3%'}}
          />
          <View style={{flex: 1}} />
          <TouchableOpacity>
          <Text
            style={{
              textAlign: 'left',
              color: 'white',
              fontSize: 20,
              marginRight: '5%',
              textDecorationLine: 'underline',
            }}>
            Explain
          </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
       <View style={styles.box}>
        <Card/>
        <Card/>
        <Card/>
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
          <TouchableOpacity>
            <FontAwesome name="play-circle" color="black" size={20} />
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
    
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
      height: 1000,
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
  