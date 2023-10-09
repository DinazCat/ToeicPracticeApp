import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
const VocabLessonCard = ({display}) => {
  return (
    <View>
      <TouchableOpacity style={styles.boxstyle}>
        <Image
          source={{
            uri: display.photo,
          }}
          style={{width: 100, height: 100}}
        />
        <View style={{flexDirection: 'column'}}>
        <Text style={[styles.TextFont, {fontWeight: '500', color:PRIMARY_COLOR}]}>
              {display.Name}
            </Text>
            <Text style={[styles.TextFont, {fontWeight: '400'}]}>
            Number of vocabulary: 12
            </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  boxstyle: {
    flexDirection: 'row',
    width: '96%',
    backgroundColor: card_color,
    alignSelf: 'center',
    marginTop: 5,
    height: 120,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 15,
  },
  TextFont: {
    fontSize: 18,
    marginLeft: 5,
    color: 'black',
  },
});
export default VocabLessonCard;
