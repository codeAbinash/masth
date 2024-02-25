import {NavigationContainer, NavigationProp, ParamListBase} from '@react-navigation/native'
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack'
import React, {useEffect} from 'react'
import {Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import NavigationBarColor from 'react-native-navigation-bar-color'
import {PaperProvider} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'
import {create} from 'zustand'
import Hello from './src/Hello'
import icons from './src/assets/icons/icons'
import {Button} from './src/components/Button'
import Notifications from './src/screens/Notifications'

const Stack = createStackNavigator()
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
})
type Store = {
  count: number
  inc: () => void
}

const useStore = create<Store>()(set => ({
  count: 0,
  inc: () => set(state => ({count: state.count + 1})),
}))

export default function App(): React.JSX.Element {
  useEffect(() => {
    NavigationBarColor('#ffffff', true)
  }, [])

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <PaperProvider>
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
            <Hello />
            <Navigation />
          </PaperProvider>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
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
      <Stack.Screen name='Home' component={Demo} />
      <Stack.Screen name='Notifications' component={Notifications} />
      <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}} />
      <Stack.Screen name='Settings' component={Settings} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

function Demo({navigation}: {navigation: NavigationProp<ParamListBase>}) {
  const {count, inc} = useStore()

  return (
    <SafeAreaView>
      <View className='h-full items-center justify-between bg-white'>
        <View />
        <View className='flex items-center justify-center'>
          <Image source={icons.appIcon} style={{width: width * 0.65 * 1.37, height: width * 0.65}} />
          <Text className='text-center font-mono text-4xl font-bold text-black'>Welcome</Text>
          <Text className='p-4 px-10 text-center text-lg text-neutral-500'>
            There are many variations of passages of Lorem Ipsum available
          </Text>
        </View>
        <View className='w-full p-4'>
          <Button title='Sign In' onPress={() => navigation.navigate('Notifications')} icon={icons.appIcon} />
          <Button
            title='Create Account'
            variant='outline'
            onPress={() => inc()}
            classNames='mt-4'
            IconProvider={Icon}
            icon='share-2'
          />

          <Text className='mt-2 text-center text-gray-600'>
            By continuing you are accepting our Terms and Conditions
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
