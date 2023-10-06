import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList} from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostCard from '../components/PostCard';

const SearchPostScreen = ({navigation}) => {
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
       <View style={{flexDirection:'row'}}>
       <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Ionicons name={'arrow-back-outline'} style={styles.IconButton}/>        
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            placeholder="Enter the topic, content..."
            placeholderTextColor={'#555'}/>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name={'search-outline'} style={styles.IconButton}/>        
          </TouchableOpacity>
        </View>    
      </View>
      <View style={styles.devider}/>
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

export default SearchPostScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection:'column',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: '#555',
    borderRadius: 25,
    borderWidth: 1,
    width: '90%',
    height: 45,
  },
  input:{
    fontSize: 16,
    width: '88%'
  },
  IconButton:{
    color: '#555', 
    fontSize: 25, 
    padding: 5,
    marginTop: 4
    //marginLeft: 5
  },
  devider:{
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    width: '98%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 5
  },
})