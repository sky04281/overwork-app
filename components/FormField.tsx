import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

interface FormFieldProps {
    title: string
    value: string
    placeholder: string
    keyBoardType?: KeyboardTypeOptions
    isPassword?: boolean
    onChangeText: (text: string) => void
}

const FormField = (props: FormFieldProps) => {
    const [isHidden, setIsHidden] = useState(true)
    return (
        <View className="w-full space-y-2 my-2">
            <Text className="text-xl font-semibold">{props.title}</Text>
            <View className="w-full h-10 flex-row items-center border-2 border-black focus:border-blue-500 rounded-md">
                <TextInput
                    className="flex-1 px-2"
                    value={props.value}
                    placeholder={props.placeholder}
                    onChangeText={props.onChangeText}
                    keyboardType={
                        props.keyBoardType ? props.keyBoardType : 'default'
                    }
                    secureTextEntry={props.isPassword && isHidden}
                />
                {props.isPassword && (
                    <Text
                        className="text-blue-500 mx-1"
                        onPress={() => setIsHidden(!isHidden)}
                    >
                        {isHidden ? (
                            <MaterialCommunityIcons
                                name="eye-off"
                                size={20}
                                color="black"
                            />
                        ) : (
                            <MaterialCommunityIcons
                                name="eye"
                                size={20}
                                color="black"
                            />
                        )}
                    </Text>
                )}
            </View>
        </View>
    )
}

export default FormField
