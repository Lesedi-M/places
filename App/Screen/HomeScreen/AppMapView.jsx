import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useContext } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { UserLocationContext } from '../../Context/UserLocationContext'

const AppMapView = () => {
    const {location, setLocation} = useContext(UserLocationContext)
  return location?.latitude&&(
    <View>
        <MapView 
            style={styles.map}
            showsUserLocation={false}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker 
            coordinate={{ 
                latitude: location?.latitude, 
                longitude: location?.longitude 
                }} >
                    <Image 
                        source={require('../../../assets/images/car-icon.png')}
                        style={{width:60,height:60}}
                    />
          </Marker>
        </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    map:{
        width:'100%',
        height:'100%'
    }
})

export default AppMapView