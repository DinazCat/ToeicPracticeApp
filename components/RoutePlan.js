import { View, Text,StyleSheet, TouchableOpacity, Image, ScrollView,ImageBackground } from 'react-native'
import React from 'react'
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
const RoutePlan=()=> {
    function TimeCard(){
        return(
            <View style={{width:'80%', height:50, borderRadius:10, borderColor:'black', borderWidth:2, alignItems:'center', justifyContent:'center', marginTop:5}}>
                <Text style={styles.TextStyle}>Day 1-3</Text>
            </View>
        )
    }
    function ContentCard(){
        return(
            <View style={{width:'100%', height:50, borderRadius:10, borderColor:'black', borderWidth:2,alignItems:'center', justifyContent:'center',  marginTop:5}}>
            <Text style={styles.TextStyle}>Photo describe {'\n'} Target: 5 point</Text>
            </View>
        )
    }
  return (
    <View style={styles.container}>
        <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity style={{marginLeft: '2%'}}>
            <FontAwesome name="chevron-left" color="white" size={20} />
          </TouchableOpacity>
            <TouchableOpacity style={{width:50, height:50,backgroundColor:'#33CC33', borderRadius:25, alignItems:'center', justifyContent:'center', marginLeft:'4%'}}>
            <Icon name={'angle-double-up'} style={{color: 'white', fontSize: 20}} />
                <Text style={{color:'white',fontWeight:'500', fontSize:20}}>500</Text>
            </TouchableOpacity>
        <Text style={{textAlign:'center', color:'white', fontSize:20, marginLeft:'25%'}}>Plan</Text>
      </View>
      <ScrollView>
      <View style={{width:'96%', flexDirection:'row',justifyContent:'space-evenly', alignSelf:'center', marginTop:10}}>
      {/* <ScrollView> */}
        <View style={{width:'30%', alignItems:'center', }}>
            <Text style={styles.TextStyle}>Time</Text>
            <TimeCard/>
            <TimeCard/>
            <TimeCard/>
            <TimeCard/>
        </View>
        <View style={{width:'66%', alignItems:'center', }}>
            <Text style={styles.TextStyle}>Content</Text>
            <ContentCard/>
            <ContentCard/>
            <ContentCard/>
            <ContentCard/>
        </View>
        {/* </ScrollView> */}
      </View>
      </ScrollView>
      
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
    },
    box:{
        width:'80%', height:'25%', borderRadius:10, borderColor:'black', borderWidth:2, alignItems:'center', justifyContent:'center'
    }
})
export default RoutePlan