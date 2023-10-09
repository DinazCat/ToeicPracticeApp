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
  import ConsultCard from './ConsultCard';
const ConsultTable=()=>{
  return (
    <View style={styles.container}>
         <ImageBackground
        source={require('../assets/bg7.png')}
        style={{flex: 1, resizeMode: 'cover'}}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity style={{marginLeft: '2%'}}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'left',
            color: 'white',
            fontSize: 20,
            marginLeft: 15,
          }}>
          Consult
        </Text>
      </View>
      <ConsultCard defaultanswer={'A'} useranswer={'A'}/>
      <ConsultCard defaultanswer={'B'} useranswer={'C'}/>
      <ConsultCard defaultanswer={'D'} useranswer={"C"}/>
      <ConsultCard defaultanswer={'A'} useranswer={"A"}/>
      <ConsultCard defaultanswer={'B'} useranswer={'B'}/>
      <ConsultCard defaultanswer={'D'} useranswer={'D'}/>
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
        width:'80%', height:60, alignSelf:'center', backgroundColor:'#00CC66', borderRadius:20,justifyContent:'center', marginTop:15
    },
    buttonText:{
        color:'white', fontSize:22, fontWeight:'600', textAlign:'center'
    }
})
export default ConsultTable