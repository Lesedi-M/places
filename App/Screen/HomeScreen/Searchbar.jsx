import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const Searchbar = () => {
  return (
    <View>
         <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}
            query={{
                key: 'YOUR API KEY',
                language: 'en',
            }}
    />
    </View>
  )
}

export default Searchbar