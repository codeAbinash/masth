import {NavigationContainer} from '@react-navigation/native'
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack'
import React, {useEffect} from 'react'
import {Dimensions, SafeAreaView, StatusBar, Text} from 'react-native'
import NavigationBarColor from 'react-native-navigation-bar-color'
import {PaperProvider} from 'react-native-paper'
import Home from './src/screens/Home'
import Notifications from './src/screens/Notifications'

const Stack = createStackNavigator()

export default function App(): React.JSX.Element {
  useEffect(() => {
    NavigationBarColor('#ffffff', true)
  }, [])

  return (
    // <GestureHandlerRootView style={{flex: 1}}>
    <SafeAreaView style={{flex: 1, height: height, backgroundColor: 'red'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <PaperProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
    // </GestureHandlerRootView>
  )
}

function Profile() {
  return <Text>Profile</Text>
}

function Settings() {
  return <Text>Settings</Text>
}

// const config: TransitionSpec = {
//   animation: 'spring',
//   config: {
//     stiffness: 1000,
//     damping: 50,
//     mass: 3,
//     overshootClamping: false,
//     restDisplacementThreshold: 0.01,
//     restSpeedThreshold: 0.01,
//   },
// }

// const closeConfig: TransitionSpec = {
//   animation: 'timing',
//   config: {
//     duration: 200,
//     easing: Easing.linear,
//   },
// }

const {width, height} = Dimensions.get('window')

function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureResponseDistance: width,
      }}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Notifications' component={Notifications} />
      <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}} />
      <Stack.Screen name='Settings' component={Settings} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}
