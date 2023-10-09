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
const RouteLevel=()=>{
  return (
    <View style={styles.container}>
         <ImageBackground
        source={require('../assets/bg7.png')}
        style={{flex: 1, resizeMode: 'cover'}}>
      <Text style={{color:'black', fontSize:25, fontWeight:'600', textAlign:'center', marginTop:'50%', marginBottom:30}}> Choose your target point</Text>
      <TouchableOpacity style={styles.buttonstyle}>
        <Text style={styles.buttonText}>500 Toeic</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonstyle}>
        <Text style={styles.buttonText}>700 Toeic</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonstyle}>
        <Text style={styles.buttonText}>900 Toeic</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[AppStyle.button.button2,{marginTop:60}]}>
        <Text style={AppStyle.button.button2_Text}>Exit</Text>
      </TouchableOpacity>
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
        width:'80%', height:60, alignSelf:'center', backgroundColor:'#D3D3D3', borderRadius:20,justifyContent:'center', marginTop:15
    },
    buttonText:{
        color:'black', fontSize:22, fontWeight:'600', textAlign:'center'
    }
})
export default RouteLevel