import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
const InVocabLessonCard = () => {
  
  function Card(){
    return(
      <View style={styles.boxstyle}>
        <TouchableOpacity style={{marginLeft: '5%'}}>
        <Icon name={'volume-down'} style={{color: 'black', fontSize: 30}} />
        </TouchableOpacity>
          <View style={{flexDirection: 'column',marginLeft:'10%'}}>
            <Text
              style={[styles.TextFont, {fontWeight: '700', color: PRIMARY_COLOR,}]}>
              abide by
            </Text>
            <Text
                style={[styles.TextFont, {fontWeight: '400', color: 'black'}]}>
                /ə'bide/{'  v'}
              </Text>
            <Text style={[styles.TextFont, {fontWeight: '400', color: 'black'}]}>tuân theo</Text>
          </View>
          <View style={{flex:1}}/>
          <TouchableOpacity style={{marginRight:'3%'}}>
          <Icon name={'bars'} style={{color: 'black', fontSize: 20,}} />
          </TouchableOpacity>
        </View>
    )
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg1.png')}
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
            Lesson 1: Contracts
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: '3%',
            marginBottom:'5%'
          }}>
          <TouchableOpacity style={styles.buttonStyle}>
            <FontAwesome name="gamepad" color="black" size={30} />
            <Text style={styles.TextFont}>Game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
            <Icon name={'clock'} style={{color: 'black', fontSize: 30}} />
            <Text style={styles.TextFont}>Remind</Text>
          </TouchableOpacity>
        </View>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  TextFont: {
    fontSize: 18,
    marginLeft: 5,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: PRIMARY_COLOR,
    width: 150,
    justifyContent: 'center',
  },
  boxstyle: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: card_color,
    alignSelf: 'center',
    marginTop: 5,
    height: 90,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 15,
  },
});
export default InVocabLessonCard;
