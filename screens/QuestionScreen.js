import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Image,
    ScrollView,
    Animated,
    Modal,
  } from 'react-native';
  import React, {useState, useEffect, useRef} from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Slider from '@react-native-community/slider';
  import AppStyle from '../theme';
  import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import Sound from 'react-native-sound';
  import ListenP1QuestionForm from '../components/ListenP1QuestionForm';
  import ListenP2QuestionForm from '../components/ListenP2QuestionForm';
  import ListenP34QuestionForm from '../components/ListenP34QuestionForm';
  import ReadP1QuestionForm from '../components/ReadP1QuestionForm';
  import ReadP23QuestionForm from '../components/ReadP23QuestionForm';
  
  Sound.setCategory('Playback');
  const {width} = Dimensions.get('window');
  const QuestionScreen = ({navigation, route}) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const {questionList, part} = route.params;
    const [soundL, setsoundL] = useState(null);
    const [ItemIndex, setItemIndex] = useState(0);
    const [OpenModal, setOpenModal] = useState(false);
    const [ExplainButton, setExplainButton] = useState('1');
  
    const list = [];
    const createsound = () => {
      for (let i = 0; i < questionList.length; i++) {
         // console.log(questionList[i].Audio)
        const sound = new Sound(questionList[i].Audio, null, error => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        });
        list.push(sound);
        setsoundL(list);
      }
    };
  
    useEffect(() => {
      if(part=='L1'||part=='L2'||part=='L3'||part=='L4')
      createsound();
    else setsoundL('-1')
    }, []);
    useEffect(() => {
      scrollX.addListener(({value}) => {
        const index = Math.round(value / width);
        setItemIndex(index);
        //console.log(width)
        if (soundL != null && (part=='L1'||part=='L2'||part=='L3'||part=='L4')){
          const updatedList = [...soundL];
          for (let i = 0; i < soundL.length; i++) {
            if (i == index) {
              
  updatedList[i]  = new Sound(questionList[i].Audio, null, error => {
                if (error) {
                  console.log('failed to load the sound', error);
                  return;
                }
              });
            } else {
              updatedList[i].release();
            }
          }
          setsoundL(updatedList);
      }
      });
    }, []);
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
              borderWidth: 1,
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
                  Script
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
                  Translate
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
                  Explain/Tips
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
                  {questionList[ItemIndex].Explain.script}
                 </Text>
              </View>
            }
            {ExplainButton == '2' && (
              <View style={{marginLeft: 5, marginTop: 10}}>
               <Text>
                  {questionList[ItemIndex].Explain.translate}
                 </Text>
              </View>
            )}
            {ExplainButton == '3' && (
              <View style={{marginLeft: 5, marginTop: 10}}>
               <Text>
                  {questionList[ItemIndex].Explain.tip}
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
            onPress={() => navigation.goBack()}>
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
        </View>
        <View style={{flex: 1}}>
          {soundL && (
            <Animated.FlatList
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
                <ListenP1QuestionForm item={item} list={soundL[index]} />
                  )}
                else if(part=='L2'){
                return(
              <ListenP2QuestionForm item={item} list={soundL[index]} />
                )}
                else if(part=='L3'||part=='L4'){
                  return(
                <ListenP34QuestionForm item={item} list={soundL[index]} />
                  )}
                  // else if(part === 'R1'){
                  //   return(
                  // <ReadP1QuestionForm item={item} />
                  //   )}
                    else if(part == 'R2'||part=='R3'||part=='R1'){
                      return(
                    <ReadP23QuestionForm  item={item} part={part}/>
                      )}
              }}
            />
          )}
        </View>
        {/* {part=="L2"&&<View style={{flex: 1}}>
          {soundL && (
            <Animated.FlatList
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
                if(part=='L2'){
                return(
              <ListenP2QuestionForm item={item} list={soundL[index]} />
                )}
              }}
            />
          )}
        </View>}
        {part=="L3"&&<View style={{flex: 1}}>
          {soundL && (
            <Animated.FlatList
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
              renderItem={({item, index}) => (
                <ListenP34QuestionForm item={item} list={soundL[index]} />
              )}
            />
          )}
        </View>} */}
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
      width: 90,
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ExplainbuttonFalse: {
      height: '100%',
      width: 90,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ExplainFontTrue: {
      color: 'black',
      fontSize: 20,
    },
    ExplainFontFalse: {
      color: 'white',
      fontSize: 20,
    },
  });
  export default QuestionScreen;
  