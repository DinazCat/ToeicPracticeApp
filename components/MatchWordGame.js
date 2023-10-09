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

const MatchWordGame=()=> {
    function MatchCard({word, meaning}){
        return(
            <View style={{flexDirection:'row', alignSelf:'center', width:'96%', height:70, alignItems:'center', justifyContent:'space-evenly', marginTop:20}}>
            <TouchableOpacity style={styles.buttonstyle}>
                <Text style={styles.buttonText}>{word}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonstyle}>
                <Text style={styles.buttonText}>{meaning}</Text>
            </TouchableOpacity>
        </View>
        )
    }
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
      <Text style={[AppStyle.textstyle.parttext,{marginTop:15}]}> Match words:</Text>
      <View style={{marginTop:'10%'}}>
        <MatchCard word={'Corporate'} meaning={'Báo chí(n)'}/>
        <MatchCard word={'Global'} meaning={'Toàn cầu(adj)'}/>
        <MatchCard word={'Avenue'} meaning={'Doanh nghiệp(n)'}/>
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
        height:70, width:'40%', borderRadius:15, backgroundColor:card_color, justifyContent:'center', alignItems:'center'
    },
    buttonText:{
        color:'black', fontSize:22, fontWeight:'400', marginLeft:10
    }})
export default  MatchWordGame