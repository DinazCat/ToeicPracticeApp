import { View, Text,StyleSheet, TouchableOpacity, ImageBackground} from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PartFormatCard from './PartFormatCard';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
const PartFormat =()=> {
    const [ds, SetDs] = useState([
        {
            PartName:'Part 1: Photographs'
        },
        {
            PartName:'Part 2: Question & Response'
        },
        {
            PartName:'Part 3: Short Conversations'
        },
        {
            PartName:'Part 4: Short Talks'
        }])
  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/bg8.png')}
style={{ flex: 1, resizeMode: 'cover' }}>
      <View style={AppStyle.viewstyle.component_upzone}>
      <TouchableOpacity style={{marginLeft:'2%'}}>
      <FontAwesome name="chevron-left" color="white" size={20} />
      </TouchableOpacity>
        <Text style={{textAlign:'left', color:'white', fontSize:20, marginLeft:15}}>Listening</Text>
      </View>
      <PartFormatCard display={ds[0]} ></PartFormatCard>
      <PartFormatCard display={ds[1]}></PartFormatCard>
      <PartFormatCard display={ds[2]}></PartFormatCard>
      <PartFormatCard display={ds[3]}></PartFormatCard>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF", 
      flex:1,
    },
   
   

    })
export default PartFormat;