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
  const ListenP2QuestionForm = () => {
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
       
        <View style={styles.boxstyle}>
          <Text style={{color:PRIMARY_COLOR, fontWeight:'600', fontSize:20,textAlign:'left',marginTop:'5%', marginLeft:"5%"}}>Select the answer</Text>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:"space-evenly", marginTop:'10%'}}>
              <TouchableOpacity style={styles.answerboxStyle}>
                  <Text style={styles.answertext}>A</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.answerboxStyle}>
                  <Text style={styles.answertext}>B</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.answerboxStyle}>
                  <Text style={styles.answertext}>C</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.answerboxStyle}>
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
    answertext:{
      color:'black',fontWeight:'500', fontSize:20
    }
  });
  export default ListenP2QuestionForm;
  