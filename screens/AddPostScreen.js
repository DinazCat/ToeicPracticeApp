import { StyleSheet, Text, View, FlatList, TouchableOpacity,Button,TextInput, Image, ScrollView,Modal, Animated} from 'react-native'
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import Api from '../api/Api'
import ImagePicker from 'react-native-image-crop-picker';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import axios from 'axios';
import VideoPlayer from 'react-native-video-player'

const AddPostScreen = ({navigation}) => {
  const [profileData, setProfileData] = useState(null);
  const [OpenModal, setOpenModal] = useState(false);
  const [OpenModal2, setOpenModal2] = useState(false);
  const [image,setimage] = useState([]);
  const [hashtag, sethashtag] = useState(null);
  const [topic, setTopic] = useState('');
  const [text, setText] = useState('');
  const [level, setLevel] = useState('0 (Basic Proficiency)');
  const [levelsource, setLevelSource] = useState(require('../assets/Lv0.png'))
  const getProfile = async () => {
    const data = await Api.getUserData(auth().currentUser.uid)
    setProfileData(data)
    if(data.currentScore){
      if(data.currentScore>=0 && data.currentScore <= 250){
        setLevel('0 (Basic Proficiency)')
        require('../assets/Lv0.png')
      }
      else if(data.currentScore <= 400){
        setLevel('1 (Elementary Proficiency)')
        require('../assets/Lv1.png')
      }
      else if(data.currentScore <= 600){
        setLevel('2 (Elementary Proficiency Plus)')
        setLevelSource(require('../assets/Lv2.png'))
      }
      else if( data.currentScore <= 780){
        setLevel('3 (Limited Working Proficiency)')
        require('../assets/Lv3.png')
      }
      else if(data.currentScore <= 900){
        setLevel('4 (Working Proficiency Plus)')
        require('../assets/Lv4.png')
      }
      else if(data.currentScore <= 990){
        setLevel('5 (International Professional Proficiency)')
        require('../assets/Lv5.png')
      }
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  const pickImageAsync = async () => {
    setOpenModal(false);
    setOpenModal2(false)
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(img => {
      let image2 = image.slice();
      image2.push({
        uri:img.path,
        type:'img'
      });
      setimage(image2);
    });
  };
  const takePhotoFromCamera = () => {
    setOpenModal(false);
    setOpenModal2(false)
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((img) => {
      let image2 = image.slice();
      image2.push({
        uri:img.path,
        type:'img'
      });
      setimage(image2);
    });
  };
  const videoFromCamera = () => {
    setOpenModal(false);
    setOpenModal2(false)
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then((img) => {
      let image2 = image.slice();
      image2.push({
        uri:img.path,
        type:'video'
      });
      setimage(image2);
      // console.log('kk')
      // console.log(img)
    });
  };
  const allowPost=()=>{
    if((topic!='' && text!=''&& hashtag!=null)||(image.length>0 && topic!=''&& hashtag!=null)) return true
    return false
  }
  const uploadImage = async () => {
    const list = []
    try {
      for(let i = 0; i < image.length; i++){
        if(image[i].type=='img'){
          const formData = new FormData();
          formData.append('image', {
            uri: image[i].uri,
            name: 'image.jpg',
            type: 'image/jpg',
          });     
          const response = await axios.post('http://192.168.1.2:3000/upload', formData);
          list.push({uri:response.data.photo,type:'img'})
        }
        else{
          const formData = new FormData();
          formData.append('video', {
            uri: image[i].uri,
            name: 'video.mp4',
            type: 'video/mp4',
          });     
          const response = await axios.post('http://192.168.1.2:3000/uploadvideo', formData);
          list.push({uri:response.data.video,type:'video'})
        }
        if(i == image.length-1){
          const currentDate = new Date()
          const currentDay = currentDate.getDate(); 
          const currentMonth = currentDate.getMonth() + 1; 
          const currentYear = currentDate.getFullYear(); 
          const currentHours = currentDate.getHours(); 
          const currentMinutes = currentDate.getMinutes();
          const time = currentDay+'/'+currentMonth+'/'+currentYear+' at '+currentHours+':'+currentMinutes
          const data = {
            postTime: time,
            likes: [],
            comments: [],
            topic:topic,
            text:text,
            postImg:list,
            userId:auth().currentUser.uid,
            userImg:profileData.userImg,
            userName:profileData.name||profileData.email,
            hashtag:hashtag
          }
          await Api.addPost(data)
        }
      }
     
    } catch (error) {
      console.error(error);
    }
  };
  const submitPost= async()=>{
    if(allowPost())
    {
      if(image.length>0){
        uploadImage()
      }
      else{
        const currentDate = new Date()
        const currentDay = currentDate.getDate(); 
        const currentMonth = currentDate.getMonth() + 1; 
        const currentYear = currentDate.getFullYear(); 
        const currentHours = currentDate.getHours(); 
        const currentMinutes = currentDate.getMinutes();
        const time = currentDay+'/'+currentMonth+'/'+currentYear+' at '+currentHours+':'+currentMinutes
        const data = {
          postTime: time,
          likes: [],
          comments: [],
          topic:topic,
          text:text,
          postImg:null,
          userId:auth().currentUser.uid,
          userImg:profileData.userImg,
          userName:profileData.name||profileData.email,
          hashtag:hashtag
        }
        await Api.addPost(data)
      }
    }

  }
  function RenderModal() {
    return (
      <Modal visible={OpenModal} animationType="slide" transparent={true}>
        <View style={{ height:160,width:300, borderRadius:15 ,backgroundColor:PRIMARY_COLOR,borderColor:'white', borderWidth:2, alignSelf:'center', marginVertical:300, position:'absolute'}}>
        <TouchableOpacity style={{marginLeft:255, padding:5,}}
            onPress={() => setOpenModal(false)}>
            <Icon
              name={'times-circle'}
              style={{color: 'white', fontSize: 20, marginRight:10}}
            />
          </TouchableOpacity>
          <View style={styles.popover}>
                <TouchableOpacity onPress={takePhotoFromCamera}>
                    <View style={styles.popoverItem}>
                        <Icon name="camera" size={35} color={card_color} />
                        <Text style={{ fontSize: 16, marginTop: 8, color: 'white' }}>Take photo</Text>
                    </View>
                </TouchableOpacity>           
                <TouchableOpacity onPress={videoFromCamera}>
                    <View style={styles.popoverItem}>
                        <Icon name="video" size={35} color={card_color} />
                        <Text style={{ fontSize: 16, marginTop: 8, color: 'white' }}>Video</Text>
                    </View>
                </TouchableOpacity>
          
          </View>
        </View>
        </Modal>
    )
  }
    {/* Q&A, Study Resources, Exam Analysis, Preparation Experiences, Review Exam Experiences, Share Your Results, Events/News, Others */}

    const [hashtagList, setHashtagList] = useState( [
      {key:"Q&A", tick: false}, {key:"Study Resources", tick: false}, {key:"Exam Analysis", tick: false}, {key:"Preparation Experiences", tick: false},{key: "Review Exam Experiences", tick: false},
      {key: "Share Your Results", tick: false},{key: "Events/News", tick: false},{key: "Others", tick: false}
  ]);

  const Hashtags = ({each})=>(
    <TouchableOpacity style={{backgroundColor:(each.tick)?'#9ACD32':'#E6E6FA', marginLeft:15, marginTop:10, alignItems:'center', borderRadius:15, borderColor:'#8470FF', borderWidth:1, padding: 1, paddingHorizontal:7, paddingVertical: 4}}
    onPress={()=>{
      const index1 = hashtagList.findIndex(item => item === each);
      if(index1 != -1)
      {
        const newData = [...hashtagList];
        newData[index1].tick = !each.tick;
        setHashtagList(newData);
      }
       sethashtag(each.key);
    }}
    >
        <Text style={{color:'black', fontWeight:'600'}} >{each.key}</Text>
    </TouchableOpacity>
  );

  function RenderCategory(){
    return(
      <Modal visible={OpenModal2} animationType="slide" transparent={true}>
    <View style={[styles.panel]}>  
    <View style={styles.IconContainer}>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=>{setOpenModal2(false)}}>
            <Icon
              name={'caret-up'}
              style={styles.IconWrapper}
            />
            <Text style={{color: '#222', fontSize: 15}}>Post Category</Text>
          </TouchableOpacity>
          {/* Q&A, Study Resources, Exam Analysis, Preparation Experiences, Review Exam Experiences, Share Your Results, Events/News, Others */}
          <View style={{flex: 1}}/>
          <TouchableOpacity onPress={pickImageAsync}>
            <Icon
              name={'images'}
              style={styles.IconWrapper}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setOpenModal(true)}}>
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
          <FlatList
            data={hashtagList}
            renderItem={({item, index}) => (
              <Hashtags
                  each={item} 
                   />
              )}
            numColumns={2}
          />
    </View>
    </Modal>

  );
    }
    

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
              // color={'#333'}
              color={allowPost() == true ? '#006400' : '#333'}
              onPress={submitPost}
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
            source={{ uri: profileData
              ? profileData.userImg
                ? profileData.userImg
                : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
              : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',}}
            style={styles.UserImage}
          />
           <Image
                  source={levelsource}
                  resizeMode="contain" style={{position:'absolute',marginLeft:37, marginTop:37, width:15, height:15 }}></Image>
          <Text
            style={styles.UserName}>
            {profileData ? (profileData.name ? profileData.name : profileData.email) : 'Your name'}
          </Text>
        </View>

        <TextInput
          placeholder="Topic here..."
          multiline={true}
          style={[styles.Input, {fontWeight: '700'}]}
          placeholderTextColor={'#555'}
          width={'96%'}
          value={topic}
          onChangeText={(txt) => setTopic(txt)}
          />
        <View>
          <TextInput
            placeholder="Write something here..."
            multiline={true}
            style={styles.Input}
            placeholderTextColor='#555'
            height={100}
            width={'96%'}
            value={text}
            onChangeText={(txt) => setText(txt)}
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
        <View style={{flex:1}}>
        <ScrollView style={{flexDirection:'column' }}>
            {
              image.map((each,key)=>{
                return(  
                    <View key={key} >
                      {each.type=='img'?<Image source={{uri:each.uri}} style={{height:200, width:400, marginTop:5}} resizeMode='cover'/>:
                      <VideoPlayer
                      video={{ uri: each.uri }}
                      videoWidth={400}
                      videoHeight={200}
                  />
                      }
                      <TouchableOpacity style={{ marginTop:3, position:'absolute'}} onPress={()=>{
                        let filterRssult=image.filter(function(element){
                          return element !== each;
                        })
                        setimage(filterRssult);
                       }}>
                       <Icon name={"backspace"} style={{ color: "#FFCC00", fontSize: 25 }} />
                     </TouchableOpacity>
                    </View>     
                );
              })
             
            }
  
          </ScrollView>
        </View>

        <View style={styles.IconContainer}>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=>{setOpenModal2(true)}}>
            <Icon
              name={'caret-down'}
              style={styles.IconWrapper}
            />
            <Text style={{color: '#222', fontSize: 15}}>Post Category</Text>
          </TouchableOpacity>
          {/* Q&A, Study Resources, Exam Analysis, Preparation Experiences, Review Exam Experiences, Share Your Results, Events/News, Others */}
          <View style={{flex: 1}}/>
          <TouchableOpacity onPress={pickImageAsync}>
            <Icon
              name={'images'}
              style={styles.IconWrapper}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setOpenModal(true)}}>
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
        {RenderCategory()}
        {RenderModal()}
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
    textAlignVertical: 'top',
    alignSelf:'center'
  },
  IconContainer: {
    height: 40,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#9ACC1C',
    marginTop: 10,
    zIndex:1
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
  popover:{
    borderRadius: 10, 
    padding: 16, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  popoverItem:{
    alignItems: 'center',
    margin: 16
},
panel: {
  height: '60%',
  width: '100%',
  backgroundColor: 'white',
  position: 'absolute',
  marginTop: 350,
  borderColor: 'black',
  zIndex:0,
},


})
