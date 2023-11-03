import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  Alert,
  Animated,
  Modal,
} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../theme';
import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Sound from 'react-native-sound';
import ListenP1QuestionForm from '../components/ListenP1QuestionForm';
import ListenP2QuestionForm from '../components/ListenP2QuestionForm';
import ListenP34QuestionForm from '../components/ListenP34QuestionForm';
import ReadP1QuestionForm from '../components/ReadP1QuestionForm';
import ReadP23QuestionForm from '../components/ReadP23QuestionForm';
import SpeakP1QuestionForm from '../components/SpeakP1QuestionForm';
import SpeakP2QuestionForm from '../components/SpeakP2QuestionForm';
import SpeakP34QuestionForm from '../components/SpeakP34QuestionForm';
import SpeakP5QuestionForm from '../components/SpeakP5QuestionForm';
import SpeakP6QuestionForm from '../components/SpeakP6QuestionForm';
import WriteP1QuestionForm from '../components/WriteP1QuestionForm';
import WriteP23QuestionForm from '../components/WriteP23QuestionForm';
import dings from '../assets/Part1No1.mp3'
import LottieView from 'lottie-react-native';
import RNFS from 'react-native-fs';
import Api from '../api/Api';
import { AuthContext } from '../navigation/AuthProvider';


Sound.setCategory('Playback');
const {width} = Dimensions.get('window');

