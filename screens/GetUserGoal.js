import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

import FormInput from '../components/FormInput';

const GetUserGoal = ({navigation}) => {
    
  return (
  <ScrollView>
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome to our app</Text>
      <Image source={require('../assets/penguin.png')} style={styles.img} />
      <View style={styles.cont3}>
      <Text style={styles.text}>To achieve better training results, please let us know some information below.</Text>
        <Text style={styles.title}>Enter Your Expected Exam Date</Text> 
        <FormInput
              //lbValue={email}
              //onChangeText={(userEmail) => setEmail(userEmail)}
              iconType="calendar"
              autoCapitalize="none"
              autoCorrect={false}
              editable={false}
        /> 
        <Text style={styles.title}>Enter Your Target Score</Text>
        <FormInput
              //lbValue={email}
              //onChangeText={(userEmail) => setEmail(userEmail)}
              iconType="bullseye"
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
        /> 
    
        <Text style={styles.title}>Enter Your Current Score</Text>
        <FormInput
              //lbValue={email}
              //onChangeText={(userEmail) => setEmail(userEmail)}
              iconType="clipboard"
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
        /> 
        <Text style={styles.text}>If you don't know your current level, take a mini test to estimate your current score 
            <Text style={{fontWeight: 'bold', color: '#000'}}> here!</Text>       
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.text, {fontStyle: 'italic', textDecorationLine: 'underline'}]}>
            Later
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.text, {fontStyle: 'italic', textDecorationLine: 'underline'}]}>
            Save
          </Text>
        </TouchableOpacity>
        </View>     
      </View>
    </View>
  </ScrollView>

  )
}

export default GetUserGoal

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      padding: 20,
    },
    headerText:{
      fontSize: 24,
      color: 'green',
    },
    title: {
      fontSize: 17,
      marginTop: 10,
      color: '#555'
    },
    textinput: {
      fontSize: 17,
      marginTop: 10,
      paddingHorizontal: 10,
      backgroundColor: "#fff",
      borderRadius: 30,
      borderWidth: 2,
      borderColor: '#ccc'
    },
    btn: {
      backgroundColor: "#ECD352",
      paddingHorizontal: 60,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10,
      borderRadius: 30,
    },
    btnText: {
      fontSize: 18,
      color: "#FFF",
    },
    cont1: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      justifyContent: "center",
      marginTop: 30,

    },
    img: {
      height: 200,
      width: 200,
      marginTop: 20,
      marginBottom: 10      
    },
    cont3: {
      flex: 1,
      backgroundColor: "#FFF",
      width: "100%",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30
    },
    text:{
      textAlign: 'center',
      marginTop: 20,
      fontSize: 15
    }
})