  
import React from 'react'
import {Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from './src/navigation/index'
import {Provider as StoreProvider} from 'react-redux'
import store from './src/reducer/store'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import { useEffect,useState } from 'react'
import * as firebaseui from 'firebaseui'
import  firebase  from 'firebase'
import 'firebaseui/dist/firebaseui.css'
import { View, StyleSheet,Text } from 'react-native'

const firebaseConfig = {
  apiKey: "AIzaSyAWuqZy0m_5AYUl6xmcWKAba_xCWCn2DSA",
  authDomain: "todoapp-574b2.firebaseapp.com",
  projectId: "todoapp-574b2",
  storageBucket: "todoapp-574b2.appspot.com",
  messagingSenderId: "461534162768",
  appId: "1:461534162768:web:36662fa3809a6599284655",
  measurementId: "G-1C8DTVC0K5"
};
export default function App(){

const [shown, Setauthorized] = useState(false)



  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    const uiConfig = {
      signInOptions: [{
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: 'image',
          size: 'normal',
          badge: 'bottomleft'
        },
        defaultCountry: 'VN'
      }],
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl){
          alert('successful');
          Setauthorized(true)

          return true;
        }
      },
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);

  }, [])   
if(!shown)
{
  return (

    <View nativeID='firebaseui-auth-container'>

    </View>
    )

}

return(
  <StoreProvider store = {store}>
  <PaperProvider>
    <AppNavigator/>
  </PaperProvider>
  </StoreProvider>

)
  
  
  }

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
  },
  main: {
      justifyContent: 'center',
      flex: 1,
  },
})
