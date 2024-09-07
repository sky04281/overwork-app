import { useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'

export default function OverworkRecordListItem({ title }: { title: string }) {
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
                    <View className="flex-col items-start space-y-1 mb-1">
                        <Text className="text-base">個人評分: 55</Text>
                        <Text className="text-base">工作評分: 66</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    )
}
