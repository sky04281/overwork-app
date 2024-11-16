import { useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import OVERWORKSCORE from '@/types/overworkScore'

interface OverworkRecordListItemProps {
    title: string
    personal: number
    working: number
}

const OverworkRecordListItem = ({
    title,
    personal,
    working,
}: OverworkRecordListItemProps) => {
    return (
        <View className="bg-white rounded-xl shadow-sm border border-gray-200 mb-3 p-4">
            <View className="flex-row justify-between items-center">
                <Text className="text-base font-bold text-gray-700">
                    {title}
                </Text>
            </View>
            <View className="flex-row justify-between mt-2">
                <View className="flex-row items-center">
                    <Text className="text-gray-600 mr-2">Personal:</Text>
                    <View
                        className={`px-2 py-1 rounded-full ${
                            personal > 70
                                ? 'bg-red-100'
                                : personal > 50
                                ? 'bg-yellow-100'
                                : 'bg-green-100'
                        }`}
                    >
                        <Text
                            className={`${
                                personal > 70
                                    ? 'text-red-700'
                                    : personal > 50
                                    ? 'text-yellow-700'
                                    : 'text-green-700'
                            }`}
                        >
                            {personal}
                        </Text>
                    </View>
                </View>
                <View className="flex-row items-center">
                    <Text className="text-gray-600 mr-2">Working:</Text>
                    <View
                        className={`px-2 py-1 rounded-full ${
                            working > 60
                                ? 'bg-red-100'
                                : working > 40
                                ? 'bg-yellow-100'
                                : 'bg-green-100'
                        }`}
                    >
                        <Text
                            className={`${
                                working > 60
                                    ? 'text-red-700'
                                    : working > 40
                                    ? 'text-yellow-700'
                                    : 'text-green-700'
                            }`}
                        >
                            {working}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default OverworkRecordListItem
