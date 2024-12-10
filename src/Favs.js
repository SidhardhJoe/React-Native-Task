import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Favs = () => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Text>Profile Page design not given</Text>
      <Text>Project created by Sidhardh Joe Bencylal</Text>
    </View>
  )
}

export default Favs

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'grey', 
        paddingLeft:"10%"
    }
})