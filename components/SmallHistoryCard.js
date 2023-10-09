import { View, Text, Image } from 'react-native'
import React from 'react'
import AppStyle from '../theme'
const SmallHistoryCard = () => {
  return (
    <View style={{flexDirection:'row', height:40, justifyContent:'space-between', alignItems:'center', width:'90%',marginTop:5}}>
      <Image  style={{width:'15%', height:40,}} source={require("../assets/headphones.png")} resizeMode='contain'/>
      <View style={{flexDirection:'row', height:40, justifyContent:'space-between', alignItems:'center', width:'80%', borderBottomColor:'black', borderBottomWidth:1}}>
      <Text style={{fontSize:16, color:'black'}}>Picture describe</Text>
      <Text style={AppStyle.button.buttonText}>90%</Text>
      </View>
    </View>
  )
}
export default SmallHistoryCard;