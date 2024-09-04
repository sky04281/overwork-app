import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'

interface BodyInfoListItemProps {
    title: string
    className?: string
}

const BodyInfoListItem = ({ ...props }: BodyInfoListItemProps) => {
    const [show, setShow] = React.useState(false)
    return (
        <View>
            <TouchableOpacity onPress={() => setShow(!show)}>
                <View className="flex-row w-[95vw] items-center justify-between space-x-1 border-b-[1px] pt-1">
                    <Text className="text-lg">{props.title}</Text>
                    <AntDesign
                        name={show ? 'caretup' : 'caretdown'}
                        size={16}
                        color="black"
                        onPress={() => setShow(!show)}
                    />
                </View>
                {show && (
                    <View className="flex-col items-start space-y-1">
                        <Text className="text-base">平均心率: 100 bpm</Text>
                        <Text className="text-base">血壓: 120/80 mmHg</Text>
                        <Text className="text-base">步數: 10,000 steps</Text>
                        <Text className="text-base">睡眠時長: 6 hr</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default BodyInfoListItem
