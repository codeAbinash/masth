import Gradient from '@components/Gradient'
import { PaddingBottom } from '@components/SafePadding'
import MasthGames from '@icons/MasthGames.svg'
import SendIcon from '@icons/sendIcon.svg'
import React, { useEffect } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import type { TouchableOpacityProps } from 'react-native-gesture-handler'
import { Bold, Medium, Pumpkin, SemiBold } from './fonts'
import { UNITY_GAME_ID } from '@utils/constants'
import UnityAds from 'react-native-unity-ads-monetization'
import { AdState } from '@utils/types'
import ViewShot from 'react-native-view-shot'
import Share from 'react-native-share'

export default function Claim() {
  const [adState, setAdState] = React.useState<AdState>(AdState.NOT_LOADED)
  const [imageUri, setImageUri] = React.useState<string>()
  const shotRef = React.useRef<ViewShot>(null)

  function loadAd() {
    console.log('Loading ad')
    UnityAds.initialize(UNITY_GAME_ID, true).then((_) => UnityAds.loadAd('Interstitial_Android'))
    UnityAds.setOnUnityAdsLoadListener({
      onAdLoaded: (placementId) => {
        console.log('Ad loaded', placementId)
        setAdState(AdState.LOADED)
      },
      onAdLoadFailed: function (placementId: string, message: string): void {
        setAdState(AdState.FAILED)
        console.error(`UnityAds.onAdLoadFailed: ${placementId}, ${message}`)
      },
    })
    UnityAds.setOnUnityAdsShowListener({
      onShowStart: (placementId: string) => {
        console.log(`UnityAds.onShowStart: ${placementId}`)
      },
      onShowComplete: (placementId: string, state: 'SKIPPED' | 'COMPLETED') => {
        console.log(`UnityAds.onShowComplete: ${placementId}, ${state}`)
      },
      onShowFailed: (placementId: string, message: string) => {
        console.error(`UnityAds.onShowFailed: ${placementId}, ${message}`)
      },
      onShowClick: (placementId: string) => {
        console.log(`UnityAds.onShowClick: ${placementId}`)
      },
    })
  }

  function showAd() {
    UnityAds.showAd('Rewarded_Android')
  }

  useEffect(() => {
    loadAd()
  }, [])

  function handleClaim() {
    if (adState === AdState.LOADED) {
      showAd()
    }
  }

  function handleSend() {
    console.log('Sending...')

    shotRef.current?.capture &&
      shotRef.current?.capture().then((uri) => {
        // Handle the captured URI
        setImageUri(uri)
        Share.open({ url: uri, message: 'Hey there! I just earned some MST on MasthGames. Check it out!' })
      })
  }

  return (
    <>
      <ViewShot
        ref={shotRef}
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'space-between',
          padding: 20,
        }}
      >
        <View>
          <MasthGames className='mx-auto mt-10' height={150} width={150} />
          <Image source={{ uri: 'https://wallpaperaccess.com/full/306739.jpg' }} className='aspect-video w-full rounded-2xl' />
          <Pumpkin className='mt-10 text-center text-amber-500' style={{ fontSize: 50 }}>
            Earned
          </Pumpkin>
          <SemiBold className='mt-2 text-center text-4xl text-black'>20 MST</SemiBold>
        </View>
        <View className='mt-5'>
          <View className='flex-row justify-between'>
            <Medium className='text-lg text-black'>Claimed</Medium>
            <Bold className='text-lg text-black'>20 MST</Bold>
          </View>
          <View className='flex-row justify-between'>
            <Medium className='text-lg text-black'>Boost Level</Medium>
            <Bold className='text-lg text-black'>2X</Bold>
          </View>
          <View className='flex-row justify-between'>
            <Medium className='text-lg text-black'>Global Ranking</Medium>
            <Bold className='text-lg text-amber-500'>#19</Bold>
          </View>
          <View className='flex-row justify-between'>
            <Medium className='text-lg text-black'>Coin/Minutes</Medium>
            <Bold className='text-lg text-amber-500'>2 MST</Bold>
          </View>
        </View>
        <View className='mt-5 flex-row pb-10' style={{ gap: 10 }}>
          <GradientButton className='flex-1' onPress={handleClaim}>
            <Pumpkin className='text-center text-2xl text-white' style={styles.fontOutline}>
              Claim
            </Pumpkin>
          </GradientButton>
          <GradientButton onPress={handleSend}>
            <SendIcon className='px-7' height={30} width={30} />
          </GradientButton>
          <PaddingBottom />
        </View>
      </ViewShot>
    </>
  )
}

const styles = StyleSheet.create({
  fontOutline: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
})

type GradientButtonProps = TouchableOpacityProps

function GradientButton({ children, ...props }: GradientButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      <Gradient className='items-center justify-center rounded-xl border py-3.5'>{children}</Gradient>
    </TouchableOpacity>
  )
}
