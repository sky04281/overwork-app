import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { useState } from 'react'
import InfoModal from '@/components/HealthDashboard/InfoModal'
import RatingBattery from '@/components/HealthDashboard/RatingBattery'
import HealthInfo from '@/components/HealthDashboard/HealthInfo'

export default function HomeScreen() {
    const [infoModalVisible, setInfoModalVisible] = useState(false)

    // 應該要 useState 的 但現在先不能改
    const overworkScore = 19
    const lifeScore = 100

    // 開會有提到 低於 60 是低風險 其他還不確定
    const overworkRate =
        overworkScore > 60
            ? overworkScore > 80
                ? { style: 'text-[#e30019] font-bold italic', level: ' 高 ' }
                : { style: 'text-[#f1a00b] font-bold italic', level: ' 中 ' }
            : { style: 'text-[#52c902] font-bold italic', level: ' 低 ' }

    const lifeRate =
        lifeScore > 60
            ? lifeScore > 80
                ? { style: 'text-[#e30019] font-bold italic', level: ' 高 ' }
                : { style: 'text-[#f1a00b] font-bold italic', level: ' 中 ' }
            : { style: 'text-[#52c902] font-bold italic', level: ' 低 ' }

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
                    <View className="flex justify-center items-center h-[10vh]">
                        <Text className="text-xl font-semibold">
                            過負荷評量
                        </Text>
                    </View>
                    <View className="flex flex-row">
                        <View>
                            <View className="flex flex-row justify-center items-center h-[35vh] w-[50vw]">
                                <View className="flex justify-between items-center h-[25vh] w-[20vw]">
                                    <Text className="text-[#e30019] font-bold text-lg">
                                        High
                                    </Text>
                                    <Text className="text-[#52c902] font-bold text-lg">
                                        Low
                                    </Text>
                                </View>
                                <RatingBattery score={overworkScore} />
                            </View>
                            <View className="flex flex-row justify-center items-center w-[50vw] h-[5vh]">
                                <Text>個人評分為</Text>
                                <Text className={overworkRate.style}>
                                    {overworkRate.level}
                                </Text>
                                <Text>風險</Text>
                            </View>
                        </View>
                        <View>
                            <View className="flex flex-row justify-center items-center h-[35vh] w-[50vw]">
                                <RatingBattery score={lifeScore} />
                                <View className="flex justify-between items-center h-[25vh] w-[20vw]">
                                    <Text className="text-[#e30019] font-bold text-lg">
                                        High
                                    </Text>
                                    <Text className="text-[#52c902] font-bold text-lg">
                                        Low
                                    </Text>
                                </View>
                            </View>
                            <View className="flex flex-row justify-center items-center w-[50vw] h-[5vh]">
                                <Text>工作評分為</Text>
                                <Text className={lifeRate.style}>
                                    {lifeRate.level}
                                </Text>
                                <Text>風險</Text>
                            </View>
                        </View>
                    </View>
                    <View className="flex justify-center items-center h-[15vh]">
                        <Text className="text-xl font-semibold">衛教資訊</Text>
                        <Text className="text-xs">
                            根據您的過負荷評分，提供以下資訊參考
                        </Text>
                        <Text className="text-xs">
                            若您的過負荷評分風險較高，請儘速尋求專業醫療協助
                        </Text>
                    </View>
                    <HealthInfo
                        overworkScore={overworkScore}
                        lifeScore={lifeScore}
                        handlePressInfo={handlePressInfo}
                    />
                </View>
                <InfoModal
                    infoModalVisible={infoModalVisible}
                    setInfoModalVisible={setInfoModalVisible}
                />
            </ScrollView>
        </SafeAreaView>
    )
}
