import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import PostCard from '../components/PostCard';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import Api from '../api/Api'
import socketServices from '../api/socketService';

const ProfileScreen = ({navigation, route}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [posts, setPosts] = useState(null);
  const [likes, setLikes] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [level, setLevel] = useState('0 (Basic Proficiency)');
  const [levelsource, setLevelSource] = useState(require('../assets/Lv0.png'))
  const {userId} = route.params
  const getProfile = async () => {
    const data = await Api.getUserData(userId)
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
    getPosts()
    getpostLiked();
  }, []);

  const getPosts = async()=>{
    socketServices.on(userId+'userPosts',(data) => {
      setPosts(data)
    })
  }
  const getpostLiked = async()=>{
    const data = await Api.filterOnlyPost(auth().currentUser.uid,'Liked')
    setLikes(data)
  }
//   const posts =[
//     {
//       postId: 1,
//       userName: 'Cát Tường',
//       postTime: 'Wed October 28 2023 at 5.14.50 PM',
//       cate: 'Study Resources', 
//       topic: 'Chia sẻ tài liệu TOEIC mới nhất 10/2023',
//       postImg: 'https://www.tailieuielts.com/wp-content/uploads/2020/12/Seperti-apa-sih-TOEICThumbnails-1024x585-1.jpg',   
//     },
// ];
// const likes=[
//     {
//       postId: 2,
//       userName: 'Cát Tường',
//       postTime: 'Wed October 28 2023 at 5.14.50 PM',
//       cate: 'Review Exam Experiences',
//       topic: 'Review đề thi IDP 12/10/2023',
//       postImg: 'https://www.tailieuielts.com/wp-content/uploads/2020/12/Seperti-apa-sih-TOEICThumbnails-1024x585-1.jpg',   
//     }
//   ]
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
      showsVerticalScrollIndicator={false}>
      <View>
        <Image
          style={styles.userImg}
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
            marginLeft: 100,
            marginTop: 100,
            width: 30,
            height: 30,
          }}></Image>
      </View>

      <Text style={[styles.userName]}>
        {profileData
          ? profileData.name
            ? profileData.name
            : profileData.email
          : 'Your name'}
      </Text>
      <Text multiline style={styles.aboutUser}>
        {profileData ? profileData.about || 'No details added.' : ''}
      </Text>
      {(userId==auth().currentUser.uid)?
      <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
        width: 90,
      }}
      onPress={() => {
        navigation.navigate('ChangeProfile', {profileData: profileData});
      }}>
      <Text style={[styles.userBtnTxt, {color: 'black'}]}>
        {'Edit Profile'}
      </Text>
      <Icon
        name={'pen'}
        style={{color: 'black', fontSize: 20, marginLeft: '20%'}}
      />
    </TouchableOpacity>
    : null
      }
      <View style={styles.userBtnWrapper}>
        <View style={styles.userBtn}>
          <Text style={styles.userBtnTxt}>{'Level ' + level}</Text>
        </View>
      </View>

      <View style={styles.userInfoWrapper}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(0);
          }}>
          <View
            style={[
              styles.userInfoItem,
              {
                backgroundColor: selectedTab == 0 ? '#F1A3A2' : '#fff',
              },
            ]}>
            <Text style={styles.userInfoTitle}>{posts?.length}</Text>
            <Text style={styles.userInfoSubTitle}>{'Posts'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(1);
          }}>
          <View
            style={[
              styles.userInfoItem,
              {
                backgroundColor: selectedTab == 1 ? '#A2F3AD' : '#fff',
              },
            ]}>
            <Text style={styles.userInfoTitle}>{likes?.length}</Text>
            <Text style={styles.userInfoSubTitle}>{'Likes'}</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            setSelectedTab(2);
          }}>
          <View
            style={[
              styles.userInfoItem,
              {
                backgroundColor: selectedTab == 1 ? '#FAF7A8' : '#fff',
              },
            ]}>
            <Text style={styles.userInfoTitle}>{1}</Text>
            <Text style={styles.userInfoSubTitle}>{'Tests'}</Text>
          </View>
        </TouchableOpacity> */}
      </View>
      {selectedTab == 0 && (
        <>
          {posts?.map((item, key) => (
            <PostCard
              key={key}
              item={item}
              onCommentPress={() => navigation.navigate('CommentScreen', {postId:item.postId})}
              onGotoPostPress={() => navigation.navigate('PostScreen')}
              editright={true}
            />
          ))}
        </>
      )}
      {selectedTab == 1 && (
        <>
          {likes?.map((item, index) => (
            <PostCard
              key={index}
              item={item}
              onCommentPress={() => navigation.navigate('CommentScreen', {postId:item.postId})}
              onGotoPostPress={() => navigation.navigate('PostScreen')}
              onUserPress={() => {
                navigation.navigate('ProfileScreen', {userId: item.userId});
              }}
              editright={false}
            />
          ))}
        </>
      )}
      {/* {selectedTab == 2 && (
        <>
          {following.map((item, index) => (
            <AvatarComponent
              key={index}
              item={item}
              //onFollowsChange={(followers, following) => setProfileData({ ...profileData, followers: followers, following: following })}
              onUserPress={() =>
                navigation.push('profileScreen', {userId: item})
              }
            />
          ))}
        </>
      )} */}
    </ScrollView>
  );
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 20,
      backgroundColor: '#fff'
  },
  userImg: {
      height: 130,
      width: 130,
      borderRadius: 65,
  },
  userName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
  },
  aboutUser: {
      fontSize: 14,
      fontWeight: '600',
      color: '#666',
      textAlign: 'center',
      marginBottom: 10,
  },
  userBtnWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 10,
  },
  userBtn: {
      width: '50%',
      borderColor: '#66cc00',
      borderWidth: 2,
      borderRadius: 3,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginHorizontal: 5,
      alignItems: 'center',
  },
  userBtnTxt: {
      color: '#66cc00',
      fontSize: 16,
      fontWeight: '500',
  },
  userInfoWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginVertical: 20,
  },
  userInfoItem: {
      justifyContent: 'center',
      width: 110,
      borderRadius: 5,
      paddingVertical: 2,
  },
  userInfoTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#666',
      textAlign: 'center',
  },
  userInfoSubTitle: {
      fontSize: 12,
      color: '#666',
      textAlign: 'center',
  },
  UserImage: {
      width: 60,
      height: 60,
      borderRadius: 20,
      marginLeft: 10,
  },
})