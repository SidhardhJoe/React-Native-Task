import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Text>Profile Page design not given</Text>
      <Text>Project created by Sidhardh Joe Bencylal</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        paddingLeft:"10%"
    }
})