import { View, Text, TextInput, KeyboardType } from 'react-native'

interface BasicInfoFieldProps {
    title: string
    value: string
    type?: KeyboardType
    editable?: boolean
    onChangeText?: (e: string) => void
}

const BasicInfoField = ({ ...props }: BasicInfoFieldProps) => {
    return (
        <View className="w-full my-3 mr-[5vw] flex-row justify-center items-center">
            <View className="flex justify-center h-[5vh] w-[40vw]">
                <Text className="text-xl px-2 font-semibold">
                    {`${props.title}：`}
                </Text>
            </View>
            <View
                className={`w-[50vw] h-[5vh] flex justify-center pb-1 ${
                    props.editable
                        ? 'border focus:border-blue-500 rounded-md'
                        : ''
                }`}
            >
                <TextInput
                    className="pl-2 text-black text-xl focus:text-blue-500"
                    value={props.value}
                    keyboardType={props.type ? props.type : 'default'}
                    editable={props.editable}
                    onChangeText={props.onChangeText}
                />
            </View>
        </View>
    )
}

export default BasicInfoField
