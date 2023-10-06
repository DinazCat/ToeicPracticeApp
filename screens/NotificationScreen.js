import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, } from 'react-native'
import React from 'react'
import Notification from '../components/Notification'
import Ionicons from 'react-native-vector-icons/Ionicons';
const NotificationScreen = ({navigation}) => {
  const notifications = [
    {
      Mess: 'ahudbs replied your comment in topic Share ...',
      Time: 'Mon June 12 2023 at 14:02 PM'
    },
    {
      Mess: 'ahudbs commented on your post in topic Share ...',
      Time: 'Mon June 12 2023 at 14:02 PM'
    },
  ]
  return (
    <View
      style={[styles.container,]}>
      <View style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#9ACC1C'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back-outline'} style={{fontSize: 30, color : '#222', padding: 5}}/>   
        </TouchableOpacity>
        <Text
          style={styles.headertext}>
          {'Notifications'}
        </Text>
      </View>
      <View style={{height: 1, backgroundColor: '#DDD'}} />
      <FlatList
        data={notifications}
        renderItem={({item, index}) => (
          <Notification
            key={index}
            item={item}
          />
        )}
      />
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headertext: {
    fontSize: 20,
    marginLeft: 5,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: '600',
    color: '#222',
    
  },
})