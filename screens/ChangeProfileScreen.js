import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, TextInput, Alert, Image, ScrollView } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FormButton from '../components/FormButton';

const ChangeProfileScreen = ({navigation}) => {
  return (
    <View style={[styles.container,]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons 
                name="arrow-back"
                size={28}
                backgroundColor='transparent'
                color={'#222'}                          
                />
        </TouchableOpacity>     
      </View>
      <ScrollView>
        <View style={{alignItems: 'center'}}>     
          <TouchableOpacity>
            <View>
              <ImageBackground
                source={{
                  uri: 
                      'https://cdn-icons-png.flaticon.com/512/1144/1144811.png'        
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 50}}>
                <View
                  style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={35}
                    color="#fff"
                    style={styles.cameraIcon}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginVertical: 10, fontSize: 20, fontWeight: 'bold', color: '#222'}}>
            {'Cát Tường'}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={'#555'} size={23} />
          <TextInput
            placeholder={'Name'}
            placeholderTextColor={'#555'}
            //value={userData ? userData.name : ''}
            //onChangeText={(txt) => setUserData({...userData, name: txt})}
            autoCorrect={false}
            style={[styles.textInput,]}
          />
        </View>
        <View style={styles.action}>
          <Ionicons name="clipboard-outline" color={'#222'} size={23} />
          <TextInput
            multiline
            numberOfLines={3}
            placeholder={'About Me'}
            placeholderTextColor={'#555'}
            //value={'Nothing added.'}
            //onChangeText={(txt) => setUserData({...userData, about: txt})}
            autoCorrect={true}
            style={[styles.textInput, {height: 40, color: '#555'}]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={'#555'} size={21} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={'#555'}
            keyboardType='email-address'
            //value={userData ? userData.email : ''}
            //onChangeText={(txt) => setUserData({...userData, email: txt})}
            autoCorrect={false}
            style={[styles.textInput, {height: 40, color: '#555'}]}
          />
        </View>
        
        <View style={styles.action}>
          <Image
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/1412/1412443.png'}}
            style={{width: 28, height: 28}}
          />
          <TextInput
            placeholder={'Age'}
            keyboardType = 'number-pad'
            placeholderTextColor={'#555'}
            autoCorrect={false}
            //value={age}
            //onChangeText={age => {if(parseInt(age)>0||age=='') setAge(age.replace(/[^0-9]/g, ''))}} 
            style={[styles.textInput, {color: ''}]}
          />
        </View>
        <View style={{width: '40%', flexDirection:'row'}}>
          <View width={'70%'}></View>
          <FormButton title={'Update'}/> 
        </View>
        </ScrollView>
    </View>
  )
}

export default ChangeProfileScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  cameraIcon: {
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 3,
    alignItems: 'center'
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput:{
    color: '#333',
    paddingLeft: 10,
    fontSize: 15
  },
})