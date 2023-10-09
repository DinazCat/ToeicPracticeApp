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

const QuestionCard=()=> {
    return(
        <View style={styles.boxstyle}>
        <Text style={{color:'black', fontSize:20,textAlign:'left', marginLeft:"5%", marginTop:'3%'}}>Property taxes ________ about 40 percent of the overall tax revenue the state collects.</Text>
        <View style={{flexDirection:'colunm',}}>
          <View  style={styles.answerZone}>
          <TouchableOpacity style={styles.answerboxStyle}>
                <Text style={styles.answertext}>A</Text>
            </TouchableOpacity>
            <Text style={styles.answerLong}> make</Text>
          </View>
          <View  style={styles.answerZone}>
          <TouchableOpacity style={styles.answerboxStyle}>
                <Text style={styles.answertext}>B</Text>
            </TouchableOpacity>
            <Text style={styles.answerLong}> account for</Text>
          </View>
          <View  style={styles.answerZone}>
          <TouchableOpacity style={styles.answerboxStyle}>
                <Text style={styles.answertext}>C</Text>
            </TouchableOpacity>
            <Text style={styles.answerLong}> are at least</Text>
          </View>
          <View  style={styles.answerZone}>
          <TouchableOpacity style={styles.answerboxStyle}>
                <Text style={styles.answertext}>D</Text>
            </TouchableOpacity>
            <Text style={styles.answerLong}> are raised by</Text>
          </View>
        </View>
      </View>
      )
}
const styles = StyleSheet.create({
   
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
export default QuestionCard