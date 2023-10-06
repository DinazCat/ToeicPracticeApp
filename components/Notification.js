import { StyleSheet, Text, View, Image, TouchableOpacity,} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';

const Notification = ({item,action,Remove}) =>
{
    return(
        <TouchableOpacity style={[styles.container]}>
              <Image style={styles.UserImage} source={{uri: item.Img ? item.Img : 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}}/>
              <View style={{flexDirection:'column', width:300}}>
                <Text multiline={true} style={[styles.TextStyle]}>{item.Mess}</Text>
                <Text style={[styles.TextStyle]}>{item.Time}</Text>
              </View>
            <TouchableOpacity style={styles.DeleteButton}>
                <Icon name={'times-circle'}  />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
export default Notification
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height: 70,
        width:'100%',
        backgroundColor:'#F5F5F5',
        alignSelf:'center',
        paddingHorizontal: 5,
        alignItems: 'center',
        borderColor: '#DDD',
        borderBottomWidth: 1
    },
    UserImage:{
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight:10,
        marginTop:2,
    },
    TextStyle:{
        color:'#444',
    },
    DeleteButton:{
        color: 'black', 
        fontSize: 30, 
        padding: 10,
      },
})