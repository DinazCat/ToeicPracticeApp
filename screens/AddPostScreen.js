import { StyleSheet, Text, View, FlatList, TouchableOpacity,Button,TextInput, Image, } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const AddPostScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name={'arrow-left'} style={{color: '#222', fontSize: 25, padding: 5, marginHorizontal: 5}} />
          </TouchableOpacity>

          <Text style={{fontSize: 20, flex: 1, marginLeft: 5, color: '#222', fontWeight: 'bold'}}>
            Create a post
          </Text>
          {/* {uploading ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>{transferred} % completed! </Text>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : ( */}
            <Button
              title={'Post'}
              color={'#333'}
              //color={allowPost() == true ? '#FFCC00' : '#BBBBBB'}
              //onPress={submitPost}
            />

          {/* )} */}

        <View style={{marginRight: 5}} />
        </View>

        <View
          style={{
            height: 60,
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}}
            style={styles.UserImage}
          />
          <Text
            style={styles.UserName}>
            Cát Tường
          </Text>
        </View>

        <TextInput
          placeholder="Topic here..."
          multiline={true}
          style={[styles.Input, {fontWeight: '700'}]}
          placeholderTextColor={'#555'}/>
        <View>
          <TextInput
            placeholder="Write something here..."
            multiline={true}
            style={styles.Input}
            placeholderTextColor='#555'
            height={250}
            //onChangeText={TextChange}
          />
          {/* {image == null ? ( */}
            {/* <View>
              <Image
                source={{uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}}
                style={{
                  width: 300,
                  height: 200,
                  borderRadius: 15,
                  alignSelf: 'center',
                  marginTop: 150,
                }}
              />
              <Text style={{alignSelf: 'center'}}>
                Thêm hình ảnh mà bạn thích
              </Text>
            </View> */}
          {/* ) : null} */}
          {/* {image!=null? <Image
            source={{uri: image}}
            style={{height: 300, width: 400, marginTop: 70}}
            resizeMode="contain"
          />:null} */}
        </View>

        <View style={styles.IconContainer}>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name={'caret-down'}
              style={styles.IconWrapper}
            />
            <Text style={{color: '#222', fontSize: 15}}>Post Category</Text>
          </TouchableOpacity>
          {/* Q&A, Study Resources, Exam Analysis, Preparation Experiences, Review Exam Experiences, Share Your Results, Events/News, Others */}
          <View style={{flex: 1}}/>
          <TouchableOpacity>
            <Icon
              name={'images'}
              style={styles.IconWrapper}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name={'camera'}
              style={styles.IconWrapper}
              light
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name={'paperclip'}
              style={styles.IconWrapper}
            />
          </TouchableOpacity>         
        </View>
      </View>
  )
}

export default AddPostScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer:{
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9ACC1C',
  },
  UserImage: {
    width: 46,
    height: 46,
    borderRadius: 30,
    marginLeft: 5,
    alignSelf: 'center',
  },
  UserName:{
    marginLeft: 5,
    fontSize: 17,
    fontWeight: '700',
    alignSelf: 'center',
    color: '#444'
  },
  Input: {
    fontSize: 16, 
    marginLeft: 3,
    borderColor: '#DDD',
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    padding: 5,
    textAlignVertical: 'top'
  },
  IconContainer: {
    height: 40,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#9ACC1C',
    marginTop: 10
  },
  IconWrapper:{
    marginHorizontal: 5,
    color: '#222',
    fontSize: 28,
    alignSelf: 'center',
  },
  devider:{
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    width: '98%',
    alignSelf: 'center',
    margin: 5,
  },
  
})
