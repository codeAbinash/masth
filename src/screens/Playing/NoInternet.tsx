import LottieView from 'lottie-react-native'
import React from 'react'
import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'

const { height } = Dimensions.get('window')

export default function NoInternet() {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <SafeAreaView style={styles.containerStyle} className='bg-bgSecondary'>
        <View>
          <LottieView source={require('@assets/anim/no-internet.lottie')} autoPlay loop style={{ width: '70%', aspectRatio: 1 }} />
          <Text style={{ fontSize: 20 }} className='mt-5 text-center'>
            No Internet Connection
          </Text>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
  },
})
