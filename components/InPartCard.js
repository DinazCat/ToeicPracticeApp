import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
import * as Progress from 'react-native-progress';
import AppStyle from '../theme'
import {PRIMARY_COLOR, card_color} from '../assets/colors/color'
import QuestionScreen from '../screens/QuestionScreen';
const InPartCard = ({route, navigation}) => {
  const [number, setnumber] = useState('5');
  const [isopen, setopen] = useState(false);
  const [questionList, setquestionL] = useState([]);
 // const [screen, setscreen] = useState('');
  const [partname, setpartname]= useState('');
  const [directions, setDirections] = useState('');
  const [collection, setcollection]= useState('');
  const { part } = route.params;

   const fetchQuestionL1 = async()=>{
    try{
     await firestore()
      .collection('ListenPart1')
      .get()
      .then((querySnapshot)=>{
        const list = [];
        querySnapshot.forEach(doc =>{
          const {Answer, Audio, Image, Level, Key, Correct, Explain} = doc.data();
          list.push({          
            QId: doc.id,
            Answer: Answer,
            Audio: Audio,
            Image: Image,
            Level: Level,
            Key:Key,
            Correct:Correct,
            Explain: Explain,
          });
        })
        setquestionL(list);
      })
     
    } catch(e){
      console.log(e);
    }
  }
  const fetchQuestionL2 = async()=>{
    try{
     await firestore()
      .collection('ListenPart2')
      .get()
      .then((querySnapshot)=>{
        const list = [];
        querySnapshot.forEach(doc =>{
          const {Answer, Audio, Explain, Level, Correct} = doc.data();
          list.push({          
            QId: doc.id,
            Answer: Answer,
            Audio: Audio,
            Explain: Explain,
            Level: Level,
            Correct:Correct,
          });
        })
        setquestionL(list);
      })
     
    } catch(e){
      console.log(e);
    }
  }
  const fetchQuestionL3 = async()=>{
    try{
     await firestore()
      .collection('ListenPart3')
      .get()
      .then((querySnapshot)=>{
        const list = [];
        querySnapshot.forEach(doc =>{
          const {Explain, Audio, Question, Level, Key, Correct} = doc.data();
          list.push({          
            QId: doc.id,
            Explain: Explain,
            Audio: Audio,
            Question: Question,
            Level: Level,
            Key:Key,
            Correct:Correct,
          });
        })
        setquestionL(list);
      })
     
    } catch(e){
      console.log(e);
    }
  }
  const fetchQuestionL4 = async()=>{
    try{
     await firestore()
      .collection('ListenPart4')
      .get()
      .then((querySnapshot)=>{
        const list = [];
        querySnapshot.forEach(doc =>{
          const {Explain, Audio, Question, Level} = doc.data();
          list.push({          
            QId: doc.id,
            Explain: Explain,
            Audio: Audio,
            Question: Question,
            Level: Level,
          });
        })
        setquestionL(list);
      })
     
    } catch(e){
      console.log(e);
    }
  }
  const fetchQuestionR1 = async()=>{
    try{
     await firestore()
      .collection('ReadPart1')
      .get()
      .then((querySnapshot)=>{
        const list = [];
        querySnapshot.forEach(doc =>{
          const {Explain,Question, Level, Answer} = doc.data();
          list.push({          
            QId: doc.id,
            Explain: Explain,
            Answer: Answer,
            Question: Question,
            Level: Level,
          });
        })
        setquestionL(list);
      })
     
    } catch(e){
      console.log(e);
    }
  }
  const fetchQuestionR2 = async()=>{
    try{
     await firestore()
      .collection('ReadPart2')
      .get()
      .then((querySnapshot)=>{
        const list = [];
        querySnapshot.forEach(doc =>{
          const {Explain,Question} = doc.data();
          list.push({          
            QId: doc.id,
            Explain: Explain,
            Question: Question,
          });
        })
        setquestionL(list);
      })
     
    } catch(e){
      console.log(e);
    }
  }
  const fetchQuestionR3 = async()=>{
    try{
     await firestore()
      .collection('ReadPart3')
      .get()
      .then((querySnapshot)=>{
        const list = [];
        querySnapshot.forEach(doc =>{
          const {Explain,Question, Paragraph} = doc.data();
          list.push({          
            QId: doc.id,
            Explain: Explain,
            Question: Question,
            Paragraph:Paragraph,
          });
        })
        setquestionL(list);
      })   
    } catch(e){
      console.log(e);
    }
  }
  const fetchQuestionS1 = async()=>{
    try{
     await firestore()
      .collection('SpeakPart1')
      .get()
      .then((querySnapshot)=>{
        const list = [];
        querySnapshot.forEach(doc =>{
          const {Explain,Question} = doc.data();
          list.push({          
            QId: doc.id,
            Explain: Explain,
            Question: Question,
          });
        })
        setquestionL(list);
      })   
    } catch(e){
      console.log(e);
    }
  }
  const fetchQuestionS2 = async()=>{
    try{
     await firestore()
      .collection('SpeakPart2')
      .get()
      .then((querySnapshot)=>{
        const list = [];
        querySnapshot.forEach(doc =>{
          const {Explain, Picture} = doc.data();
          list.push({          
            QId: doc.id,
            Explain: Explain,
            Picture: Picture,
          });
        })
        setquestionL(list);
      })   
    } catch(e){
      console.log(e);
    }
  }
  const fetchQuestionS3 = async()=>{
    try{
     await firestore()
      .collection('SpeakPart3')
      .get()
      .then((querySnapshot)=>{
        const list = [];
        querySnapshot.forEach(doc =>{
          const {Context, Explain, Question} = doc.data();
          list.push({          
            QId: doc.id,
            Context: Context,
            Explain: Explain,
            Question: Question,
          });
        })
        setquestionL(list);
      })   
    } catch(e){
      console.log(e);
    }
  }
  const fetchQuestionS4 = async()=>{
    try{
     await firestore()
      .collection('SpeakPart4')
      .get()
      .then((querySnapshot)=>{
        const list = [];
        querySnapshot.forEach(doc =>{
          const {AvailableInfo, Explain, Question} = doc.data();
          list.push({          
            QId: doc.id,
            AvailableInfo: AvailableInfo,
            Explain: Explain,
            Question: Question,
          });
        })
        setquestionL(list);
      })   
    } catch(e){
      console.log(e);
    }
  }
  const fetchQuestionS5 = async()=>{
    try{
     await firestore()
      .collection('SpeakPart5')
      .get()
      .then((querySnapshot)=>{
        const list = [];
        querySnapshot.forEach(doc =>{
          const {Explain, Question} = doc.data();
          list.push({          
            QId: doc.id,
            Explain: Explain,
            Question: Question,
          });
        })
        setquestionL(list);
      })   
    } catch(e){
      console.log(e);
    }
  }
  const fetchQuestionW1 = async()=>{
    try{
     await firestore()
      .collection('WritePart1')
      .get()
      .then((querySnapshot)=>{
        const list = [];
        querySnapshot.forEach(doc =>{
          const {Explain, Picture, SugesstedWord} = doc.data();
          list.push({          
            QId: doc.id,
            Explain: Explain,
            Picture: Picture,
            SugesstedWord: SugesstedWord,
          });
        })
        setquestionL(list);
      })   
    } catch(e){
      console.log(e);
    }
  }
  const fetchQuestionW2 = async()=>{
    try{
     await firestore()
      .collection('WritePart2')
      .get()
      .then((querySnapshot)=>{
        const list = [];
        querySnapshot.forEach(doc =>{
          const {Explain, Question, Direction} = doc.data();
          list.push({          
            QId: doc.id,
            Explain: Explain,
            Question: Question,
            Direction: Direction,
          });
        })
        setquestionL(list);
      })   
    } catch(e){
      console.log(e);
    }
  }
  const fetchQuestionW3 = async()=>{
    try{
     await firestore()
      .collection('WritePart3')
      .get()
      .then((querySnapshot)=>{
        const list = [];
        querySnapshot.forEach(doc =>{
          const {Explain, Question} = doc.data();
          list.push({          
            QId: doc.id,
            Explain: Explain,
            Question: Question,
          });
        })
        setquestionL(list);
      })   
    } catch(e){
      console.log(e);
    }
  }
  useEffect(() => {
    if(part=='L1'){
      setpartname('Photographs');
      fetchQuestionL1();
    }
    else if(part=='L2'){
      setpartname('Question & Response');
      fetchQuestionL2();
    }
    else if(part=='L3'){
      setpartname('Short Conversations');
      fetchQuestionL3();
    }
    else if(part=='L4'){
      setpartname('Short Talks');
      fetchQuestionL4();
    }
    else if(part=='R1'){
      setpartname('Incomplete Sentences');
      fetchQuestionR1();
    }
    else if(part=='R2'){
      setpartname('Text Completion');
      fetchQuestionR2();
    }
    else if(part=='R3'){
      setpartname('Reading Comprehension');
      fetchQuestionR3();
    }
    else if(part=='S1'){
    setpartname('Read a text aloud');
    setDirections('In this part of the test, you will read aloud the text on the screen. You will have 45 seconds to prepare. Then you will have 45 seconds to read the text aloud.')
    fetchQuestionS1();
    }
    else if(part=='S2'){
      setpartname('Describe a picture');
      setDirections('In this part of the test, you will describe the picture on your screen in as much detail as you can. You will have 45 seconds to prepare your response. Then you will have 30 seconds to speak about the picture.')
      fetchQuestionS2();
    }
    else if(part=='S3'){
      setpartname(' Respond to questions');
      setDirections('In this part of the test, you will answer three questions. You will have three seconds to prepare after you hear each question. You will have 15 seconds to respond to Questions 5 and 6, and 30 seconds to respond to Question 7.')
      fetchQuestionS3();
    }
    else if(part=='S4'){
      setpartname('Respond to questions using information provided');
      setDirections(' In this part of the test, you will answer three questions based on the information provided. You will have 45 seconds to read the information before the questions begin. You will have three seconds to prepare and 15 seconds to respond to Questions 8 and 9. You will hear Question 10 two times. You will have three seconds to prepare and 30 seconds to respond to Question 10.')
      fetchQuestionS4();
    }
    else if(part=='S5'){
      setpartname('Express an opinion');
      setDirections(' In this part of the test, you will give your opinion about a specific topic. Be sure to say as much as you can in the time allowed. You will have 45 seconds to prepare. Then you will have 60 seconds to speak.')
      fetchQuestionS5();
    }
    else if(part=='W1'){
      setpartname('Write a sentence based on a picture');
      setDirections(' In this part of the test, you will write ONE sentence that is based on a picture. With each picture, you will be given TWO words or phrases that you must use in your sentence.\n\nYou can change the forms of the words and you can use the words in any order.\n\nYour sentence will be scored on the appropriate use of grammar, and the relevance of the sentence to the picture.\n\nYou will have eight minutes to complete this part of the test.')
      fetchQuestionW1();
    }
    else if(part=='W2'){
      setpartname('Respond to a written request');
      setDirections(' In this part of the test, you will show how well you can write a response to an e-mail. \n\n Your response will be scored on the quality and variety of your sentences, vocabulary, and organization. \n\n You will have 10 minutes to read and answer each e-mail.')
      fetchQuestionW2();
    }
    else if(part=='W3'){
      setpartname('Write an opinion essay');
      setDirections('Respond to the e-mail. Respond as if you have recently moved to a new city. \n\n In your e-mail to the committee, make at least TWO requests for information.')
      fetchQuestionW3();
    }
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg8.png')}
        style={{flex: 1, resizeMode: 'cover'}}>
        <View style={AppStyle.viewstyle.component_upzone}>
          <TouchableOpacity style={{marginLeft: '2%'}} onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" color="white" size={20} />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'left',
              color: 'white',
              fontSize: 20,
              marginLeft: 15,
            }}>
            {partname}
          </Text>
        </View>

        <View
          style={{
            height: 100,
            width: '96%',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: card_color,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#E8E8E8',
          }}>
          <FontAwesome name="image"  size={50} style={{color:PRIMARY_COLOR}} />
          <View style={{flexDirection: 'column'}}>
            <Text style={[styles.TextFont, {fontWeight: '300'}]}>
              Sentences completed:{' '}
              <Text style={[styles.TextFont, {fontWeight: '400'}]}>0</Text>
            </Text>
            <Text style={[styles.TextFont, {fontWeight: '300'}]}>
              Correct:{' '}
              <Text style={[styles.TextFont, {fontWeight: '400'}]}>0</Text>
            </Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.TextFont, {fontWeight: '300', marginRight:5}]}>Progress:</Text>
              <Progress.Bar progress={0.3} width={120} height={10} style={{height:10,}} color={PRIMARY_COLOR}/>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 260,
            width: '90%',
            marginTop: 10,
            borderRadius: 20,
            backgroundColor: card_color,
            alignSelf: 'center',
          }}>
          <ScrollView>
            <Text
              style={{
                textDecorationLine: 'underline',
                fontSize: 18,
                color: PRIMARY_COLOR,
                fontWeight: '600',
                marginLeft: 10,
                marginTop: 10,
              }}>
              Directions:
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: 'black',
                fontWeight: '400',
                marginLeft: 10,
              }}>
              {directions}
            </Text>
          </ScrollView>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
            height: 80,
          }}>
          <Text style={{color: 'black', fontSize: 20, marginTop: 33}}>
            Number of questions:
          </Text>
          <DropDownPicker
            items={[
              {label: '5', value: '5'},
              {label: '10', value: '10'},
              {label: '15', value: '15'},
              {label: '20', value: '20'},
            ]}
            open={isopen}
            setOpen={() => setopen(!isopen)}
            value={number}
            containerStyle={{
              height: 10,
              width: 100,
              marginLeft: 10,
              alignSelf: 'center',
            }}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            setValue={item => setnumber(item)}
            maxHeight={100}
            zIndex={1}
          />
        </View>
        {/* {questionList&& */}
        <TouchableOpacity style={[AppStyle.button.button2,{marginTop:70, zIndex:0}]} onPress={() => navigation.push('QuestionScreen',{questionList:questionList, part:part})}>
            <Text style={AppStyle.button.button2_Text}>Begin</Text>
        </TouchableOpacity>
        {/* } */}
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  TextFont: {
    fontSize: 18,
    marginLeft: 5,
    color: 'black',
  },

});
export default InPartCard;
