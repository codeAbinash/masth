import { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

interface Tab {
  title: string
  UI: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
}

export default function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <View
        className='mt-5 flex-row items-center justify-between rounded-2xl border-neutral-300 p-1'
        style={{ gap: 5, borderWidth: 1.5 }}
      >
        {tabs.map((tab, index) => (
          <View style={{ flex: 1 }} key={index}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setActiveTab(index)}
              className={`rounded-xl ${activeTab === index ? 'bg-neutral-300' : ''} p-2.5`}
            >
              <Text className='text-center' style={{ fontSize: 17 }}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View className='mt-5'>{tabs[activeTab].UI}</View>
    </>
  )
}
