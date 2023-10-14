import { View, Text,StyleSheet, TouchableOpacity, ImageBackground, FlatList} from 'react-native'
import React, { useState, useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PartFormatCard from './PartFormatCard';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
const PartFormat =({navigation, route})=> {
    const [ds, SetDs] = useState(null)
        const { skill } = route.params;
        
        useEffect(() => {
          if(skill == 'L'){
            const PartList = [{
              PartName:'Part 1: Photographs',
              part:'L1'
          },
          {
              PartName:'Part 2: Question & Response',
              part:'L2'
          },
          {
              PartName:'Part 3: Short Conversations',
              part:'L3'
          },
          {
              PartName:'Part 4: Short Talks',
              part:'L4'
          }]
          SetDs(PartList);
          }
          else if(skill == 'R'){
            const PartList = [{
              PartName:'Part 1: Incomplete Sentences',
              part:'R1'
          },
          {
              PartName:'Part 2: Text Completion',
              part:'R2'
          },
          {
              PartName:'Part 3: Reading Comprehension',
              part:'R3'
          },]
          SetDs(PartList);
          }
        }, []);
  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/bg8.png')}
style={{ flex: 1, resizeMode: 'cover' }}>
      <View style={AppStyle.viewstyle.component_upzone}>
      <TouchableOpacity style={{marginLeft:'2%'}}>
      <FontAwesome name="chevron-left" color="white" size={20} onPress={() => navigation.goBack()}/>
      </TouchableOpacity>
        <Text style={{textAlign:'left', color:'white', fontSize:20, marginLeft:15}}>Listening</Text>
      </View>
      
    {/* {ds!=null&&skill=='L'&&<>
      <PartFormatCard display={ds[0]}  part={'L1'}></PartFormatCard>
      <PartFormatCard display={ds[1]}  part={'L2'}></PartFormatCard>
      <PartFormatCard display={ds[2]}  part={'L3'}></PartFormatCard>
      <PartFormatCard display={ds[3]}  part={'L4'}></PartFormatCard>
    </>} */}
    {ds!=null&&<FlatList
              data={ds}
              renderItem={({item, index}) => (
            <PartFormatCard
                display={item} 
                 />
            )}/>}
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