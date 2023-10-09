import { View, Text,StyleSheet, TouchableOpacity, Image, ScrollView,ImageBackground } from 'react-native'
import React from 'react'
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const RouteTest=()=> {
  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/bg5.png')} style={{ flex: 1, resizeMode: 'cover' }}>
        <View style={AppStyle.viewstyle.component_upzone}>
          <TouchableOpacity style={{marginLeft: '2%'}}>
            <FontAwesome name="chevron-left" color="white" size={20} />
          </TouchableOpacity>
         
        </View>
      <View style={{marginTop:'80%', width:'80%', alignSelf:'center'}}>
      <Text style={{fontSize:20, color:'black', textAlign:'center', fontWeight:'500'}}>To begin, let's take an assessment test to determine the appropriate learning path.</Text>
      <Text style={[styles.TextStyle, {marginTop:'5%'}]}>Time: 11m35s</Text>
      <Text style={styles.TextStyle}>Question: 14</Text>
      </View>
      <TouchableOpacity style={[AppStyle.button.button2,{marginTop:'10%'}]}>
            <Text style={AppStyle.button.button2_Text}>Begin</Text>
          </TouchableOpacity>
     
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF", 
      flex:1,
    },
    TextStyle:{
        fontSize:18, color:'black', textAlign:'center', fontWeight:'400'
    }
})
export default RouteTest