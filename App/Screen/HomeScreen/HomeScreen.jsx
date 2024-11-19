import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AppMapView from './AppMapView'
import Header from './Header'
import Searchbar from './Searchbar'

const HomeScreen = () => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Header/>
        <Searchbar/>
      </View>
      <AppMapView/>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer:{
    position:'absolute',
    zIndex:10,
    padding:10,
    width:'100%',
    paddingHorizontal:20
  }
})

export default HomeScreen