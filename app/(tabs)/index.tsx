import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Pressable,
} from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useState } from 'react'
import InfoModal from '@/components/InfoModal'
import Battery from '@/components/RatingBattery'

export default function HomeScreen() {
    const [infoModalVisible, setInfoModalVisible] = useState(false)
    const RESULT = { style: 'text-red-500', level: '高風險' }
    const TITLE = '疾病一'
    const INFO =
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat alias aspernatur natus architecto non magnam ipsum placeat accusantium harum pariatur, deserunt cupiditate? Voluptate dignissimos laudantium dolorum quidem, repudiandae maiores sint.'
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
                    <View className="flex flex-row">
                        <View className="flex flex-row justify-center items-center h-[35vh] w-[50vw]">
                            <View className="flex justify-between items-center h-[25vh] w-[10vw] ml-[5vw]">
                                <Text className="text-red-600">High</Text>
                                <Text className="text-green-600">Low</Text>
                            </View>
                            <Battery score={69}/>
                        </View>
                        <View className="h-[35vh] w-[50vw]">
                            <Text>right</Text>
                        </View>
                    </View>
                    <View className="flex justify-center items-center">
                        <Text className="text-sm font-bold h-[3vh]">
                            您的過負荷評分為 :{' '}
                            <Text className={RESULT.style}>{RESULT.level}</Text>
                        </Text>
                        <Text className="text-xs">
                            根據您的過負荷評分，提供以下資訊參考
                        </Text>
                        <Text className="text-xs">
                            若您的過負荷評分風險較高，請儘速尋求專業醫療協助
                        </Text>
                    </View>
                    <View className="flex justify-center items-center h-[10vh]">
                        <Text className="text-xl font-semibold">衛教資訊</Text>
                    </View>
                    <View className="flex justify-center items-center">
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
