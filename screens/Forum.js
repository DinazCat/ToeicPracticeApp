import { StyleSheet, Text, View, TouchableOpacity, Image , FlatList} from 'react-native'
import React, {useEffect, useState} from 'react';
import PostCard from '../components/PostCard';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import Api from '../api/Api'
import socketServices from '../api/socketService';

const Forum = ({navigation}) => {
  const [profileData, setProfileData] = useState(null);
  const [level, setLevel] = useState('0 (Basic Proficiency)');
  const [levelsource, setLevelSource] = useState(require('../assets/Lv0.png'))
  const [posts, setPosts] = useState(null);
  const [mark, setmark] = useState(false);
  const getProfile = async () => {
    const data = await Api.getUserData(auth().currentUser.uid)
    setProfileData(data)
    if(data.currentScore){
      if(data.currentScore>=0 && data.currentScore <= 250){
        setLevel('0 (Basic Proficiency)')
        setLevelSource(require('../assets/Lv0.png'))
      }
      else if(data.currentScore <= 400){
        setLevel('1 (Elementary Proficiency)')
        setLevelSource(require('../assets/Lv1.png'))
      }
      else if(data.currentScore <= 600){
        setLevel('2 (Elementary Proficiency Plus)')
        setLevelSource(require('../assets/Lv2.png'))
      }
      else if( data.currentScore <= 780){
        setLevel('3 (Limited Working Proficiency)')
        setLevelSource(require('../assets/Lv3.png'))
      }
      else if(data.currentScore <= 900){
        setLevel('4 (Working Proficiency Plus)')
        setLevelSource(require('../assets/Lv4.png'))
      }
      else if(data.currentScore <= 990){
        setLevel('5 (International Professional Proficiency)')
        setLevelSource(require('../assets/Lv5.png'))
      }
    }
  };
  useEffect(() => {
    socketServices.initializeSocket()
    getProfile();
    getPosts();
    getMark()
  }, []);
  const getPosts = async()=>{
    socketServices.on('mainPosts',(data) => {
      setPosts(data)
    })
  }
  const getMark= async()=>
  {
    socketServices.on(auth().currentUser.uid+'sign',(data) => {
      setmark(true)
    })
    
  }
  // const posts =[
  //   {
  //     postId: 1,
  //     userName: 'Cát Tường',
  //     postTime: 'Wed October 28 2023 at 5.14.50 PM',
  //     cate: 'Study Resources', 
  //     topic: 'Chia sẻ tài liệu TOEIC mới nhất 10/2023',
  //     postImg: 'https://www.tailieuielts.com/wp-content/uploads/2020/12/Seperti-apa-sih-TOEICThumbnails-1024x585-1.jpg',   
  //   },
  //   {
  //     postId: 2,
  //     userName: 'Cát Tường',
  //     postTime: 'Wed October 28 2023 at 5.14.50 PM',
  //     cate: 'Review Exam Experiences',
  //     topic: 'Review đề thi IDP 12/10/2023',
  //     postImg: 'https://www.tailieuielts.com/wp-content/uploads/2020/12/Seperti-apa-sih-TOEICThumbnails-1024x585-1.jpg',   
  //   }
  // ]
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TOEIC Share Forum</Text>
        <View style={{flex: 1}} />
        <TouchableOpacity onPress={() => navigation.navigate('SearchPost')}>
          <Ionicons name={'search-outline'} style={styles.IconButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FilterSide')}>
          <Ionicons name={'filter-outline'} style={styles.IconButton} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setmark(false)
            navigation.push('NotificationScreen');
          }}>
          <Ionicons name={'notifications-outline'} style={styles.IconButton} />
          {(mark)&&<FontAwesome name="circle" style={styles.smallcircle}/>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
          <Ionicons name={'settings-outline'} style={styles.IconButton} />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.devider}/> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 5,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', {userId: auth().currentUser.uid})}>
          <Image
            style={styles.UserImage}
            source={{
              uri: profileData
                ? profileData.userImg
                  ? profileData.userImg
                  : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
            }}
          />
          <Image
            source={levelsource}
            resizeMode="contain"
            style={{
              position: 'absolute',
              marginLeft: 30,
              marginTop: 33,
              width: 15,
              height: 15,
            }}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('AddPost')}>
          <View style={styles.addPostTextContainer}>
            <Text>{'Share something helpful for other TOEIC learners...'}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        renderItem={({item,index}) => (
          <PostCard
            item={item}
            onUserPress={() => {
              navigation.navigate('ProfileScreen', {userId: item.userId});
            }}
            onCommentPress={() => navigation.navigate('CommentScreen',{postId:item.postId,topic:item.topic, user:item.userId})}
            onGotoPostPress={() => navigation.navigate('PostScreen',{postId: posts[index].postId,sign:'nocmt'})}
            editright={false}
          />
        )}
        keyExtractor={item => item.postId}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
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
  },
  smallcircle:{
    position:'absolute', 
    color:'#3300FF', 
    marginLeft:15, 
    marginVertical:10
  }
})