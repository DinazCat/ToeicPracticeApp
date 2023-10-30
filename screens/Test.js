import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import TestCard from '../components/TestCard'
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import CustomHeader from '../components/CustomHeader'
const Test=({navigation})=>{
  return (
    <View style={styles.container}>
       <ImageBackground source={require('../assets/bg8.png')} style={{ flex: 1, resizeMode: 'cover' }}>
       <CustomHeader Title={'Test'} navigation={navigation}/>
      <TestCard/>
      <TestCard/>
      <TestCard/>
      <TestCard/>
       </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF", 
      flex:1,
      height:1000
    },})
export default Test