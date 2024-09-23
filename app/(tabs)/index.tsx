import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import InfoModal from '@/components/HealthDashboard/InfoModal'
import RatingBattery from '@/components/HealthDashboard/RatingBattery'
import HealthInfo from '@/components/HealthDashboard/HealthInfo'
import OVERWORKSCORE from '@/types/overworkScore'
import useAuth from '@/hooks/useAuth'
import HEALTHEDUCATIONINFO from '@/types/healthEducationInfo'
import { getHealthEducationInfo } from '@/firebase/dbService'

export default function HomeScreen() {
    const [infoModalVisible, setInfoModalVisible] = useState(false)
    const [latestOverworkScore, setLatestOverworkScore] =
        useState<OVERWORKSCORE>({
            createDate: '',
            personal: 0,
            working: 0,
        })
    const [healthEducationInfo, setHealthEducationInfo] =
        useState<HEALTHEDUCATIONINFO>()
    const { userData } = useAuth()
    // 你可以用這個 lastestOverworkScore 來做新的顯示
    useEffect(() => {
        if (userData) {
            setLatestOverworkScore(userData?.overworkScore.slice(-1)[0])
            // 這邊是拿到全部衛教資訊
            getHealthEducationInfo().then((data) => {
                setHealthEducationInfo(data)
            })
        }
    }, [userData])
    useEffect(() => {
        console.log('latestOverworkScore', latestOverworkScore)
        console.log('healthEducationInfo', healthEducationInfo)
    }, [healthEducationInfo])

    // 應該要 useState 的 但現在先不能改
    const overworkScore = 9
    const lifeScore = 100

    // 看要怎麼判斷去呈現衛教資訊
    const healthInfo =
        overworkScore + lifeScore > 100
            ? [
                  {
                      title: '資訊一1',
                      content: '內容內容內容內容內容內容',
                  },
                  {
                      title: '資訊一2',
                      content: '內容內容內容內容內容內容',
                  },
                  {
                      title: '資訊一3',
                      content: '內容內容內容內容內容內容',
                  },
                  {
                      title: '資訊一4',
                      content: '內容內容內容內容內容內容',
                  },
                  {
                      title: '資訊一5',
                      content: '內容內容內容內容內容內容',
                  },
              ]
            : [
                  {
                      title: '資訊二1',
                      content: '內容內容內容內容內容內容',
                  },
                  {
                      title: '資訊二2',
                      content: '內容內容內容內容內容內容',
                  },
                  {
                      title: '資訊二3',
                      content: '內容內容內容內容內容內容',
                  },
                  {
                      title: '資訊二4',
                      content: '內容內容內容內容內容內容',
                  },
                  {
                      title: '資訊二5',
                      content: '內容內容內容內容內容內容',
                  },
              ]

    // 點擊 info icon 時的 index
    const [infoModalIndex, setInfoModalIndex] = useState(0)
    const handlePressInfo = (index: number) => {
        setInfoModalIndex(index)
        setInfoModalVisible(true)
    }

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
                        <Text className="text-s pt-[1vh]">
                            根據您的過負荷評分，提供以下資訊參考
                        </Text>
                        <Text className="text-s">
                            若您的過負荷評分風險較高，請儘速尋求專業醫療協助
                        </Text>
                    </View>
                    <HealthInfo
                        healthInfo={healthInfo}
                        handlePressInfo={handlePressInfo}
                    />
                </View>
                <InfoModal
                    healthInfo={healthInfo[infoModalIndex]}
                    infoModalVisible={infoModalVisible}
                    setInfoModalVisible={setInfoModalVisible}
                />
            </ScrollView>
        </SafeAreaView>
    )
}
