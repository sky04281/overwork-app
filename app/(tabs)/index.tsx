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

// 新增常量定義
const RISK_LEVELS = {
    HIGH: {
        style: 'text-[#e30019] font-bold italic',
        level: ' High ',
        threshold: { personal: 70, working: 60 },
    },
    MEDIUM: {
        style: 'text-[#f1a00b] font-bold italic',
        level: ' Medium ',
        threshold: { personal: 50, working: 45 },
    },
    LOW: { style: 'text-[#52c902] font-bold italic', level: ' Low ' },
}

const IMAGES = {
    HIGH: require('../../assets/images/高負荷-本人-紅燈_0.jpg'),
    MEDIUM: require('../../assets/images/中負荷-本人-黃燈_0.jpg'),
    LOW: require('../../assets/images/低負荷-本人-綠燈_0.jpg'),
}

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

    // 優化評分計算邏輯
    const calculateRiskRate = (score: number, type: 'personal' | 'working') => {
        const thresholds =
            type === 'personal'
                ? {
                      high: RISK_LEVELS.HIGH.threshold.personal,
                      medium: RISK_LEVELS.MEDIUM.threshold.personal,
                  }
                : {
                      high: RISK_LEVELS.HIGH.threshold.working,
                      medium: RISK_LEVELS.MEDIUM.threshold.working,
                  }

        if (score > thresholds.high) return RISK_LEVELS.HIGH
        if (score > thresholds.medium) return RISK_LEVELS.MEDIUM
        return RISK_LEVELS.LOW
    }

    const workingRate = calculateRiskRate(
        latestOverworkScore.working,
        'working'
    )
    const personalRate = calculateRiskRate(
        latestOverworkScore.personal,
        'personal'
    )

    // 優化圖片選擇邏輯
    const getDisplayImage = () => {
        if (
            latestOverworkScore.personal >
                RISK_LEVELS.HIGH.threshold.personal ||
            latestOverworkScore.working > RISK_LEVELS.HIGH.threshold.working
        ) {
            return IMAGES.HIGH
        }
        if (
            latestOverworkScore.personal >
                RISK_LEVELS.MEDIUM.threshold.personal ||
            latestOverworkScore.working > RISK_LEVELS.MEDIUM.threshold.working
        ) {
            return IMAGES.MEDIUM
        }
        return IMAGES.LOW
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-200">
            <ScrollView>
                <View
                    className={`${
                        infoModalVisible ? 'opacity-40 bg-gray-400' : ''
                    } transition-opacity duration-300`}
                >
                    <Header title="Overwork Rating" />

                    {/* 評分展示區域 */}
                    <View className="flex-row justify-between px-4 py-6">
                        <RatingSection
                            title="Personal Rating"
                            score={latestOverworkScore.personal}
                            riskRate={personalRate}
                            alignment="left"
                        />
                        <RatingSection
                            title="Work Rating"
                            score={latestOverworkScore.working}
                            riskRate={workingRate}
                            alignment="right"
                        />
                    </View>

                    {/* 健康教育資訊區域 */}
                    <View className="px-4 py-8 bg-white rounded-3xl shadow-sm mx-3 mb-4">
                        <Text className="text-2xl font-bold text-center mb-4">
                            Health Education
                        </Text>
                        <Text className="text-gray-600 text-center leading-6 mb-8">
                            Based on your overwork assessment score{'\n'}
                            the following information is provided for reference
                            {'\n\n'}
                            <Text className="text-red-600 font-semibold">
                                * If your overwork risk level is high{'\n'}
                                Please seek professional medical assistance
                            </Text>
                        </Text>

                        {/* 圖片展示區域 */}
                        <View className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <Image
                                source={getDisplayImage()}
                                className="w-full h-[450]"
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
// 新增可重用組件
const RatingSection = ({
    title,
    score,
    riskRate,
    alignment,
}: {
    title: string
    score: number
    riskRate: { level: string; style: string }
    alignment: 'left' | 'right'
}) => (
    <View className={`flex-1 items-${alignment}`}>
        <View className="flex-row items-center justify-center h-[35vh]">
            {alignment === 'right' ? (
                <>
                    <RatingBattery score={score} />
                    <View className="h-[25vh] justify-between px-2">
                        <Text className="text-[#e30019] font-bold text-lg">
                            High
                        </Text>
                        <Text className="text-[#52c902] font-bold text-lg">
                            Low
                        </Text>
                    </View>
                </>
            ) : (
                <>
                    <View className="h-[25vh] justify-between px-2">
                        <Text className="text-[#e30019] font-bold text-lg">
                            High
                        </Text>
                        <Text className="text-[#52c902] font-bold text-lg">
                            Low
                        </Text>
                    </View>
                    <RatingBattery score={score} />
                </>
            )}
        </View>
        <View className="flex-row items-center justify-center h-[5vh]">
            <Text>{title}:</Text>
            <Text className={riskRate.style}>{riskRate.level}</Text>
            <Text>risk</Text>
        </View>
    </View>
)
