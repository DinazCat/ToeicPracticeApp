import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    Modal,
    FlatList,
    Image,
    ScrollView,
    ImageBackground,
  } from 'react-native';
  import React, {useState, useEffect, useRef, useCallback} from 'react';
  import AppStyle from '../theme';
  import {PRIMARY_COLOR, card_color} from '../assets/colors/color';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import SelectWordGame from '../components/SelectWordGame';
  import firestore from '@react-native-firebase/firestore';
  import LottieView from 'lottie-react-native';
  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        };
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};
  const {width} = Dimensions.get('window');
const GameScreen=({route,navigation})=> {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef();
    const [ItemIndex, setItemIndex] = useState(0);
    const [active, setActive] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [Click, setClick] = useState(false);
    const {vocabList, game, vocabs} = route.params
    const [VocabGame, setVocabGame] = useState(null)
    const [OpenModal, setOpenModal] = useState(false);
    const [Score, setScore] = useState(0);
    const [time, setTime] = useState(6)
    const getRandomNumber = (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min; };
    const getRandomItems = (item) => { 
      const randomItems = []; 
      randomItems.push(item.Vocab);
      const updatedItems = vocabs.filter(i => i.Vocab !== item.Vocab);
      let u = [...updatedItems];
      // setTempList[updatedItems];
      // const listLength = vocabs.length;
      //if(TempList!=null)
      while (randomItems.length < 4) { 
        const randomIndex = getRandomNumber(0, u.length - 1); 
        //if(TempList){
        randomItems.push(u[randomIndex].Vocab); 
        const updatedItems2 = u.filter(i => i.Vocab !== u[randomIndex].Vocab);
        u=[...updatedItems2]
        //setTempList(updatedItems2)
        //}
        // else{
        //  console.log("null")
        // } 
        if(randomItems.length == 4)return randomItems;
      }  
      };
      const CreateGame1 = ()=>{
        const temp =[];
        for(let i = 0; i < vocabList?.length; i++)
        {
          const creatList = getRandomItems(vocabList[i]);
          const shuffledData = creatList.sort(() => Math.random() - 0.5);
          temp.push(shuffledData);
          if(i==vocabList.length-1){
            setVocabGame(temp);
            setLoading(true);
          }
        }
      }
      useEffect(() => {
        CreateGame1()   
  
    }, []);
   
    useEffect(() => {
        scrollX.addListener(({value}) => {
          const index = Math.round(value / width);
          setItemIndex(index);
        });
        // const interval = setInterval(() => {
        //   const t = time -1;
        //   setTime(t)
        
        // }, 1000)
        // return () => clearInterval(interval); 
      }, []);
    const indexRef = useRef(active);
    indexRef.current = active;

    // useInterval(() => {
    //     if (active < Number(vocabList?.length) - 1) {
    //         setActive(active + 1);
    //         setTime(6)
    //     }
    // }, 5000);
    useInterval(() => {
      if(!OpenModal){
      const t = time -1;
      setTime(t)
      
      if(t<0||Click){
        if (active < Number(vocabList?.length) - 1) {
          setActive(active + 1);
          setTime(6)
          setClick(false)
      }
      else{
        setOpenModal(true);
      }
    }
      }
  }, 1000);

    useEffect(() => {
      if(Loading&&active<Number(vocabList?.length)&&OpenModal==false)
        flatListRef.current.scrollToIndex({ index: active, animated: true });
    }, [active]);
    
      const onViewableItemsChangedHandler = useCallback(
        ({ viewableItems, changed }) => {
            if (active != 0) {
                setActive(viewableItems[0].index);
            }
        },
        []
    );
    function RenderModal() {
      return (
        <Modal visible={OpenModal} animationType="slide" transparent={true}>
          <View style={{ height:200,width:"90%", borderRadius:15 ,backgroundColor:'white',borderColor:'black', borderWidth:2, alignSelf:'center', marginVertical:300,backgroundColor:'white', position:'absolute', justifyContent:'space-between'}}>
           <Text style={{fontSize: 20, marginTop: 5, color: 'black',fontWeight: '500',textAlign:'center'}}>You are finished with the score:</Text>
           <Text style={{ fontSize:25, fontWeight:'500', color:'black', textAlign:'center'}}>{Score}/{vocabList?.length}</Text>
           <TouchableOpacity style={[AppStyle.button.button2,{backgroundColor:PRIMARY_COLOR, height:40, marginBottom:5}]} onPress={()=> navigation.goBack()}>
             <Text style={[AppStyle.button.button2_Text, {color:'black'}]}>Exit</Text>
           </TouchableOpacity>
          </View>
        </Modal>
      )
    }
  return (
    <View style={styles.container}> 
      {OpenModal==false?<>
      <View style={AppStyle.viewstyle.component_upzone}>
        <TouchableOpacity style={{marginLeft: '2%'}} onPress={()=> navigation.goBack()}>
          <FontAwesome name="chevron-left" color="white" size={20} />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            marginLeft: 15,
          }}>
          {ItemIndex+1}/{vocabList.length}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            marginLeft: 30,
          }}>
          00:0{time}
        </Text>
      </View>
      <View style={{flex:1}}>
      {!Loading?<LottieView source={require('../assets/animation_lnu2onmv.json')} autoPlay loop style={{flex: 1, width:100, height:100, alignSelf:'center'}}/>:
      <Animated.FlatList
            data={vocabList}
            contentContainerStyle={styles.listContent}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            // scrollEventThrottle={16}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 50,
            }}
            onViewableItemsChanged={onViewableItemsChangedHandler}
            ref={flatListRef}
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
              
              if(game=='1'){
                return(
              <SelectWordGame item={item} vocabs={VocabGame[index]} 
              click={(i)=>{
                setClick(true);
                if(VocabGame[index][i] == item.Vocab){
                  const p = Score + 1;
                  setScore(p);
                }
              }}/>
                )}
                
            }}
          />}

      </View>
      </>
      :
      <ImageBackground
        source={require('../assets/bg3.png')}
        style={{flex: 1, resizeMode: 'cover'}}></ImageBackground>
      }
      {/* <TouchableOpacity style={[AppStyle.button.button2,{marginBottom:70, backgroundColor:card_color}]}>
        <Text style={[AppStyle.button.button2_Text, {color:'black'}]}>Next</Text>
      </TouchableOpacity> */}
      {RenderModal()}
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    buttonstyle:{
        width:'94%', height:50, alignSelf:'center', backgroundColor:card_color, borderRadius:20,justifyContent:'center', marginTop:15
    },
    buttonText:{
        color:'black', fontSize:22, fontWeight:'400', marginLeft:10
    },
    listContent: {
        justifyContent: 'center',
      },})
export default  GameScreen