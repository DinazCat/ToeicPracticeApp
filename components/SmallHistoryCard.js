import { View, Text, Image,TouchableOpacity} from 'react-native'
import React from 'react'
import AppStyle from '../theme'
const SmallHistoryCard = ({display,click}) => {
  return (
    <TouchableOpacity style={{flexDirection:'row', height:40, justifyContent:'space-between', alignItems:'center', width:'90%',marginTop:5}} onPress={click}>
     {display.Part=='L1'&& <Image  style={{width:'15%', height:40,}} source={require("../assets/headphones.png")} resizeMode='contain'/>}
      <View style={{flexDirection:'row', height:40, justifyContent:'space-between', alignItems:'center', width:'80%', borderBottomColor:'black', borderBottomWidth:1}}>
      <Text style={{fontSize:16, color:'black'}}>{display.PartName}</Text>
      <Text style={AppStyle.button.buttonText}>{parseInt(parseInt(display.Correct)*100/parseInt(display.Quantity))}%</Text>
      </View>
    </TouchableOpacity>
  )
}
export default SmallHistoryCard;