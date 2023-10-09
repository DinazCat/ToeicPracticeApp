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
import QuestionCard from './QuestionCard';
  const ReadP1QuestionForm = () => {
    
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
       <View style={styles.box}>
       <ScrollView>
        <QuestionCard/>
        </ScrollView>
       </View>
        
       
    
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
      color: 'white',
      fontSize: 20,
    },
    boxstyle:{
      flexDirection:'column',width:'90%', backgroundColor:card_color, marginTop:"5", height:300,borderRadius:15
    },
    box:{
      flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:"5%", height:600,borderWidth: 1,
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
  export default ReadP1QuestionForm;
  