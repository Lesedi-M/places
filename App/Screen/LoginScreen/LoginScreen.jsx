import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import * as WebBrowser from 'expo-web-browser'
import { useWarmUpBrowser } from "../../../hooks/warmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";


WebBrowser.maybeCompleteAuthSession()
const LoginScreen = () => {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress= async()=>{
    try{
      const {createdSessionId, signIn, signUp, setActive}= await startOAuthFlow();

      if(createdSessionId){
        setActive({session: createdSessionId});
      }else {
        //
      }
    }catch (err){
      console.error("OAuth error", err)
    }
  }

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:50
      }}
    >
      <Image
        style={styles.logoImage}
        source={require("./../../../assets/images/evc.png")}
      />

      <Image
        style={styles.bgImage}
        source={require('./../../../assets/images/ev-charging.webp')}
      /> 

      <View style={{padding:20}}>
        <Text style={styles.heading}>Your Ultimate EV charging Station Finder App</Text>
        <Text style={styles.desc}>Find EV charging station near you, plan your trip and so much more in just one click</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={onPress}  
        >
          <Text style={{
            textAlign:'center',
            color:Colors.WHITE,
            fontFamily:'serrat',
            fontSize:17
          }}>Login with Google</Text>
        </TouchableOpacity>
      </View>     
    </View>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    width: 500,
    height: 100,
    objectFit: "contain",
  },
  bgImage:{
    width:'100%',
    height:220,
    marginTop:20,
    objectFit:'cover'
  },
  heading:{
    fontSize:25,
    fontFamily:'serrat-bold',
    textAlign:'center',
    marginTop:20
  },
  desc:{
    fontSize:17,
    fontFamily:'serrat',
    marginTop:25,
    textAlign:'center',
    color:Colors.GRAY
  },
  button:{
    backgroundColor:Colors.PRIMARY,
    padding:16,
    display:'flex',
    borderRadius:99,
    marginTop:70
  }
});

export default LoginScreen;
