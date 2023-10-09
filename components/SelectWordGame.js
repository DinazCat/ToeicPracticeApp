import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    ImageBackground,
  } from 'react-native';
  import React from 'react';
  import AppStyle from '../theme';
  import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Icon from 'react-native-vector-icons/FontAwesome5';

const SelectWordGame=()=> {
  return (
    <View style={styles.container}> 
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity style={{marginLeft: '2%'}}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            marginLeft: 15,
          }}>
          1/20
        </Text>
      </View>
      <Text style={[AppStyle.textstyle.parttext,{marginTop:15}]}> Choose right answer:</Text>
      <View style={{marginTop:'10%'}}>
        <Text style={styles.buttonText}> Khoa học (n)</Text>
        <TouchableOpacity style={styles.buttonstyle}>
        <Text style={styles.buttonText}>Certain</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonstyle}>
        <Text style={styles.buttonText}>Science</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonstyle}>
        <Text style={styles.buttonText}>Officer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonstyle}>
        <Text style={styles.buttonText}>Senior</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={[AppStyle.button.button2,{marginTop:'40%', backgroundColor:card_color}]}>
        <Text style={[AppStyle.button.button2_Text, {color:'black'}]}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    buttonstyle:{
        width:'94%', height:50, alignSelf:'center', backgroundColor:card_color, borderRadius:20,justifyContent:'center', marginTop:15
    },
    buttonText:{
        color:'black', fontSize:22, fontWeight:'400', marginLeft:10
    }})
export default  SelectWordGame