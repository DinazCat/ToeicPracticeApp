import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import PostCard from '../components/PostCard';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ProfileScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const posts =[
    {
      postId: 1,
      userName: 'Cát Tường',
      postTime: 'Wed October 28 2023 at 5.14.50 PM',
      cate: 'Study Resources', 
      topic: 'Chia sẻ tài liệu TOEIC mới nhất 10/2023',
      postImg: 'https://www.tailieuielts.com/wp-content/uploads/2020/12/Seperti-apa-sih-TOEICThumbnails-1024x585-1.jpg',   
    },
];
const likes=[
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
      showsVerticalScrollIndicator={false}>
      <Image
        style={styles.userImg}
        source={{
          uri:  'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
        }}
      />
      <Text
        style={[
          styles.userName,
        ]}>
        {'Cát Tường'}
      </Text>
      <Text multiline style={styles.aboutUser}>
        {'No details added.'}
      </Text>
      <View style={styles.userBtnWrapper}>       
            <View style={styles.userBtn}>
              <Text style={styles.userBtnTxt}>
                {'Level 1 (Elementary)'}
              </Text>
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
                backgroundColor:
                  selectedTab == 0
                    ? '#F1A3A2'
                    : '#fff',
              },
            ]}>
            <Text style={styles.userInfoTitle}>1</Text>
            <Text style={styles.userInfoSubTitle}>
              {'Posts'}
            </Text>
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
                backgroundColor:
                  selectedTab == 1
                    ? '#A2F3AD'
                    : '#fff',
              },
            ]}>
            <Text style={styles.userInfoTitle}>{1}</Text>
            <Text style={styles.userInfoSubTitle}>
              {'Likes'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(2);
          }}>
          <View
            style={[
              styles.userInfoItem,
              {
                backgroundColor:
                  selectedTab == 1
                    ? '#FAF7A8'
                    : '#fff',
              },
            ]}>
            <Text style={styles.userInfoTitle}>{1}</Text>
            <Text style={styles.userInfoSubTitle}>
              {'Tests'}
            </Text>
          </View>
        </TouchableOpacity>
      
      </View>
      {selectedTab == 0 && (
        <>
          {posts.map((item, key) => (
            <PostCard
              key={key}
              item={item}
              onCommentPress={() =>
                navigation.navigate('CommentScreen', {
                })
              }
              onGotoPostPress={() => navigation.navigate('PostScreen')}
              editright={true}
            />
          ))}
        </>
      )}
      {selectedTab == 1 && (
        <>
          {likes.map((item, index) => (
            <PostCard
              key={index}
              item={item}
              onCommentPress={() =>
                navigation.navigate('CommentScreen', {
                })
              }
              onGotoPostPress={() => navigation.navigate('PostScreen')}
              onUserPress={() => {navigation.navigate('ProfileScreen', {userId: item.userId})}}
            />
          ))}
        </>
      )}
      {selectedTab == 2 && (
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
      )}

    </ScrollView>
  )
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