const QuestionScreen = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const scrollX = useRef(new Animated.Value(0)).current;
  const {questionList, part, partName, sign} = route.params;
  const [soundL, setsoundL] = useState(null);
  const [ItemIndex, setItemIndex] = useState(0);
  const [OpenModal, setOpenModal] = useState(false);
  const [ExplainButton, setExplainButton] = useState('1');
  const [loading, setloading] = useState(false);
  const [buttonTitle, setButtonTitle] = useState('Submit')
  const [recordingsList, setRecordingsList] = useState([]);
  const [Score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const recordsRef = useRef([]);
  const answersRef = useRef([]);

  const list = [];
  const createsound = () => {
    for (let i = 0; i < questionList.length; i++) {
       // console.log(questionList[i].Audio)
      const sound = new Sound(questionList[i].Audio, null, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        else{
          if(i==questionList.length-1) {setloading(true);}
        }
      });
      list.push(sound);
      setsoundL(list);
      
    }
  };

  const handleRecordComplete = (index, record, questionId) => {  
    // setRecordList((prevList) => {
    //   const existingRecordIndex = prevList.findIndex(item => item.QId === QuestionId);

    //   if (existingRecordIndex !== -1) {
    //     const updatedList = [...prevList];
    //     updatedList[existingRecordIndex] = { QId: QuestionId, record };
    //     return updatedList;
    //   } else {
    //     return [...prevList, { QId: QuestionId, record }];
    //   }
    // });   
    recordsRef.current[index] = {
      QId: questionId,
      record: record, 
    };
  };
  const handleRecordComplete2 = (recordData, questionId) => {
    setRecordingsList((prevList) => {

      const existingRecordIndex = prevList.findIndex(item => item.QId === questionId);
  
      if (existingRecordIndex !== -1) {
        return prevList.map(item =>
          item.QId === questionId ? { 
            // ...item,
            QId: questionId , 
            record0: recordData[0],
            record1: recordData[1],
            record2: recordData[2],
          } : item
        );
      } else {       
        return [...prevList, { 
          QId: questionId,
          record0: recordData[0],
          record1: recordData[1],
          record2: recordData[2],
         }];
      }
    });  
  };

  const handleAnswerChange = (index, answer, questionId) => {
    answersRef.current[index] = {
      answer: answer, 
      QId: questionId,
    };
    
  };

  const onSubmit = async() =>{
    if(part == 'S1' || part == 'S2' || part == 'S5'){
      try {    
        // for(const recordItem of recordList) {
        //   // upload audio to storage
        //   const audioData = await RNFS.readFile(recordItem.record, 'base64');
        //   const audioUrl = await Api.uploadAudio(audioData)
        //   .catch(error => console.error(error));
        //   console.log('url: ' + audioUrl);      
        //   // upload data to firestore
        //   const data = {
        //     record: audioUrl,
        //     QId: recordItem.QId,
        //   }
          for (let i = 0; i < questionList.length; i++) {
            if (recordsRef.current[i] === undefined) {
              recordsRef.current[i] = {
                record: null, 
                QId: questionList[i].QId,
              };
            }
          }

          const audioUploadPromises = recordsRef.current.map(async (recordItem) => {
            // upload audio to storage
            const audioData = recordItem.record !== null ? await RNFS.readFile(recordItem.record, 'base64') : null;
            const audioUrl = audioData !== null ? await Api.uploadAudio(audioData) : null;
            return {
              QId: recordItem.QId,
              record: audioUrl,
            };
          });
    
          const audioUploadResults = await Promise.all(audioUploadPromises);
          //console.log(audioUploadResults);
          
          const practiceHistoryData = {
            submitTime: new Date(), 
            result: audioUploadResults,
            userId: user.uid,
            part: part,
          }; 
          //console.log(practiceHistoryData);
          //console.log(practiceHistoryData.result)
          await Api.uploadPracticeHistory(practiceHistoryData)
          .catch(error => console.error(error));
          navigation.goBack(); 
      } catch (error) {
        console.log('error at onSubmit: ', error);
      }
    }
    else if (part == 'S3' || part == 'S4'){
      const audioUploadPromises = recordingsList.map(async (recordItem) => {
        // upload audio to storage
        const audioData0 = recordItem.record0 !== null ? await RNFS.readFile(recordItem.record0, 'base64') : null;
        const audioUrl0 = audioData0 ? await Api.uploadAudio(audioData0) : null;
        const audioData1 = recordItem.record1 !== null ? await RNFS.readFile(recordItem.record1, 'base64') : null;
        const audioUrl1 = audioData1 ? await Api.uploadAudio(audioData1) : null;
        const audioData2 = recordItem.record2 !== null ? await RNFS.readFile(recordItem.record2, 'base64') : null;
        const audioUrl2 = audioData2 ? await Api.uploadAudio(audioData2) : null;    

        return {
          QId: recordItem.QId,
          record0: audioUrl0,
          record1: audioUrl1,
          record2: audioUrl2,
        };
      });

      const audioUploadResults = await Promise.all(audioUploadPromises);
      //console.log(audioUploadResults);

      if (audioUploadResults.length !== questionList.length) {
        const questionIds = questionList.map(question => question.QId)
        const recordQIds = audioUploadResults.map(item => item.QId)
        const missingQIds = questionIds.filter(id => !recordQIds.includes(id));
        
        const newItems = missingQIds.map(QId => ({
          QId: QId,
          record0: null,
          record1: null,
          record2: null,
        }));
             
        audioUploadResults.push(...newItems);
      }

      const practiceHistoryData = {
        submitTime: new Date(), 
        result: audioUploadResults,
        userId: user.uid,
        part: part,
      }; 
      //console.log(practiceHistoryData);

      await Api.uploadPracticeHistory(practiceHistoryData)
      .catch(error => console.error(error));

      navigation.goBack();  
    }
    else if(part == 'W1' || part == 'W1' || part == 'W3' ){
      for (let i = 0; i < questionList.length; i++) {
        if (answersRef.current[i] === undefined) {
          answersRef.current[i] = {
            answer: null, 
            QId: questionList[i].QId,
          };
        }
      }
      const practiceHistoryData = {
        submitTime: new Date(), 
        result: answersRef.current,
        userId: user.uid,
        part: part,
      }; 
      //console.log(practiceHistoryData);

      await Api.uploadPracticeHistory(practiceHistoryData)
      .catch(error => console.error(error));
      
      navigation.goBack();
    }
    else if(part == 'L1'){
      if (soundL!='-1'&&soundL[ItemIndex].isPlaying()) {
        soundL[ItemIndex].stop();
     }
    const currentDate = new Date();
    const currentDay = currentDate.getDate(); 
    const currentMonth = currentDate.getMonth() + 1; 
    const currentYear = currentDate.getFullYear(); 
    const currentHours = currentDate.getHours(); 
    const currentMinutes = currentDate.getMinutes();
    const time = currentDay+'-'+currentMonth+'-'+currentYear+'-'+currentHours+'-'+currentMinutes
    const data = {
      PartName:partName,
      Part:part,
      Quantity:questionList.length,
      Correct: Score,
      History:history,
      Time:time
    }
    Api.pushPracticeHistory(data, sign);
    }
  }

  useEffect(() => {
    if(part=='L1'||part=='L2'||part=='L3'||part=='L4')
    createsound();
  else setsoundL('-1')
  }, []);
  useEffect(() => {
    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      setItemIndex(index);
      if(loading && (part=='L1'||part=='L2'||part=='L3'||part=='L4')){
      for(let i = 0; i < soundL.length; i++)
          {
            if(i != index &&soundL[i].isPlaying()){
              soundL[i].stop();
            }       
          }
          soundL[index].play(success => {
            if (success) {
              console.log('successfully finished playing');
              soundL[index].stop()
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
     
    }
    });
  }, [loading]);
  useEffect(()=>{
    const list = [];
    if(part=="L1"){
    for(let i = 0; i < questionList.length;i++){
      list.push({
        Qid:questionList[i].Id,
        Select:-1,
        Default:-2
      })
    }
  }
    setHistory(list)
  },[])
  const showAlert = () => {
    Alert.alert(
      'Hey!',
      'If you leave, your training progress will not be saved.',
      [
        { text: 'OK', onPress: () => {
          if(soundL!=-1)
          for(let i = 0; i < soundL?.length; i++)
          {
            if(soundL[i].isPlaying()){
              soundL[i].stop();
            }
            
          }
         navigation.goBack()
         } },
        { text: 'Cancel', onPress: () => console.log('Cancel pressed') },
      ],
      { cancelable: false }
    );
  }
  const showAlert2 = () => {
    Alert.alert(
      'Hey!',
      'Are you sure to submit?',
      [
        { text: 'Yes', onPress: () => {
          navigation.navigate('CompleteCard',{score:Score,quantity:questionList.length,answer:history,sign:'QuestionScreen',part:part})
          onSubmit()
         } },
        { text: 'No', onPress: () => {
          // navigation.dispatch(StackActions.replace('QuestionScreen',{questionList:questionList, part:part, partName:partName}));
        }},
      ],
      { cancelable: false }
    );
  }
  function RenderModal() {
    return (
      <Modal visible={OpenModal} animationType="slide" transparent={true}>
        <View
          style={{
            height: '60%',
            width: '100%',
            borderRadius: 15,
            backgroundColor: card_color,
            position: 'absolute',
            marginTop: 350,
            borderColor: 'black',
            //borderWidth: 1,
          }}>
          <View
            style={{
              height: '12%',
              backgroundColor: PRIMARY_COLOR,
              width: '100%',
              borderTopStartRadius: 15,
              borderTopEndRadius: 15,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={
                ExplainButton == '1'
                  ? styles.ExplainbuttonTrue
                  : styles.ExplainbuttonFalse
              }
              onPress={() => setExplainButton('1')}>
              <Text
                style={
                  ExplainButton == '1'
                    ? styles.ExplainFontTrue
                    : styles.ExplainFontFalse
                }>
                {questionList[ItemIndex]&&questionList[ItemIndex].Explain.SampleAnswer ? 'Sample Answer' : 'Script'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                ExplainButton == '2'
                  ? styles.ExplainbuttonTrue
                  : styles.ExplainbuttonFalse
              }
              onPress={() => setExplainButton('2')}>
              <Text
                style={
                  ExplainButton == '2'
                    ? styles.ExplainFontTrue
                    : styles.ExplainFontFalse
                }>
                Translation
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                ExplainButton == '3'
                  ? styles.ExplainbuttonTrue
                  : styles.ExplainbuttonFalse
              }
              onPress={() => setExplainButton('3')}>
              <Text
                style={
                  ExplainButton == '3'
                    ? styles.ExplainFontTrue
                    : styles.ExplainFontFalse
                }>
                Tips
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              marginLeft: '93%',
              marginTop: 3,
            }}
            onPress={() => setOpenModal(false)}>
            <Icon
              name={'times-circle'}
              style={{color: 'white', fontSize: 20}}
            />
          </TouchableOpacity>
          {ExplainButton == '1' && 
            <View style={{marginLeft: 5, marginTop: 10}}>
               <Text>
                {questionList[ItemIndex]&&questionList[ItemIndex].Explain.script}
                {questionList[ItemIndex]&&questionList[ItemIndex].Explain.SampleAnswer}
               </Text>
            </View>
          }
          {ExplainButton == '2' && (
            <View style={{marginLeft: 5, marginTop: 10}}>
             <Text>
                {questionList[ItemIndex]&&questionList[ItemIndex].Explain.translate}
                {questionList[ItemIndex]&&questionList[ItemIndex].Explain.Translation}
               </Text>
            </View>
          )}
          {ExplainButton == '3' && (
            <View style={{marginLeft: 5, marginTop: 10}}>
             <Text>
                {questionList[ItemIndex]&&questionList[ItemIndex].Explain.tip}
                {questionList[ItemIndex]&&questionList[ItemIndex].Explain.Tips}
               </Text>
              
            </View>
          )}
        </View>
      </Modal>
    );
  }
  return (
    <View style={styles.container}>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={showAlert}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'left',
            color: 'white',
            fontSize: 20,
            marginLeft: 15,
          }}>
          Question {ItemIndex + 1}
        </Text>
        <FontAwesome
          name="heart"
          color="white"
          size={20}
          style={{marginLeft: '3%'}}
        />
        <View style={{flex: 1}} />
        { buttonTitle == 'Explain' ? (
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <Text
            style={{
              textAlign: 'left',
              color: 'white',
              fontSize: 20,
              marginRight: '5%',
              textDecorationLine: 'underline',
            }}>
            Explain
          </Text>
        </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={showAlert2}>
          <Text
            style={{
              textAlign: 'left',
              color: 'white',
              fontSize: 20,
              marginRight: '5%',
              textDecorationLine: 'underline',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 1}}>
      {
        (soundL=='-1') ? <Animated.FlatList
            data={questionList}
            contentContainerStyle={styles.listContent}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {x: scrollX},
                  },
                },
              ],
              {useNativeDriver: true},
            )}
            renderItem={({item, index}) => {
              
               if (part == 'R2' || part == 'R3' || part == 'R1') {
                 return <ReadP23QuestionForm item={item} part={part} />;
               } else if (part == 'S1') {
                 return <SpeakP1QuestionForm item={item} part={part} 
                 onRecordComplete={(record, questionId) => handleRecordComplete(index, record, questionId)}/>;
               } else if (part == 'S2') {
                 return <SpeakP2QuestionForm item={item} part={part} 
                 onRecordComplete={(record, questionId) => handleRecordComplete(index, record, questionId)}/>;
               } else if (part == 'S3') {
                 return <SpeakP34QuestionForm item={item} part={part} 
                 onRecordComplete={handleRecordComplete2}/>;
               } else if (part == 'S4') {
                 return <SpeakP5QuestionForm item={item} part={part} 
                 onRecordComplete={handleRecordComplete2}/>;
               } else if (part == 'S5') {
                 return <SpeakP6QuestionForm item={item} part={part} 
                 onRecordComplete={(record, questionId) => handleRecordComplete(index, record, questionId)}/>;
               } else if (part == 'W1') {
                 return <WriteP1QuestionForm item={item} part={part} 
                 onAnswerChange={(answer, questionId) => handleAnswerChange(index, answer, questionId)}/>;
               } else if (part == 'W2' || 'W3') {
                 return <WriteP23QuestionForm item={item} part={part} 
                 onAnswerChange={(answer, questionId) => handleAnswerChange(index, answer, questionId)}/>;
               }        
            }}
          />:
            (!loading) ? 
            <LottieView source={require('../assets/animation_lnu2onmv.json')} autoPlay loop style={{flex: 1, width:100, height:100, alignSelf:'center'}}/>
            : <Animated.FlatList
            data={questionList}
            contentContainerStyle={styles.listContent}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {x: scrollX},
                  },
                },
              ],
              {useNativeDriver: true},
            )}
            renderItem={({item, index}) => {
              
              if(part=='L1'){
                return(
                  <ListenP1QuestionForm item={item} list={soundL[index]} flag={'QuestionScreen'}
                  click={(i)=>{
                    const History = [...history];
                    let correct = 0;
                    for(let j = 0;j < 4; j++){
                      if(questionList[index].Answer[j]) correct=j
                    }
                    if(questionList[index].Answer[i]){
                    const p = Score + 1;
                    setScore(p);
                    History[index].Select = i
                    History[index].Default = i
                  }
                  else{
                    History[index].Select = i
                    History[index].Default = correct
                  }
                }}/>
                )}
              else if(part=='L2'){
              return(
            <ListenP2QuestionForm item={item} list={soundL[index]} />
              )}
              else if(part=='L3'||part=='L4'){
                return(
              <ListenP34QuestionForm item={item} list={soundL[index]} />
                )}
                
            }}
          />
                       
          }
      </View>
     
      {RenderModal()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    //width: Dimensions.get('window')
  },
  listContent: {
    justifyContent: 'center',
  },
  TimeFont: {
    textAlign: 'left',
    color: 'black',
    fontSize: 20,
  },
  boxstyle: {
    flexDirection: 'column',
    width: '90%',
    backgroundColor: card_color,
    alignSelf: 'center',
    marginTop: '5%',
    height: '50%',
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 15,
  },
  answerboxStyle: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 25,
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerboxStyleTrue: {
    width: 40,
    height: 40,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 25,
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerboxStyleFalse: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 25,
    borderColor: 'red',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answertext: {
    color: 'black',
    fontWeight: '500',
    fontSize: 20,
  },
  ExplainbuttonTrue: {
    height: '100%',
    width: 100,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ExplainbuttonFalse: {
    height: '100%',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ExplainFontTrue: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500'
  },
  ExplainFontFalse: {
    color: 'white',
    fontSize: 18,
  },
});
export default QuestionScreen;
