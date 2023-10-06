import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Comment from '../components/Comment';

const comments = [
  {
    text: 'Bình luận 1',
    userName: 'u1',
    replies: [
      { text: 'Phản hồi 1.1', userName: 'u2', replies: [
        { text: 'Phản hồi 1.1.1', userName: 'u4', replies: [
           {text: 'Phản hồi 1.2.1.1', userName: 'u5', replies: []}
        ] }
      ] },
      { text: 'Phản hồi 1.2', userName: 'u3', replies: [] },
    ]
  },
];

const CommentScreen = ({navigation}) => {
  return (
  <View style={styles.container}> 
    <ScrollView>
      <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons 
                  name="arrow-back"
                  size={28}
                  backgroundColor='transparent'
                  color={'#111'}                          
                  />
          </TouchableOpacity>
          <Text style={[styles.headerText, {color: '#111'}]}>Comments</Text>       
        </View>
      {comments.map((comment, index) => (
          <Comment key={index} item={comment} flag={1}/>
        ))}
    </ScrollView>
    <View
        style={[styles.bottomViewContainer, {backgroundColor: '#fff'}]}>
        <TextInput
          // ref={inputRef}
          // value={comment}
          // onChangeText={txt => {
          //   setComment(txt);
          // }}
          placeholder={'Type comment here...'}
          placeholderTextColor={'#666'}
          multiline={true}
          style={[styles.commentInput, {color: '#666'}]}
        />
        <Text
          style={{marginRight: 10, fontSize: 18, fontWeight: '600', color: '#444'}}
          //onPress={() => {handlePostComment()}}
          >
          {'Send'}
        </Text>
      </View>
    </View>
  )
}

export default CommentScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer:{
    flexDirection: 'row',
    padding: 10,
    marginBottom: 5,
    borderBottomColor: '#DFDCDC',
    borderBottomWidth: 1,
    backgroundColor: '#9ACC1C'
  },
  headerText:{
    fontSize: 20,
    marginLeft: 20,
    color: '#333'
  },
  commentInput:{
    width: '80%',
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    padding: 6,
  },
  bottomViewContainer:{
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
})