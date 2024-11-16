import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import InfoModal from '@/components/HealthDashboard/InfoModal'
import RatingBattery from '@/components/HealthDashboard/RatingBattery'
import HealthInfo from '@/components/HealthDashboard/HealthInfo'
import OVERWORKSCORE from '@/types/overworkScore'
import useAuth from '@/hooks/useAuth'
import HEALTHEDUCATIONINFO from '@/types/healthEducationInfo'
import { getHealthEducationInfo } from '@/firebase/dbService'
import { useFocusEffect } from '@react-navigation/native'
import Header from '@/components/tabs/Header'

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
    const { userData, setLoading } = useAuth()

    const fetchData = useCallback(() => {
        setLoading(true)
    }, [])

    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [fetchData])
    )

    useEffect(() => {
        if (userData?.overworkScore) {
            setLatestOverworkScore(userData?.overworkScore.slice(-1)[0])
            getHealthEducationInfo().then((data) => {
                setHealthEducationInfo(data)
            })
        }
    }, [userData])

    const [infoModalIndex, setInfoModalIndex] = useState(0)
    const handlePressInfo = (index: number) => {
        setInfoModalIndex(index)
        setInfoModalVisible(true)
    }

    const workingRate =
        latestOverworkScore.working > 45
            ? latestOverworkScore.working > 60
                ? { style: 'text-[#e30019] font-bold italic', level: ' High ' }
                : {
                      style: 'text-[#f1a00b] font-bold italic',
                      level: ' Medium ',
                  }
            : { style: 'text-[#52c902] font-bold italic', level: ' Low ' }

    const personalRate =
        latestOverworkScore.personal > 50
            ? latestOverworkScore.personal > 70
                ? { style: 'text-[#e30019] font-bold italic', level: ' High ' }
                : {
                      style: 'text-[#f1a00b] font-bold italic',
                      level: ' Medium ',
                  }
            : { style: 'text-[#52c902] font-bold italic', level: ' Low ' }

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
                    <Header title="Overwork Rating" />
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
                                <RatingBattery
                                    score={latestOverworkScore.personal}
                                />
                            </View>
                            <View className="flex flex-row justify-center items-center w-[50vw] h-[5vh]">
                                <Text>Personal rating is</Text>
                                <Text className={personalRate.style}>
                                    {personalRate.level}
                                </Text>
                                <Text>risk</Text>
                            </View>
                        </View>
                        <View>
                            <View className="flex flex-row justify-center items-center h-[35vh] w-[50vw]">
                                <RatingBattery
                                    score={latestOverworkScore.working}
                                />
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
                                <Text>Work rating is</Text>
                                <Text className={workingRate.style}>
                                    {workingRate.level}
                                </Text>
                                <Text>risk</Text>
                            </View>
                        </View>
                    </View>
                    <View className="flex justify-center items-center h-[15vh]">
                        <Text className="text-xl font-semibold">
                            Health Education
                        </Text>
                        <Text className="text-s pt-[1vh]">
                            Based on your overwork assessment score, the
                            following information is provided for reference
                        </Text>
                        <Text className="text-s">
                            If your overwork risk level is high, please seek
                            professional medical assistance promptly
                        </Text>
                    </View>
                    <View className="flex justify-center">
                        {latestOverworkScore.personal > 70 ||
                        latestOverworkScore.working > 60 ? (
                            <Image
                                source={require('../../assets/images/高負荷-本人-紅燈_0.jpg')}
                                style={{
                                    width: '100%',
                                    height: undefined,
                                    aspectRatio: 1,
                                }}
                                resizeMode="contain"
                            />
                        ) : latestOverworkScore.personal > 50 ||
                          latestOverworkScore.working > 45 ? (
                            <Image
                                source={require('../../assets/images/中負荷-本人-黃燈_0.jpg')}
                                style={{
                                    width: '100%',
                                    height: undefined,
                                    aspectRatio: 1,
                                }}
                                resizeMode="contain"
                            />
                        ) : (
                            <Image
                                source={require('../../assets/images/低負荷-本人-綠燈_0.jpg')}
                                style={{
                                    width: '100%',
                                    height: undefined,
                                    aspectRatio: 1,
                                }}
                                resizeMode="contain"
                            />
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
