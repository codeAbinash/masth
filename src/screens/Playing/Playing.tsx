import { useNetInfo } from '@react-native-community/netinfo'
import type { RouteProp } from '@react-navigation/native'
import type { StackNav } from '@utils/types'
import { height, width } from '@utils/utils'
import LottieView from 'lottie-react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import { BackHandler, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'
import NoInternet from './NoInternet'
import Images from '@assets/images/images'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type PlayingParamList = {
  url: string
}

type ParamList = {
  Playing: PlayingParamList
}

export default function Playing({ navigation, route }: { navigation: StackNav; route: RouteProp<ParamList, 'Playing'> }) {
  const webViewRef = useRef<WebView>(null)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const netInfo = useNetInfo()
  const [canGoBack, setCanGoBack] = React.useState(false)
  const bottom = useSafeAreaInsets().bottom

  const onAndroidBackPress = useCallback((): boolean => {
    if (!canGoBack) return false // let the default behavior happen
    if (webViewRef.current) {
      webViewRef.current.goBack()
      return true // prevent default behavior (exit app)
    }
    return true
  }, [canGoBack])

  useEffect((): (() => void) | undefined => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress)
      return (): void => {
        BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress)
      }
    }
  }, [onAndroidBackPress])

  // if (true) return <NoInternet />
  if (netInfo.isConnected === false) return <NoInternet />

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='transparent' />
      <SafeAreaView className='flex-1 bg-white'>
        <LoadingUI isLoaded={isLoaded} />
        <WebView
          ref={webViewRef}
          source={{ uri: route.params.url }}
          style={{ height: height, width: width, backgroundColor: 'white' }}
          allowsFullscreenVideo={true}
          onLoad={() => setIsLoaded(true)}
          onLoadProgress={({ nativeEvent }) => {
            setCanGoBack(() => nativeEvent.canGoBack)
          }}
        />
        <Image
          source={Images.masthGames}
          style={{
            height: 45,
            width: 45,
            position: 'absolute',
            bottom: bottom,
            right: bottom + 5,
          }}
        />
      </SafeAreaView>
    </>
  )
}

function LoadingUI({ isLoaded }: { isLoaded: boolean }) {
  return (
    <>
      <View style={[styles.loadingStyle, { display: isLoaded ? 'none' : 'flex' }]}>
        <LottieView
          source={require('@assets/anim/loading.lottie')}
          style={{
            width: 100,
            height: 100,
          }}
          autoPlay
          loop
        />
        <Text className='mt-5 text-base'>Loading Game...</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})
