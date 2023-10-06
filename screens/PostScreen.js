import { StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native'
import React from 'react'

const PostScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <View style={styles.UserInfoContainer}>
            <TouchableOpacity>
              <Image
                style={styles.UserImage}
                source={{
                  uri:'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
                }}
              />
            </TouchableOpacity>
            <View style={styles.UserInfoTextContainer}>
              <TouchableOpacity>
                <Text
                  style={[
                    styles.UsernameText,
                  ]}>
                  Cát Tường
                </Text>
              </TouchableOpacity>
              <Text style={styles.PostTime}>Wed October 28 2023 at 5.14.50 PM</Text>
              <Text style={styles.PostTime}>in <Text style={{fontStyle: 'italic', fontWeight: 'bold'}}>Study Resources</Text></Text>
            </View>
          </View>
        </View>
        <View style={styles.TextContainer}>
            <Text
                style={[
                styles.TopicText,
                ]}>
                Chia sẻ tài liệu TOEIC mới nhất 10/2023
            </Text>
            <Text
                style={[
                styles.ContentText,
                ]}>
                <Text style={[styles.ContentText, {fontWeight: '700'}]}>600 Essential Words For The TOEIC {'\n'}</Text>
                Thông qua cuốn tài liệu luyện thi này sẽ giúp bạn nắm vững những nền tảng tiếng Anh cơ bản để hiểu hết những ngữ cảnh. Đặc biệt là những ngữ cảnh thường gặp trong một bài thi quốc tế TOEIC.{'\n'}           
                Những từ vựng này không phải là từ chuyên môn, mà là những từ vựng thông dụng có thể dùng được trong rất nhiều ngữ cảnh khác nhau. Với cuốn sách này các bạn có thể khiến cho vốn từ của mình ngày càng trở nên phong phú và có thể áp dụng nó trong bất kỳ hoàn cảnh nào.
            </Text>
            <Image source={{uri: 'https://www.tailieuielts.com/wp-content/uploads/2020/12/Seperti-apa-sih-TOEICThumbnails-1024x585-1.jpg'}} style={styles.PostImage}/>
        </View>
        <View style={styles.FileWrapper}>
            <Image style={styles.FileImage}
                source={{
                  uri:'https://cdn4.iconfinder.com/data/icons/file-extensions-1/64/pdfs-512.png',
                }}/>
            <Text>600-Essential-Words-For-The-TOEIC-PDF.pdf</Text>
        </View>
        <View style={styles.devider}/>
        <View style={styles.InteractionContainer}>
            <TouchableOpacity>
                <View style={styles.Interaction}>
                <Image style={styles.iconWrapper} source={require('../assets/heart.png')}/>
                    <Text style={styles.InteractionText}>
                      2 Likes
                    </Text>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity>
                <View style={styles.Interaction}>
                <Image style={styles.iconWrapper} source={require('../assets/comment.png')}/>
                    <Text style={[styles.InteractionText]}>
                      1 Comment
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default PostScreen

const styles = StyleSheet.create({
  container:{
      width: '100%',
      marginBottom: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
      padding: 5,
      flex: 1,
  },
  headerContainer:{
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#DDD',
  },
  UserInfoContainer:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 5,      
  },
  UserImage:{
      width: 46,
      height: 46,
      borderRadius: 23,
  },
  UserInfoTextContainer:{
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: 5,
  },
  UsernameText:{
      fontSize: 16,
      fontWeight: 'bold',
      color: '#444'
  },
  PostTime:{
      fontSize: 13,
      color:"white",
      color: '#888',
  },
  devider:{
      borderBottomColor: '#DDDDDD',
      borderBottomWidth: 1,
      width: '92%',
      alignSelf: 'center',
      marginTop: 10,
  },
  TextContainer: {
      backgroundColor: '#f8f8f8',
      borderRadius: 5,
      margin: 5,
      paddingHorizontal: 5
  },
  TopicText:{
      fontSize: 20,
      fontWeight: 'bold',
      color: '#666',
      marginTop: 5
  },
  ContentText: {
      fontSize: 16,
      textAlign: 'justify',
  },
  FileWrapper:{
      backgroundColor: '#f8f8f8',
      borderRadius: 5,
      margin: 5,
      padding: 5,
      flexDirection: 'row'
  },
  FileImage:{
      height: 20,
      width: 20,
      marginRight: 5
  },
  PostImage:{
      margin: 5,
      marginTop:5,
      resizeMode: 'contain',
      borderRadius: 5,
      height: 200
  },
  InteractionContainer:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
  },
  Interaction:{
      flexDirection: 'row',
      justifyContent: 'center',
      borderRadius: 5,
      paddingVertical: 2,
      paddingHorizontal: 5,
  },
  InteractionText:{
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: 5,
      marginLeft: 5,
      color: '#555'
  },
  iconWrapper: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
})