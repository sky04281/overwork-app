import { View, Text, TextInput, KeyboardType } from 'react-native'

interface BasicInfoFieldProps {
    title: string
    subtitle?: string
    unit?: string
    value: string
    type?: 'default' | 'number-pad'
    editable: boolean
    onChangeText: (text: string) => void
    containerStyle?: string
    placeholder?: string
}

const BasicInfoField: React.FC<BasicInfoFieldProps> = ({
    title,
    subtitle,
    unit,
    value,
    type = 'default',
    editable,
    onChangeText,
    containerStyle = '',
    placeholder,
}) => {
    return (
        <View
            className={`p-4 rounded-xl transition-all duration-200 ${containerStyle}`}
        >
            <View className="flex-row items-center gap-1">
                <Text className="text-gray-700 font-bold text-base">
                    {title}
                </Text>
                {subtitle && (
                    <Text className="text-gray-500 text-sm">({subtitle})</Text>
                )}
            </View>
            <View className="flex-row items-center mt-1">
                <TextInput
                    className={`flex-1 text-base ${
                        editable
                            ? 'text-black border-b border-gray-300 pb-1'
                            : 'text-gray-500'
                    }`}
                    value={value}
                    editable={editable}
                    keyboardType={type}
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    onChangeText={onChangeText}
                />
                {unit && (
                    <Text className="text-gray-500 ml-2 text-base">{unit}</Text>
                )}
            </View>
        </View>
    )
}

export default BasicInfoField
