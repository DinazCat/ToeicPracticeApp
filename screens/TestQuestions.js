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
import ReadP23QuestionForm from '../components/ReadP23QuestionForm';
import LottieView from 'lottie-react-native';
import Api from '../api/Api';
import { AuthContext } from '../navigation/AuthProvider';

Sound.setCategory('Playback');
const {width} = Dimensions.get('window');

const TestQuestions = () => {
  const {user} = useContext(AuthContext);
  const scrollX = useRef(new Animated.Value(0)).current;
  const {questionList, numberofQuestion, isFromPL} = route.params;
  const [soundL, setsoundL] = useState(null);
  const [ItemIndex, setItemIndex] = useState(0);
  const [OpenModal, setOpenModal] = useState(false);
  const [ExplainButton, setExplainButton] = useState('1');
  const [loading, setloading] = useState(false);
  const [buttonTitle, setButtonTitle] = useState('Submit');
  const [Score, setScore] = useState(0);
  const [history, setHistory] = useState([]);

  const list = [];
  const createsound = () => {
    for (let i = 0; i < questionList.length; i++) {
       // console.log(questionList[i].Audio)
      if (questionList[i].Audio) {
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
    }
  };

  const onSubmit = async() =>{

  }

  useEffect(() => {
    //if(part=='L1'||part=='L2'||part=='L3'||part=='L4')
    createsound();
    //else setsoundL('-1')
  }, []);

  useEffect(() => {
    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      setItemIndex(index);
      //if(loading && (part=='L1'||part=='L2'||part=='L3'||part=='L4')){
      if(loading){  
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
    //if(part=="L1"){
    for(let i = 0; i < questionList.length;i++){
      list.push({
        Qid:questionList[i].Id,
        Select:-1,
        Default:-2
      })
    //}
  }
    setHistory(list)
  },[])
  const showAlert = () => {
    Alert.alert(
      'Hey!',
      'If you leave, your test will not be saved.',
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
          onSubmit()
         } },
        { text: 'No', onPress: () => {
        }},
      ],
      { cancelable: false }
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
          if(item.part=='L1'){
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
          else if(item.part=='L2'){
          return(
            <ListenP2QuestionForm item={item} list={soundL[index]} />
          )}
          else if(item.part=='L3'||item.part=='L4'){
          return(
            <ListenP34QuestionForm item={item} list={soundL[index]} />
          )}  
          else if (item.part == 'R1' || item.part == 'R2' || item.part == 'R3') {
            return <ReadP23QuestionForm item={item} part={part} />;
          }                
        }}/>                    
      }
      </View>
     
      {/* {RenderModal()} */}
    </View>
  );
};


export default TestQuestions

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