import { ViewProps, View, TouchableOpacity, Text } from 'react-native'

export type RadioButtonOption = {
  key: string
  text: string
}
export interface RadioButtonProps extends ViewProps {
  options: RadioButtonOption[]
  value: string
  onChange: (value: string) => void
}

const RadioButton: React.FC<RadioButtonProps> = ({ options, value, onChange, style }) => {
  return (
    <View className='flex-row flex-wrap items-center gap-3' style={style}>
      {options.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            className={`items-center justify-center rounded-2xl border-neutral-300 bg-white p-2 px-5 ${
              value === item.key ? 'border-yellowPrimary bg-yellowPrimary' : ''
            }`}
            onPress={() => onChange(item.key)}
            style={{ borderWidth: 1.5 }}
          >
            <Text className='text-black' style={{ fontSize: 16 }}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default RadioButton
