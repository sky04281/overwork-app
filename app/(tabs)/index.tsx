import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
} from 'react-native'
import { useState } from 'react'
import InfoModal from '@/components/InfoModal'
import RatingBattery from '@/components/RatingBattery'
import HealthInfo from '@/components/HealthInfo'

export default function HomeScreen() {
    const [infoModalVisible, setInfoModalVisible] = useState(false)

    // 應該要 useState 的 但現在先不能改
    const overworkScore = 69
    const lifeScore = 99

    // 開會有提到 低於60 是低風險 其他還不確定
    const overworkRate = overworkScore > 60 ? ( overworkScore > 80 ? { style: 'text-red-600', level: '高風險' } : { style: 'text-red-400', level: '中風險' } ) : { style: 'text-red-200', level: '低風險' }
    const lifeRate = lifeScore > 60 ? ( lifeScore > 80 ? { style: 'text-red-600', level: '高風險' } : { style: 'text-red-400', level: '中風險' } ) : { style: 'text-red-200', level: '低風險' }
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
                        <View>
                            <View className="flex flex-row justify-center items-center h-[35vh] w-[50vw]">
                                <View className="flex justify-between items-center h-[25vh] w-[10vw] ml-[5vw]">
                                    <Text className="text-red-600">High</Text>
                                    <Text className="text-green-600">Low</Text>
                                </View>
                                <RatingBattery score={overworkScore}/>
                            </View>
                            <View className='flex justify-center items-center w-[50vw]'>
                                <Text className={overworkRate.style}>{overworkRate.level}</Text>
                            </View>
                        </View>
                        <View>
                            <View className="flex flex-row justify-center items-center h-[35vh] w-[50vw]">
                                <RatingBattery score={lifeScore}/>
                                <View className="flex justify-between items-center h-[25vh] w-[10vw] mr-[5vw]">
                                    <Text className="text-red-600">High</Text>
                                    <Text className="text-green-600">Low</Text>
                                </View>
                            </View>
                            <View className='flex justify-center items-center w-[50vw]'>
                                <Text className={lifeRate.style}>{lifeRate.level}</Text>
                            </View>
                        </View>
                    </View>
                    <View className="flex justify-center items-center">
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
                    <HealthInfo overworkScore={overworkScore} lifeScore={lifeScore} handlePressInfo={handlePressInfo}/>
                    {/* <View className="flex justify-center items-center">
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
                    </View> */}
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
