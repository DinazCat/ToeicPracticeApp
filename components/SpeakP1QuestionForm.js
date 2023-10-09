import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Slider from '@react-native-community/slider';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
  const SpeakP1QuestionForm = () => {
    return (
      <View style={styles.container}>
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
            Question 1
          </Text>
          <FontAwesome
            name="heart"
            color="white"
            size={20}
            style={{marginLeft: '3%'}}
          />
          <View style={{flex: 1}} />
          <TouchableOpacity>
          <Text
            style={{
              textAlign: 'left',
              color: 'white',
              fontSize: 20,
              marginRight: '5%',
              textDecorationLine: 'underline',
            }}>
            Explain
          </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.boxstyle}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{color:'black', fontWeight:'500', fontSize:20,textAlign:'left',marginTop:'5%', marginLeft:"5%"}}>Reading the document</Text>
            <TouchableOpacity style={{marginTop: '5%', marginRight:'5%'}}>
        <Icon name={'volume-down'} style={{color: PRIMARY_COLOR, fontSize: 30}} />
        </TouchableOpacity>
            </View>
            <View style={{ width:'90%', alignSelf:'center', height:1, backgroundColor:'black',marginTop:'3%'}}/>
            <ScrollView>
            <Text style={{color:'black', fontSize:18,textAlign:'left', marginLeft:'5%', marginRight:'5%', marginTop:'3%', marginBottom:'3%'}}>
        You don't need to spend all of your hard earned money on bakery bread. Making your own bread at home is easy with the new Double Duty Dough Mixer by Berring. Unlike other bread machines that can be difficult to clean and store, the Double Duty Dough Mixer breaks down into five parts that can go directly into your dishwasher. This stainless steel appliance will mix dough for you in a fraction of the time it takes to knead dough by hand. The automated delay feature at the beginning of the mix cycle gives your ingredients time to reach room temperature, ensuring that your breads will rise as high as bakery bread. We guarantee that the accompanying Berring Best Breads recipe book will be a family favourite.
        </Text>
            </ScrollView>
        </View>
        <View
        style={{
          height: 50,
          flexDirection: 'row',
          marginTop:'10%',
          alignItems: 'center',
        }}>
            <Text style={{fontSize:20, fontWeight:'400', color:'black',marginLeft:"5%"}}>Your voice:</Text>
        <TouchableOpacity style={{marginLeft:"5%"}}>
          <FontAwesome name="play-circle" color="black" size={20} />
        </TouchableOpacity>
        <Slider
          style={{width: 140, height: 40, marginLeft:"3%"}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#990000"
        />
        <Text style={styles.TimeFont}>00:00</Text>
      </View>
        <TouchableOpacity style={{ alignSelf:'center', borderRadius:30, marginTop:'10%', borderWidth:3, borderColor:PRIMARY_COLOR, height:60, width:60, alignItems:'center', justifyContent:'center'}}>
        <Icon name={'microphone-alt'} style={{color: PRIMARY_COLOR, fontSize: 30}} />
        </TouchableOpacity>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
      height: 1000,
    },
    boxstyle:{
      flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:"5%", height:"60%",borderWidth: 1,
      borderColor: '#CFCFCF', borderRadius:15,
    },
    TimeFont: {
      textAlign: 'left',
      color: 'black',
      fontSize: 17,
    },
  
  });
  export default SpeakP1QuestionForm;
  