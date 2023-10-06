import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';

const PopupMenu = () =>{
    const[visible,setvisible] = useState(false);
    const options = [
      {
        title:"Delete",
        // action:()=>{
        //   deletePost(item.id)
        // },
      },
      {
        title:'Edit',
        // action:()=>{
        //   editPost();
        // },
      }
    ];

    return(
      <View style={{flexDirection:'row'}}>
       {visible && <View style = {styles.popup}>
            {
              options.map((op,i)=>(
                <TouchableOpacity  style={[styles.popupitem,{borderBottomWidth:i===options.length-1?0:1}]} key={i} onPress={op.action}>
                  <Text>{op.title}</Text>
                </TouchableOpacity>
              ))
            }
          </View>}
       <TouchableOpacity style={styles.MenuButton} onPress={()=>setvisible(!visible)}>
            <Icon name={'ellipsis-h'}  color={'#555'}/>
        </TouchableOpacity>
      </View>
    )
  }
const PostCard = ({item, onUserPress, onCommentPress, onGotoPostPress}) => {  
  return (
    <View style={styles.Container}>
        <View style={styles.UserInfoContainer}>
            <TouchableOpacity onPress={onUserPress}>
                <Image style={styles.UserImage} source={{uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}}/>
            </TouchableOpacity>            
            <View style={styles.UserInfoTextContainer}>
                <TouchableOpacity>
                    <Text style={styles.UsernameText}>{item.userName}</Text>
                </TouchableOpacity>                
                <Text style={styles.PostTime}>{item.postTime}</Text>
            </View>
            <View style={{flex:1}}/> 
            <PopupMenu/>        
        </View>

        <Text style={styles.PostTitle}>Topic: {item.topic}</Text>

        <Text style={styles.PostText}>in <Text style={{fontStyle: 'italic', fontWeight: 'bold'}}>{item.cate}</Text></Text>

        <TouchableOpacity onPress={onGotoPostPress}>
          <Text style={[styles.PostText,{textDecorationLine:'underline', color:'#226EE8'}]}>
            Go to post
          </Text>
        </TouchableOpacity>

        <View>
            <Image source={{uri: item.postImg}} style={styles.PostImage}/>
        </View>

        <View style={styles.devider}/>       

        <View style={styles.InteractionContainer}>
            <TouchableOpacity>
                <View style={styles.Interaction}>
                <Image style={styles.iconWrapper} source={require('../assets/heart.png')}/>
                    <Text style={styles.InteractionText}>
                      {/* { item.likes.length === 1 ? '1 Like' :
                      item.likes.length > 1 ? item.likes.length + ' Likes' :
                      'Like'} */}
                      2 Likes
                    </Text>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={onCommentPress}>
                <View style={styles.Interaction}>
                <Image style={styles.iconWrapper} source={require('../assets/comment.png')}/>
                    <Text style={[styles.InteractionText]}>
                      {/* {item.comments.length === 1 ? '1 Comment' :
                      item.comments.length > 1 ? item.comments.length + ' Comments' :
                      'Comment'} */}
                      1 Comment
                    </Text>
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity>
                <View style={styles.Interaction}>
                    <Ionicons name="arrow-redo-outline"size={25} color={'#666'}/>
                    <Text style={[styles.InteractionText, , {color: '#666'}]}>{language === 'vn' ? 'Chia sẻ' : 'Share'}</Text>
                </View>
            </TouchableOpacity> */}
        </View>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({
    Container:{
        backgroundColor: '#f8f8f8',
        width: '100%',
        marginBottom: 10,
        borderRadius: 5,
        padding: 5
    },
    UserInfoContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
    },
    UserImage:{
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    UserInfoTextContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 5,
    },
    UsernameText:{
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Lato-Regular',
    },
    PostTime:{
        fontSize: 12,
        fontFamily: 'Lato-Regular',
        color: '#666',
    },
    PostText:{
        fontSize: 14,
        marginBottom: 10,
    },
    PostTitle:{
        fontSize: 16,
        marginBottom: 10,
        fontWeight:"bold",
        color:"black",
    },
    PostImgsContainer:{
        width: '100%', 
    
    },
    PostImage:{
        margin: 5,
        marginTop:5,
        resizeMode: 'cover',
        borderRadius: 5,
        height: 200
    },
    devider:{
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        width: '92%',
        alignSelf: 'center',
        marginTop: 15,
    },
    InteractionContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
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
    MenuButton:{
        color: 'black', 
        fontSize: 30, 
        padding: 10,
        alignSelf:"center",
      },
      popup:{
        borderRadius:8,
        borderColor:'#333',
        borderWidth:1,
        backgroundColor:'#fff',
        width:62,
        height:65,
        textAlign:'center',
      },
      popupitem:
      {
        borderBottomColor:'black', 
        alignItems:'center', 
        width:60, 
        alignSelf:'center',
        paddingVertical:5
      }
})