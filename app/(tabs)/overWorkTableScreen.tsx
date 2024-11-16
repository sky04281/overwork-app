import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native'
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
            <SafeAreaView>
                <View
                    className={
                        'flex justify-center items-center' +
                        (chartToggle
                            ? 'bg-gray-400 opacity-40 ease-in-out'
                            : 'ease-in-out')
                    }
                >
                    <Header title="Overwork Assessment" />
                    <View className="w-[90vw] flex flex-row justify-end items-center m-[20px] space-x-3">
                        <Pressable
                            className="flex justify-center items-center h-[4vh] w-[20vw] border rounded"
                            onPress={() => {
                                setChartKey(chartKey + 1)
                                setChartToggle(!chartToggle)
                            }}
                        >
                            <Text className="text-[17.5px]">Trend Chart</Text>
                        </Pressable>
                        {tableToggle ? (
                            <Pressable
                                className="flex justify-center items-center h-[4vh] w-[32.5vw] border rounded"
                                onPress={() => setTableToggle(!tableToggle)}
                            >
                                <Text className="text-[17.5px]">
                                    Return to History
                                </Text>
                            </Pressable>
                        ) : (
                            <Pressable
                                className="flex justify-center items-center h-[4vh] w-[25vw] border rounded"
                                onPress={() => setTableToggle(!tableToggle)}
                            >
                                <Text className="text-[17.5px]">
                                    Add Record
                                </Text>
                            </Pressable>
                        )}
                    </View>
                    {tableToggle ? (
                        <View>
                            <OverworkTable
                                questionIndex={questionIndex}
                                setQuestionIndex={setQuestionIndex}
                                selectedAnswer={selectedAnswer}
                                setSelectedAnswer={setSelectedAnswer}
                                send={send}
                            />
                        </View>
                    ) : (
                        <View>
                            <View className="ml-[2.5vw]">
                                <Text className="text-lg font-medium">
                                    Recent Records (Within a Month)
                                </Text>
                            </View>
                            {thisMonthRecords?.length === 0 ? (
                                <View className="flex justify-center items-center h-[7.5vh]">
                                    <Text className="">No Recent Records</Text>
                                </View>
                            ) : (
                                <View className="h-[23vh] mb-[2vh] w-full">
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
                            <View className="ml-[2.5vw]">
                                <Text className="text-lg font-medium">
                                    Historical Records
                                </Text>
                            </View>
                            <View className="h-[35vh]">
                                <FlatList
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
                        </View>
                    )}
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
