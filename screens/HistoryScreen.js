import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    FlatList
  } from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
import * as Progress from 'react-native-progress';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import QuestionScreen from '../screens/QuestionScreen';
import Api from '../api/Api'
import SmallHistoryCard from '../components/SmallHistoryCard';
const HistoryScreen = ({navigation,route}) => {
  const {list} = route.params
  return (
      <View style={styles.container}>
          <ImageBackground source={require('../assets/bg8.png')} style={{ flex: 1, resizeMode: 'cover' }}>
          <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity style={{marginLeft: '2%'}} onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'left',
            color: 'white',
            fontSize: 20,
            marginLeft: 15,
          }}>
          Practice History
        </Text>
      </View>
        <FlatList
          data={list}
          renderItem={({item, index}) => {
            if (item.History) {
              return (
                <SmallHistoryCard
                  display={item}
                  click={() => {
                    navigation.push('CompleteCard', {
                      quantity: item.Quantity,
                      answer: item.History,
                      sign: 'Home',
                      part: item.Part,
                      questionL: item.History,
                      partName: item.PartName,
                      DetailQty: item.DetailQty,
                    });
                  }}
                />
              );
            } else {
              return (
                <SmallHistoryCard
                  display={item}
                  click={() => {
                    navigation.push('CompleteCard2', {
                      quantity: item.Quantity,
                      sign: 'Home',
                      part: item.Part,
                      questionL: item.result,
                      partName: item.PartName,
                    });
                  }}
                />
              );
            }
          }}/>
        </ImageBackground>     
        
      </View>
    )
  }
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF", 
      flex:1,
      height:1000
    },
    upzone: {
        height:'8%',
        backgroundColor:'#990000',
        justifyContent: 'center',
        alignItems: 'center',
    },})
export default HistoryScreen