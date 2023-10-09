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
  const SpeakP34QuestionForm = () => {
    function Form(){
        return(
            <View style={{backgroundColor:card_color, width:'98%', alignSelf:'center', marginTop:'3%'}}>
            <View style={styles.questionzone}>
            <Text style={styles.questionstyle}>Question 4. Why do you want to work at the library?</Text>
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
      <View style={styles.container}>
              <ScrollView>
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
        <Text style={{color:'black', fontWeight:'500',fontSize:20,textAlign:'left',marginTop:'5%', marginLeft:"5%"}}>Respond to Questions</Text>
        <Text style={styles.ExamFont}>Scenario:</Text>
        <Text style={[styles.ExamFont,{fontWeight:'400'}]}>Who are we?
Tammy and Mike Power are an animal loving couple who have volunteered their time for the protection of animals for more than 20 years. Their Chicago based pet spa Paws 4 U was voted #1 in the animal care category for Chicago's Best Small Businesses two years in a row. For more information on this event visit the Pet Workshop website at www.chicagopetworkshops.com or call Tammy Power directly at 1-800-tam-mike. No registration required.
Special Request: Though this event is offered free of charge, the organizers ask that you bring a pet food (or monetary) donation for the local animal shelter. Examples of other types of donations can be found on the Pet Workshop website.</Text>

       <Form/>
       <Form/>
       <Form/>
       <View style={{height:50}}/>
       </ScrollView>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
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
  