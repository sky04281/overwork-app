import { FlatList, SafeAreaView, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import Header from '@/components/tabs/header'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import BodyInfoListItem from '@/components/tabs/bodyInfoListItem'
import useAuth from '@/hooks/useAuth'
import BODYINFO from '@/types/bodyInfo'

const BodyInfoScreen = () => {
    const { userData } = useAuth()
    const [bodyInfoList, setBodyInfoList] = useState<BODYINFO[]>([])
    useEffect(() => {
        if (userData) {
            const bodyInfo = userData.bodyInfo
            setBodyInfoList({
                ...bodyInfo,
            })
        }
    }, [userData])
    return (
        <SafeAreaView className="h-full">
            <Header title="生理資訊" />
            <View className="w-full h-full justify-center">
                <View className="flex-row justify-between items-center mt-[5vh] mx-[5vw]">
                    <Text className="text-xl font-medium">
                        個人生理資訊紀錄
                    </Text>
                    <FontAwesome name="plus" size={28} color="black" />
                </View>
                <View className="flex-1  items-center justify-center">
                    <FlatList
                        contentContainerStyle={{
                            flex: 1,
                            marginTop: 10,
                        }}
                        data={bodyInfoList}
                        renderItem={({ item }) => (
                            <BodyInfoListItem title={item.createDate} />
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BodyInfoScreen
