import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Progress from 'react-native-progress';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
const InPartCard = () => {
  const [number, setnumber] = useState('5');
  const [isopen, setopen] = useState(false);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg8.png')}
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
            Photographs
          </Text>
        </View>

        <View
          style={{
            height: 100,
            width: '96%',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: card_color,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#E8E8E8',
          }}>
          <FontAwesome name="image"  size={50} style={{color:PRIMARY_COLOR}} />
          <View style={{flexDirection: 'column'}}>
            <Text style={[styles.TextFont, {fontWeight: '300'}]}>
              Sentences completed:{' '}
              <Text style={[styles.TextFont, {fontWeight: '400'}]}>0</Text>
            </Text>
            <Text style={[styles.TextFont, {fontWeight: '300'}]}>
              Correct:{' '}
              <Text style={[styles.TextFont, {fontWeight: '400'}]}>0</Text>
            </Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.TextFont, {fontWeight: '300', marginRight:5}]}>Progress:</Text>
              <Progress.Bar progress={0.3} width={120} height={10} style={{height:10,}} color={PRIMARY_COLOR}/>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 250,
            width: '90%',
            marginTop: 10,
            borderRadius: 20,
            backgroundColor: card_color,
            alignSelf: 'center',
          }}>
          <ScrollView>
            <Text
              style={{
                textDecorationLine: 'underline',
                fontSize: 18,
                color: PRIMARY_COLOR,
                fontWeight: '600',
                marginLeft: 10,
                marginTop: 10,
              }}>
              Question:
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: 'black',
                fontWeight: '400',
                marginLeft: 10,
              }}>
              For each question you...
            </Text>
          </ScrollView>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
            height: 80,
          }}>
          <Text style={{color: 'black', fontSize: 20, marginTop: 33}}>
            Number of questions:
          </Text>
          <DropDownPicker
            items={[
              {label: '5', value: '5'},
              {label: '10', value: '10'},
              {label: '15', value: '15'},
              {label: '20', value: '20'},
            ]}
            open={isopen}
            setOpen={() => setopen(!isopen)}
            value={number}
            containerStyle={{
              height: 10,
              width: 100,
              marginLeft: 10,
              alignSelf: 'center',
            }}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            setValue={item => setnumber(item)}
            maxHeight={100}
            zIndex={1}
          />
        </View>
        <TouchableOpacity style={[AppStyle.button.button2,{marginTop:70, zIndex:0}]}>
            <Text style={AppStyle.button.button2_Text}>Begin</Text>
        </TouchableOpacity>
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
    color: 'black',
  },

});
export default InPartCard;
