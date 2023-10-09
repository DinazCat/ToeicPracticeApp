import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
  } from 'react-native';
  import React from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Slider from '@react-native-community/slider';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
  const WriteP1QuestionForm = () => {
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
        <Text style={{color:'black', fontWeight:'500', fontSize:20,textAlign:'left',marginTop:'5%', marginLeft:"5%"}}>Describe the picture:</Text>
        <Image source={{uri:'https://www.englishclub.com/images/esl-exams/TOEIC-writing-2.jpg'}} style={{height:220, width:"88%", alignSelf:'center', marginTop:'5%'}}></Image>
        <Text style={{color:'black', fontSize:20, fontWeight:'500', textAlign:'center', marginTop:'10%'}}>Together/ table</Text>
        <View style={{height:'25%', width:'90%', alignSelf:'center', backgroundColor:'white', borderColor:PRIMARY_COLOR, borderWidth:2, marginTop:'3%'}}>
        <TextInput
             multiline={true}
             style={{fontSize: 16, marginLeft: 3, color:'black'}}
             placeholder="Write your answer here"
             placeholderTextColor={'rgba(0,0,0,0.8)'}
           />
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
      fontSize: 17,
    },
   
  });
  export default WriteP1QuestionForm;
  