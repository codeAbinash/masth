import React from 'react'
import {SafeAreaView, StatusBar, Text, TouchableOpacity, View} from 'react-native'
import {PaperProvider} from 'react-native-paper'
import Hello from './src/Hello'
import Icon from 'react-native-vector-icons/Entypo'

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <SafeAreaView>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <View className='h-full items-center justify-between bg-white'>
          <View />
          <View className='flex items-center justify-center'>
            <Icon name='folder-music' size={180} color='black' style={{marginBottom: 20}} />
            <Text className='text-center font-mono text-4xl font-bold text-black'>Welcome to RN</Text>
            <Text className='p-4 text-center text-neutral-500'>
              A React Native Boilerplate with TypeScript, Tailwind CSS, React Navigation, and React Native Paper
            </Text>
          </View>
          <View className='w-full p-4'>
            <TouchableOpacity
              activeOpacity={0.8}
              className='flex w-full items-center justify-center rounded-2xl bg-black'
              style={{padding: 17}}
              onPress={() => console.log('Button Clicked')}>
              <Text className='text-white' style={{fontSize: 17}}>
                Get Started
              </Text>
            </TouchableOpacity>
            <Text className='mb-2 mt-2 text-center text-gray-600'>
              By continuing you are accepting our Terms and Conditions
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <Hello />
    </PaperProvider>
  )
}

export default App
