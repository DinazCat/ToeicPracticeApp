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
  const SpeakP5QuestionForm = () => {
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
        <Text style={{color:'black', fontWeight:'500', fontSize:20,textAlign:'left',marginTop:'5%', marginLeft:"5%"}}>Listen to the example problem:</Text>
        <View
          style={{
            height: 70,
            width:'90%',
            alignSelf:'center',
            marginTop:'5%',
            backgroundColor: PRIMARY_COLOR,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderRadius:15
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
          <Text style={[styles.TimeFont]}>00:00</Text>
          <Slider
            style={{width: 100, height: 40}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#990000"
          />
          <Text style={[styles.TimeFont]}>00:17</Text>
        </View>
            <View
        style={{
            height: 70,
            width:'90%',
            alignSelf:'center',
            marginTop:'5%',
            backgroundColor: PRIMARY_COLOR,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderRadius:15
        }}>
            <Text style={{fontSize:20, fontWeight:'400', color:'black',marginLeft:"5%"}}>Your voice:</Text>
        <TouchableOpacity style={{marginLeft:"5%"}}>
          <FontAwesome name="play-circle" color="black" size={20} />
        </TouchableOpacity>
        <Slider
          style={{width: 100, height: 40, marginLeft:"1%"}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#990000"
        />
        <Text style={styles.TimeFont}>00:00</Text>
      </View>
        
        <TouchableOpacity style={{marginVertical:'90%', alignSelf:'center', borderRadius:30, borderWidth:3, borderColor:PRIMARY_COLOR, height:60, width:60, alignItems:'center', justifyContent:'center'}}>
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
   
  });
  export default SpeakP5QuestionForm;
  