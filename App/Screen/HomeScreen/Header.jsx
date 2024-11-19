import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import {FontAwesome} from '@expo/vector-icons'

const Header = () => {
    const {user}=useUser();
  return (
    <View style={styles.container}>
        <Image 
            source={{uri:user?.imageUrl}}
            style={{width:45,height:45,borderRadius:99}}
        />
        {/* <Image 
            source={require('./../../../assets/images/evc.png')}
            style={{width:100, height:75,objectFit:'contain'}}
        /> */}
        <FontAwesome name="bars" color="black" size={26}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    }
})

export default Header