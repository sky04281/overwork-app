import { View, Text, TextInput, KeyboardType, Keyboard } from 'react-native'
import React, { Key } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
interface BasicInfoFieldProps {
    title: string
    value: string
    type?: KeyboardType
    editable?: boolean
    onChangeText?: (e: string) => void
}

const BasicInfoField = ({ ...props }: BasicInfoFieldProps) => {
    return (
        <View className="w-full my-2 px-4 flex-row justify-between items-center">
            <Text className="text-lg px-2 font-semibold w-[35vw]">
                {`${props.title}：`}
            </Text>
            <View
                className={`w-[55vw] h-[5vh] flex-row items-center ${
                    props.editable
                        ? 'border border-black focus:border-blue-500 rounded-md'
                        : ''
                }`}
            >
                <TextInput
                    className="w-full h-full p-2 items-center font-medium text-base text-black focus:text-blue-500"
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
