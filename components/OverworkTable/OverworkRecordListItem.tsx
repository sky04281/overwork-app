import { useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import OVERWORKSCORE from '@/types/overworkScore'

export default function OverworkRecordListItem({
    title,
    personal,
    working,
}: {
    title: string
    personal: number
    working: number
}) {
    const [show, setShow] = useState(false)

    return (
        <View className="flex justify-center items-center">
            <TouchableOpacity onPress={() => setShow(!show)}>
                <View className="flex-row items-center justify-between w-[95vw] space-x-1 border-b-[1px] pt-1">
                    <Text className="text-lg">{title}</Text>
                    <AntDesign
                        name={show ? 'caretup' : 'caretdown'}
                        size={16}
                        color="black"
                        onPress={() => setShow(!show)}
                    />
                </View>
                {show && (
                    <View className="flex-col items-start space-y-1 m-1">
                        <Text className="text-base">
                            Personal rating: {personal}
                        </Text>
                        <Text className="text-base">
                            Working rating: {working}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    )
}
