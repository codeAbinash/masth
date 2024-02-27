import { SmallButton } from '@components/Button'
import { PaddingTop } from '@components/SafePadding'
import SmallProfile, { RightSideSmallProfile } from '@components/SmallProfile'
import Tabs from '@components/Tabs'
import LockIcon from '@icons/lock.svg'
import SwapIcon from '@icons/swap.svg'
import { colors } from '@utils/colors'
import { StackNav } from '@utils/types'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

function LeftUI() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Left Title</Text>
      <Text style={styles.subtitle}>Subtitle</Text>
      <Text style={styles.body}>Body text</Text>
      <Text style={styles.caption}>Caption text</Text>
      <Text style={styles.overline}>Overline text</Text>
      <Text style={styles.title}>Left Title</Text>
      <Text style={styles.subtitle}>Subtitle</Text>
      <Text style={styles.body}>Body text</Text>
      <Text style={styles.caption}>Caption text</Text>
      <Text style={styles.overline}>Overline text</Text>
      <Text style={styles.title}>Left Title</Text>
      <Text style={styles.subtitle}>Subtitle</Text>
      <Text style={styles.body}>Body text</Text>
      <Text style={styles.caption}>Caption text</Text>
      <Text style={styles.overline}>Overline text</Text>
      <Text style={styles.title}>Left Title</Text>
      <Text style={styles.subtitle}>Subtitle</Text>
      <Text style={styles.body}>Body text</Text>
      <Text style={styles.caption}>Caption text</Text>
      <Text style={styles.overline}>Overline text</Text>
      <Text style={styles.title}>Left Title</Text>
      <Text style={styles.subtitle}>Subtitle</Text>
      <Text style={styles.body}>Body text</Text>
      <Text style={styles.caption}>Caption text</Text>
      <Text style={styles.overline}>Overline text</Text>
      <Text style={styles.title}>Left Title</Text>
      <Text style={styles.subtitle}>Subtitle</Text>
      <Text style={styles.body}>Body text</Text>
      <Text style={styles.caption}>Caption text</Text>
      <Text style={styles.overline}>Overline text</Text>
    </View>
  )
}

function RightUI() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Right Title</Text>
      <Text style={styles.subtitle}>Subtitle</Text>
      <Text style={styles.body}>Body text</Text>
      <Text style={styles.caption}>Caption text</Text>
      <Text style={styles.overline}>Overline text</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
  caption: {
    fontSize: 12,
    fontWeight: '300',
    marginBottom: 10,
  },
  overline: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
})
export default function Wallet({ navigation }: { navigation: StackNav }) {
  return (
    <ScrollView style={{ backgroundColor: colors.bgSecondary, flex: 1 }} className='p-5'>
      <PaddingTop />
      <SmallProfile RightSide={<RightSideSmallProfile navigation={navigation} />} />
      <View className='mt-3 flex-row items-center justify-between'>
        <View className='flex flex-row'>
          <Text className='text-neutral-500' style={{ fontSize: 30 }}>
            Your,{' '}
          </Text>
          <Text style={{ fontSize: 30 }}>Wallet</Text>
        </View>
        <TouchableOpacity
          className='rounded-full border border-neutral-200 bg-white p-2.5'
          onPress={() => navigation.navigate('Transactions')}
        >
          <SwapIcon height={18} width={18} />
        </TouchableOpacity>
      </View>
      <View>
        <WalletBalance />
      </View>
      <Tabs
        tabs={[
          { title: 'Send', UI: <LeftUI /> },
          { title: 'Receive', UI: <RightUI /> },
        ]}
      />
    </ScrollView>
  )
}

function WalletBalance() {
  return (
    <View className='bg-yellowPrimary mt-4 rounded-3xl p-5'>
      <Text className='text-onYellow text-lg'>Wallet Balance</Text>
      <View className='mt-3 flex-row items-end'>
        <Text className='text-onYellow text-5xl'>{(6860.306).toLocaleString()}</Text>
        <Text className='text-onYellow mb-1.5 ml-1 text-2xl'>MST</Text>
      </View>
      <View className='mt-3 flex-row items-center justify-between' style={{ gap: 15 }}>
        <View style={{ flex: 0.5 }}>
          <SmallButton title='Withdraw' SvgIcon={LockIcon} />
        </View>
        <Text style={{ flex: 0.5, fontSize: 17 }} className='text-onYellow'>
          MST/USD 0.99
        </Text>
      </View>
    </View>
  )
}
