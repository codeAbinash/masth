import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

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
      <View className='mt-5 flex-row items-center justify-between rounded-2xl bg-white p-1' style={{ gap: 5 }}>
        {tabs.map((tab, index) => (
          <View style={{ flex: 1 }} key={index}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setActiveTab(index)}
              className={`rounded-2xl ${activeTab === index ? 'bg-neutral-200' : ''} p-3`}
            >
              <Text className={`text-center ${activeTab === index ? 'font-bold' : ''}`} style={{ fontSize: 17 }}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {tabs.map((tab, index) => (
        <View style={{ display: activeTab === index ? 'flex' : 'none' }} key={index}>
          {tab.UI}
        </View>
      ))}
    </>
  )
}
