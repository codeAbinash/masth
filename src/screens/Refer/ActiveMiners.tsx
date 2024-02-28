import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const activeMiners = [
  {
    name: 'Abinash Karmakar',
    username: 'codeAbinash',
    profile_pic: 'https://picsum.photos/100',
    amount: 0.001,
  },
  {
    name: 'John Doe',
    username: 'johnDoe',
    profile_pic: 'https://picsum.photos/101',
    amount: 0.001,
  },
  {
    name: 'Sample User 1',
    username: 'sampleUser1',
    profile_pic: 'https://picsum.photos/102',
    amount: 0.001,
  },
  {
    name: 'Sample User 2',
    username: 'sampleUser2',
    profile_pic: 'https://picsum.photos/103',
    amount: 0.001,
  },
  {
    name: 'Sample User 3',
    username: 'sampleUser3',
    profile_pic: 'https://picsum.photos/104',
    amount: 0.001,
  },
  {
    name: 'Sample User 4',
    username: 'sampleUser4',
    profile_pic: 'https://picsum.photos/105',
    amount: 0.001,
  },
  {
    name: 'Sample User 5',
    username: 'sampleUser5',
    profile_pic: 'https://picsum.photos/106',
    amount: 0.001,
  },
  {
    name: 'Sample User 6',
    username: 'sampleUser6',
    profile_pic: 'https://picsum.photos/107',
    amount: 0.001,
  },
  {
    name: 'Sample User 7',
    username: 'sampleUser7',
    profile_pic: 'https://picsum.photos/108',
    amount: 0.001,
  },
  {
    name: 'Sample User 8',
    username: 'sampleUser8',
    profile_pic: 'https://picsum.photos/109',
    amount: 0.001,
  },
  {
    name: 'Sample User 9',
    username: 'sampleUser9',
    profile_pic: 'https://picsum.photos/110',
    amount: 0.001,
  },
]

export default function ActiveMiners() {
  return (
    <View style={{ gap: 10, marginTop: 20, paddingBottom: 50 }}>
      {activeMiners.map((miner, index) => (
        <Miner key={index} {...miner} />
      ))}
    </View>
  )
}

function Miner({ name, username, profile_pic }: { name: string; username: string; profile_pic: string }) {
  return (
    <TouchableOpacity activeOpacity={0.6} className='flex-row items-center justify-between rounded-3xl bg-white p-3.5'>
      <View className='flex-row items-center gap-3' style={{ flex: 1 }}>
        <Image source={{ uri: profile_pic }} style={{ width: 50, height: 50, borderRadius: 25 }} />
        <View style={{ flex: 1 }}>
          <Text className='text-lg' numberOfLines={1}>
            {name}
          </Text>
          <Text className='text-neutral-600' style={{ fontSize: 16 }}>
            @{username}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
