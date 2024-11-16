import {
    FlatList,
    Pressable,
    SafeAreaView,
    Text,
    View,
    ScrollView,
} from 'react-native'
import { useEffect, useState } from 'react'
import OverworkTable from '@/components/OverworkTable/OverworkTable'
import OverworkRecordListItem from '@/components/OverworkTable/OverworkRecordListItem'
import Header from '@/components/tabs/Header'
import OVERWORKSCORE from '@/types/overworkScore'
import useAuth from '@/hooks/useAuth'
import { addOverworkScore } from '@/firebase/dbService'
import { sendEmailToCarer, sendEmailToManager } from '@/services/emailService'
import ChartModal from '@/components/tabs/ChartModal'

const OverWorkTableScreen = () => {
    const [tableToggle, setTableToggle] = useState(false)
    const [chartKey, setChartKey] = useState(0)
    const [chartToggle, setChartToggle] = useState(false)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])

    const { user, userData, setLoading } = useAuth()
    const [overworkScore, setOverworkScore] = useState<OVERWORKSCORE[]>()

    useEffect(() => {
        userData ? setOverworkScore(userData.overworkScore) : ''
    }, [userData])

    const thisMonthRecords = overworkScore?.filter((record) => {
        return (
            Number(record.createDate.split('-')[1]) ===
            new Date().getMonth() + 1
        )
    })

    const countScore = (selectedAnswer: number[]): OVERWORKSCORE => {
        let personal = 0,
            working = 0

        selectedAnswer.map((answer, index) => {
            if (index < 6) {
                personal += (4 - answer) * 25
            } else if (index < 12) {
                working += (4 - answer) * 25
            } else {
                working += answer * 25
            }
        })

        return {
            createDate: new Date()
                .toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })
                .replaceAll('/', '-'),
            personal: Math.round(personal / 6),
            working: Math.round(working / 7),
        }
    }

    const send = () => {
        const score = countScore(selectedAnswer)
        user &&
            user.uid &&
            addOverworkScore(user?.uid, score)
                .catch((e) => {
                    console.log(e)
                })
                .then(() => {
                    if (score.personal > 70) {
                        sendEmailToCarer(
                            userData!.basicInfo.familyMember,
                            userData!.basicInfo.name,
                            score.personal,
                            score.working,
                            'images/高負荷-家人-紅燈_0.jpg'
                        )
                    } else if (score.personal > 50) {
                        sendEmailToCarer(
                            userData!.basicInfo.familyMember,
                            userData!.basicInfo.name,
                            score.personal,
                            score.working,
                            'images/中負荷-家人-黃燈_0.jpg'
                        )
                    }
                    if (score.working > 60) {
                        sendEmailToManager(
                            userData!.basicInfo.manager,
                            userData!.basicInfo.name,
                            score.personal,
                            score.working,
                            'images/高負荷-雇主-紅燈_0.jpg'
                        )
                    }
                })
                .finally(() => {
                    setTableToggle(!tableToggle)
                    setSelectedAnswer([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                    setLoading(true)
                })
    }

    return (
        overworkScore && (
            <SafeAreaView className="flex-1 bg-gray-200">
                <Header title="Assessment" />
                <View className="flex-1">
                    <View className="flex-row justify-between items-center mx-5 my-5">
                        <Text className="text-xl font-medium">
                            {tableToggle ? 'New Assessment' : ''}
                        </Text>
                        <View className="flex-row gap-3">
                            <Pressable
                                className="h-8 px-4 rounded-lg border border-gray-300 items-center justify-center bg-white active:bg-gray-500"
                                onPress={() => {
                                    setChartKey(chartKey + 1)
                                    setChartToggle(!chartToggle)
                                }}
                            >
                                <Text className="text-base">Trend</Text>
                            </Pressable>
                            {tableToggle ? (
                                <Pressable
                                    className="h-8 px-4 rounded-lg bg-blue-500 items-center justify-center active:bg-blue-600"
                                    onPress={() => setTableToggle(false)}
                                >
                                    <Text className="text-white font-bold">
                                        Cancel
                                    </Text>
                                </Pressable>
                            ) : (
                                <Pressable
                                    className="h-8 px-4 rounded-lg border border-gray-300 items-center justify-center bg-white active:bg-gray-500"
                                    onPress={() => setTableToggle(true)}
                                >
                                    <Text className="text-base">+ Add</Text>
                                </Pressable>
                            )}
                        </View>
                    </View>

                    <View className="flex-1 px-3">
                        {tableToggle ? (
                            <View className="flex-1 rounded-t-3xl bg-gray-50">
                                <View className="p-4">
                                    <OverworkTable
                                        questionIndex={questionIndex}
                                        setQuestionIndex={setQuestionIndex}
                                        selectedAnswer={selectedAnswer}
                                        setSelectedAnswer={setSelectedAnswer}
                                        send={send}
                                    />
                                </View>
                            </View>
                        ) : (
                            <View className="flex-1">
                                <View className="mb-4">
                                    <Text className="text-lg font-medium mb-2">
                                        Recent Records (Within a Month)
                                    </Text>
                                    {thisMonthRecords?.length === 0 ? (
                                        <View className="h-16 justify-center items-center bg-white rounded-xl">
                                            <Text className="text-gray-500">
                                                No Recent Records
                                            </Text>
                                        </View>
                                    ) : (
                                        <View className="max-h-[23vh]">
                                            <FlatList
                                                data={thisMonthRecords}
                                                renderItem={({ item }) => (
                                                    <OverworkRecordListItem
                                                        title={item.createDate}
                                                        personal={item.personal}
                                                        working={item.working}
                                                    />
                                                )}
                                            />
                                        </View>
                                    )}
                                </View>

                                <Text className="text-lg font-medium mb-2">
                                    Historical Records
                                </Text>
                                <FlatList
                                    className="flex-1"
                                    data={overworkScore}
                                    renderItem={({ item }) => (
                                        <OverworkRecordListItem
                                            title={item.createDate}
                                            personal={item.personal}
                                            working={item.working}
                                        />
                                    )}
                                />
                            </View>
                        )}
                    </View>
                </View>
                <ChartModal
                    whosCall="workTable"
                    chartToggle={chartToggle}
                    setChartToggle={setChartToggle}
                    key={chartKey}
                />
            </SafeAreaView>
        )
    )
}

export default OverWorkTableScreen
