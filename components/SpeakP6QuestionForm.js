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
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
  const SpeakP6QuestionForm = () => {
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
        <Text style={{color:'black', fontWeight:'500', fontSize:20,textAlign:'left',marginTop:'5%', marginLeft:"5%"}}>Offer your opinion:</Text>
        <View style={styles.boxstyle}>
        <Text style={{color:'black', fontSize:18,textAlign:'left', marginLeft:'5%', marginRight:'5%', marginTop:'3%', marginBottom:'3%'}}>Some people wish they could live in warm climates all year round. These places get very hot during certain months of the year. In fact, studies show that heat can lead to greater crime. Do you think that people in warm climates lead happier lives or not? State your opinion and provide reasons for your view.</Text>
        </View>
        <View
        style={{
          height: 50,
          flexDirection: 'row',
          marginTop:'10%',
          alignItems: 'center',
        }}>
            <Text style={{fontSize:20, fontWeight:'400', color:'black',marginLeft:"5%"}}>Your voice:</Text>
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
        
        <TouchableOpacity style={{marginVertical:'35%', alignSelf:'center', borderRadius:30, borderWidth:3, borderColor:PRIMARY_COLOR, height:60, width:60, alignItems:'center', justifyContent:'center'}}>
        <Icon name={'microphone-alt'} style={{color: PRIMARY_COLOR, fontSize: 30}} />
        </TouchableOpacity>
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
      fontSize: 17,
    },
    boxstyle:{
        flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:"5%", height:"40%",borderWidth: 1,
        borderColor: '#CFCFCF', borderRadius:15,
      },
   
  });
  export default SpeakP6QuestionForm;
  