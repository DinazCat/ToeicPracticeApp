import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Reply = ({ item }) => {
    return(
        <View style={{ marginLeft: 20 }}>
        <View
        style={styles.container}>
        <TouchableOpacity>
            <Image
                source={{uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}}
                style={styles.image}
            />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.textContainer}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>
                {item? item.userName : 'Cát'}
            </Text>
            <Text multiline style={{fontSize: 15, marginTop: 3}}>
                {item? item.text: ''} 
            </Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity>
            <Text style={styles.replyStyle}>Reply</Text>
        </TouchableOpacity>
        </View>
    )
}
const Comment = ({item, onUserPress, onEdit, onDelete, flag}) => {
  return (
    <View>
        {flag == 1 && 
        <View>
        <View style={styles.container}>
            <TouchableOpacity onPress={onUserPress}>
                <Image
                    source={{uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}}
                    style={styles.image}
                />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.textContainer}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>
                    {item? item.userName : 'Cát'}
                </Text>
                <Text multiline style={{fontSize: 15, marginTop: 3}}>
                    {item? item.text: ''} 
                </Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity>
            <Text style={styles.replyStyle}>Reply</Text>
        </TouchableOpacity>
        </View>    
        }
        {item && item.replies && item.replies.map((reply, index) => (
        <View key={index}>
        <Reply item={reply} />
        {reply.replies && reply.replies.length > 0 &&
            <View style={{ marginLeft: 20 }}>
                <Comment item={reply} flag={0}/>
            </View>
            }
        </View>
        ))}
        {/* <Popover
            isVisible={isPopoverVisible}
            onRequestClose={() => setPopoverVisible(false)}
            fromView={popoverAnchor}>
            <View style={styles.popover}>              
                <TouchableOpacity onPress={handleEditComment}>
                    <View style={styles.popoverItem}>
                        <Icon name="edit" size={35} color="black" />
                        <Text style={{ fontSize: 16, marginTop: 8, color: 'black' }}>{language === 'vn' ? 'Sửa bình luận' : 'Edit comment'}</Text>
                    </View>
                </TouchableOpacity>           
                <TouchableOpacity onPress={handleDeleteComment}>
                    <View style={styles.popoverItem}>
                        <Icon name="trash-alt" size={35} color="black" />
                        <Text style={{ fontSize: 16, marginTop: 8, color: 'black' }}>{language === 'vn' ? 'Xóa bình luận' : 'Delete comment'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
      </Popover> */}

    </View>
  )
}

export default Comment

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 3,       
    },
    textContainer:{
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 4,
        paddingHorizontal: 8
    },
    image:{
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 22,
    },
    popover:{
        backgroundColor: 'white', 
        borderRadius: 10, 
        padding: 16, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    popoverItem:{
        alignItems: 'center',
        margin: 20
    },
    replyStyle:{
        marginLeft: 55,
        textDecorationLine: 'underline'
    }
})