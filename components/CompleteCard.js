import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
const CompleteCard=()=> {
  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/bg3.png')} style={{flex: 1, resizeMode: 'cover'}}>
        <TouchableOpacity style={{marginLeft: '2%', marginTop:10}}>
            <FontAwesome name="chevron-left" color={PRIMARY_COLOR} size={20} />
        </TouchableOpacity>
        <View style={{alignSelf:'center', justifyContent:'space-evenly', alignItems:'center', marginTop:'50%', backgroundColor:'white'}}>
        <Text style={{color:'black', fontWeight:'500', fontSize:25, marginLeft:5}}>You need to try harder</Text>
        <Text style={[styles.TextFont,{fontWeight:'400',}]}>You have completed the exercise</Text>
        <Text style={[styles.TextFont,{fontWeight:'400',}]}>Listening: <Text style={[styles.TextFont,{fontWeight:'300',}]}>Photographs</Text></Text>
        </View>
        <Text style={{marginLeft:'4%', marginTop:'10%', fontSize:25, fontWeight:'500', color:'black'}}>Consult: 9/10</Text>
        <View style={styles.boxstyle}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={[styles.TextFont,{fontWeight:'400',}]}>Correct rate:</Text>
                <Text style={[styles.TextFont,{fontWeight:'400',}]}>90%</Text>
            </View>
            <Progress.Bar progress={0.3} width={250} height={10} style={{height:10, }} color={PRIMARY_COLOR}/>
        </View>
       <View style={{flexDirection:'row', justifyContent:'space-evenly',marginTop:'10%'}}>
       <TouchableOpacity style={[AppStyle.button.button2,]}>
            <Text style={AppStyle.button.button2_Text}>Show answer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[AppStyle.button.button2,]}>
            <Text style={AppStyle.button.button2_Text}>Do again</Text>
          </TouchableOpacity>
       </View>

        </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF", 
      flex:1,
    },
    TextFont:{
        fontSize:22, marginLeft:5, color:'black'
      },
     
      boxstyle:{
        flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:5, height:120, justifyContent:'space-evenly',borderWidth: 1,
        borderColor: '#CFCFCF', borderRadius:15, alignItems:'center', 
      },})
export default CompleteCard