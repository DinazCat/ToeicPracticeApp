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
  const [questionList, setquestionL] = useState(null);
 // const [screen, setscreen] = useState('');
  const [partname, setpartname]= useState('');
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
            height: 250,
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
              Question:
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: 'black',
                fontWeight: '400',
                marginLeft: 10,
              }}>
              For each question you...
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
        {questionList&&<TouchableOpacity style={[AppStyle.button.button2,{marginTop:70, zIndex:0}]} onPress={() => navigation.push('QuestionScreen',{questionList:questionList, part:part})}>
            <Text style={AppStyle.button.button2_Text}>Begin</Text>
        </TouchableOpacity>}
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
