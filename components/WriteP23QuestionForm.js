import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput
  } from 'react-native';
  import React from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Slider from '@react-native-community/slider';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
  const  WriteP23QuestionForm = () => {
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
        <Text style={{color:'black', fontWeight:'500', fontSize:20,textAlign:'left',marginTop:'5%', marginLeft:"5%"}}>Response the email</Text>
        <View style={styles.boxstyle}>
            <ScrollView>
            <Text style={{color:'black', fontSize:18,textAlign:'left', marginLeft:'5%', marginRight:'5%', marginTop:'3%', marginBottom:'3%'}}>To: Homeowner{'\n'}
From: Taryn Kent {'\n'}
Subject: Your home {'\n'}
Sent: January 7
{'\n'}
Hello. I've been looking at the photo gallery of your online home buyer's ad. Congratulations on trying to sell your home without a real estate agent. It is difficult (we have done it twice) but is worth the effort if you find a reasonable buyer. My sister is interested in buying a home in your region. Your home could be ideal if you are willing to negotiate the price. Your asking price is about $10, 000 above her budget. She also wants to live near an elementary school and a bus route. I'm not sure if your home is near these amenities. Could you let me know about these details? Most importantly, are you open to negotiation on the price? Please let me know when the house would be available for viewing.

Thank you. {'\n'}
Sincerely, {'\n'}
Taryn Kent {'\n'}
{'\n'}
<Text style={{fontWeight:'500'}}>Directions:</Text>Respond to the email as if you are trying to sell your house privately. Answer the questions and provide at least TWO details about the neighbourhood and ONE reason why you can or can't negotiate the price.
</Text>
            </ScrollView>
        </View>
        
        <View style={{height:'35%', width:'90%', alignSelf:'center', backgroundColor:'white', borderColor:PRIMARY_COLOR, borderWidth:2, marginTop:'3%', borderRadius:15}}>
        <TextInput
             multiline={true}
             style={{fontSize: 16, marginLeft: 3, color:'black',borderRadius:15}}
             placeholder="Write your answer here"
             placeholderTextColor={'rgba(0,0,0,0.8)'}
           />
        </View>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
      height: 1000,
    },
  
    TimeFont: {
      textAlign: 'left',
      color: 'black',
      fontSize: 17,
    },
    boxstyle:{
        flexDirection:'column',width:'90%', backgroundColor:card_color, alignSelf:'center', marginTop:"5%", height:"40%",borderWidth: 1,
        borderColor: '#CFCFCF', borderRadius:15,
      },
   
  });
  export default WriteP23QuestionForm;
  