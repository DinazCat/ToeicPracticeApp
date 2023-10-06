import { StyleSheet, Text, View, TouchableOpacity, Image , FlatList} from 'react-native'
import React from 'react'
import PostCard from '../components/PostCard';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Forum = ({navigation}) => {
  const posts =[
    {
      postId: 1,
      userName: 'Cát Tường',
      postTime: 'Wed October 28 2023 at 5.14.50 PM',
      cate: 'Study Resources', 
      topic: 'Chia sẻ tài liệu TOEIC mới nhất 10/2023',
      postImg: 'https://www.tailieuielts.com/wp-content/uploads/2020/12/Seperti-apa-sih-TOEICThumbnails-1024x585-1.jpg',   
    },
    {
      postId: 2,
      userName: 'Cát Tường',
      postTime: 'Wed October 28 2023 at 5.14.50 PM',
      cate: 'Review Exam Experiences',
      topic: 'Review đề thi IDP 12/10/2023',
      postImg: 'https://www.tailieuielts.com/wp-content/uploads/2020/12/Seperti-apa-sih-TOEICThumbnails-1024x585-1.jpg',   
    }
  ]
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TOEIC Share Forum</Text>
        <View style={{flex:1}}/>
        <TouchableOpacity onPress={() => navigation.navigate('SearchPost')}>
          <Ionicons name={'search-outline'} style={styles.IconButton}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FilterSide')}>
          <Ionicons name={'filter-outline'} style={styles.IconButton}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.push("NotificationScreen")}}>
          <Ionicons name={'notifications-outline'} style={styles.IconButton}/>     
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
          <Ionicons name={'settings-outline'} style={styles.IconButton}/>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.devider}/> */}
      <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 5}}>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
            <Image style={styles.UserImage} source={{uri:'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push('AddPost')}>
            <View style={styles.addPostTextContainer}>
              <Text>
              {'Share something helpful for other TOEIC learners...'}
              </Text>
            </View>          
          </TouchableOpacity>
      </View>
      <FlatList
          data={posts}
          renderItem={({item}) => (
            <PostCard
              item={item}
              onUserPress={() => {navigation.navigate('profileScreen', {userId: item.userId})}}
              onCommentPress={() => navigation.navigate('CommentScreen')}
              onGotoPostPress={() => navigation.navigate('PostScreen')}
              editright={false}
            />
          )}
          keyExtractor={(item) => item.postId}
          showsVerticalScrollIndicator={false}           
        />  
    </View>
  )
}

export default Forum;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'column',
  },
  header:{
    flexDirection:'row', 
    backgroundColor: '#9ACC1C', 
    alignItems: 'center', 
    padding: 10
  },
  UserImage:{
    width: 40,
    height: 40,
    borderRadius: 25,
    marginVertical: 10,
    zIndex: 1,
  },
  IconButton:{
    color: 'black', 
    fontSize: 25, 
    padding: 5
  },
  addPostTextContainer:{
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#666',
    marginLeft: 10,
    padding: 6,
    alignItems: 'center'
  },
  devider:{
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    width: '98%',
    alignSelf: 'center',
    margin: 5,
  },
  title:{
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 5,
  }
})