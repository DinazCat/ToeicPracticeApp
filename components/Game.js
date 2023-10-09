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
const Game=()=>{
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
          Game
        </Text>
      </View>
      <TouchableOpacity style={styles.buttonstyle}>
        <Text style={styles.buttonText}>Select word</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonstyle}>
        <Text style={styles.buttonText}>Match words with meanings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonstyle}>
        <Text style={styles.buttonText}>Listen to seclet</Text>
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
        width:'80%', height:50, alignSelf:'center', backgroundColor:'#00CC66', borderRadius:20,justifyContent:'center', marginTop:15
    },
    buttonText:{
        color:'white', fontSize:22, fontWeight:'600', textAlign:'center'
    }
})
export default Game