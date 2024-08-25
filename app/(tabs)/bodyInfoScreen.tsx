import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Header from '@/components/tabs/header'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import BodyInfoListItem from '@/components/tabs/bodyInfoListItem'

const BodyInfoScreen = () => {
    const [bodyInfoList, setBodyInfoList] = React.useState<{ key: string }[]>(
        []
    )
    useEffect(() => {
        // fetch body info list
        setBodyInfoList([
            { key: '2024-08-23' },
            { key: '2024-08-24' },
            { key: '2024-08-25' },
            { key: '2024-08-26' },
            { key: '2024-08-27' },
        ])
    }, [])
    return (
        <SafeAreaView className="h-full">
            <Header title="生理資訊" />
            <View className="w-full h-full justify-center">
                <View className="w-full flex-row justify-between items-center mt-5 px-2 border-b-[2rem] border-black">
                    <Text className="text-xl font-medium">
                        個人生理資訊紀錄
                    </Text>
                    <FontAwesome name="plus" size={28} color="black" />
                </View>
                <View className="flex-1 items-start justify-start p-2">
                    <FlatList
                        data={bodyInfoList}
                        renderItem={({ item }) => (
                            <BodyInfoListItem title={item.key} />
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BodyInfoScreen
