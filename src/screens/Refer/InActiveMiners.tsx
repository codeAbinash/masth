import React from 'react'
import { View } from 'react-native'
import Miner from './Miner'

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
        <Miner key={index} {...miner} bellIcon />
      ))}
    </View>
  )
}
