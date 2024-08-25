import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    FlatList,
    Pressable,
} from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useState } from 'react'
import InfoModal from '@/components/InfoModal'

export default function HomeScreen() {
    const [infoModalVisible, setInfoModalVisible] = useState(false)
    const RESULT = { style: 'text-red-500', level: '高風險' }
    const TITLE = '疾病一'
    const INFO =
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat alias aspernatur natus architecto non magnam ipsum placeat accusantium harum pariatur, deserunt cupiditate? Voluptate dignissimos laudantium dolorum quidem, repudiandae maiores sint.'
    const DATA = [
        {
            name: TITLE,
            info: INFO,
        },
        {
            name: TITLE,
            info: INFO,
        },
        {
            name: TITLE,
            info: INFO,
        },
        {
            name: TITLE,
            info: INFO,
        },
        {
            name: TITLE,
            info: INFO,
        },
    ]
    const handlePressInfo = () => {
        setInfoModalVisible(true)
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View
                    className={
                        infoModalVisible
                            ? 'bg-gray-400 opacity-40 ease-in-out'
                            : 'ease-in-out'
                    }
                >
                    <View className="flex justify-center items-center h-[5vh]">
                        <Text className="text-xl font-semibold">
                            過負荷評量
                        </Text>
                    </View>
                    <View className="flex">
                        <View className="flex justify-center items-center h-[10vh] my-[2vh]">
                            <Image
                                className="scale-[0.3]"
                                source={require('../../assets/images/progressbar.png')}
                            />
                        </View>
                        <View className="flex justify-center items-center">
                            <Text className="text-sm font-bold h-[3vh]">
                                您的過負荷評分為 :{' '}
                                <Text className={RESULT.style}>
                                    {RESULT.level}
                                </Text>
                            </Text>
                            <Text className="text-xs">
                                根據您的過負荷評分，提供以下資訊參考
                            </Text>
                            <Text className="text-xs">
                                若您的過負荷評分風險較高，請儘速尋求專業醫療協助
                            </Text>
                        </View>
                    </View>
                    <View className="flex-1 justify-center items-center">
                        <View className="flex justify-center items-center h-[5vh] mt-[5vh]">
                            <Text className="text-xl font-semibold">
                                高風險潛在疾病
                            </Text>
                        </View>
                        <View className="flex flex-row items-center h-[25vh] w-[90vw]">
                            <FlatList
                                horizontal
                                data={DATA}
                                renderItem={({ item }) => (
                                    <View className="flex h-[15vh] w-[55vw] mr-[5vw] mb-[2.5vh] border border-solid rounded-[15px]">
                                        <View className="flex flex-row justify-between items-center ml-[3vw] mr-[4vw] mt-[1vh]">
                                            <Text className="text-base font-semibold text-sky-700">
                                                {item.name}
                                            </Text>
                                            <Pressable
                                                onPress={handlePressInfo}
                                            >
                                                <AntDesign
                                                    name="infocirlceo"
                                                    size={16}
                                                    color="black"
                                                />
                                            </Pressable>
                                        </View>
                                        <View className="flex justify-start mx-[3vw] my-[0.5vh]">
                                            <Text className="text-sky-900 h-[10vh]">
                                                {item.info}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                    <View className="flex justify-center items-center h-[5vh]">
                        <Text className="text-xl font-semibold">衛教資訊</Text>
                    </View>
                    <View className="flex justify-center items-center mt-[5vh]">
                        <View className="flex h-[15vh] w-[80vw] mb-[5vh] mr-[5vh] border border-solid rounded-[15px]">
                            <View className="flex flex-row justify-between items-center mx-[3vw] mt-[1vh]">
                                <Text className="text-xl font-semibold text-indigo-700">
                                    {TITLE}
                                </Text>
                                <Pressable onPress={handlePressInfo}>
                                    <AntDesign
                                        name="infocirlceo"
                                        size={16}
                                        color="black"
                                    />
                                </Pressable>
                            </View>
                            <View className="flex justify-start mx-[5vw] mt-[0.5vh] h-[8vh]">
                                <Text className="text-indigo-900">{INFO}</Text>
                            </View>
                        </View>
                        <View className="flex h-[15vh] w-[80vw] mb-[5vh] ml-[5vh] border border-solid rounded-[15px]">
                            <View className="flex flex-row justify-between items-center mx-[3vw] mt-[1vh]">
                                <Pressable onPress={handlePressInfo}>
                                    <AntDesign
                                        name="infocirlceo"
                                        size={16}
                                        color="black"
                                    />
                                </Pressable>
                                <Text className="text-xl font-semibold text-indigo-700">
                                    {TITLE}
                                </Text>
                            </View>
                            <View className="flex justify-start mx-[5vw] mt-[0.5vh] h-[8vh]">
                                <Text className="text-indigo-900">{INFO}</Text>
                            </View>
                        </View>
                        <View className="flex h-[15vh] w-[80vw] mb-[5vh] mr-[5vh] border border-solid rounded-[15px]">
                            <View className="flex flex-row justify-between items-center mx-[3vw] mt-[1vh]">
                                <Text className="text-xl font-semibold text-indigo-700">
                                    {TITLE}
                                </Text>
                                <Pressable onPress={handlePressInfo}>
                                    <AntDesign
                                        name="infocirlceo"
                                        size={16}
                                        color="black"
                                    />
                                </Pressable>
                            </View>
                            <View className="flex justify-start mx-[5vw] mt-[0.5vh] h-[8vh]">
                                <Text className="text-indigo-900">{INFO}</Text>
                            </View>
                        </View>
                        <View className="flex h-[15vh] w-[80vw] mb-[5vh] ml-[5vh] border border-solid rounded-[15px]">
                            <View className="flex flex-row justify-between items-center mx-[3vw] mt-[1vh]">
                                <Pressable onPress={handlePressInfo}>
                                    <AntDesign
                                        name="infocirlceo"
                                        size={16}
                                        color="black"
                                    />
                                </Pressable>
                                <Text className="text-xl font-semibold text-indigo-700">
                                    {TITLE}
                                </Text>
                            </View>
                            <View className="flex mx-[5vw] mt-[0.5vh] h-[8vh]">
                                <Text className="text-indigo-900">{INFO}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <InfoModal
                    infoModalVisible={infoModalVisible}
                    setInfoModalVisible={setInfoModalVisible}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({})
