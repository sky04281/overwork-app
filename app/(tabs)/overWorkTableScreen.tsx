import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import OverworkTable from '@/components/OverworkTable/OverworkTable'
import OverworkRecordListItem from '@/components/OverworkTable/OverworkRecordListItem'
import Header from '@/components/tabs/Header'
import OVERWORKSCORE from '@/types/overworkScore'
import useAuth from '@/hooks/useAuth'
import { addOverworkScore } from '@/firebase/dbService'
import ChartModal from '@/components/tabs/ChartModal'

const OverWorkTableScreen = () => {
    const [tableToggle, setTableToggle] = useState(false)
    const [chartKey, setChartKey] = useState(0)
    const [chartToggle, setChartToggle] = useState(false)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])

    // 你可以拿 overworkScore 來做紀錄顯示
    const { user, userData, setLoading } = useAuth()

    const [overworkScore, setOverworkScore] = useState<OVERWORKSCORE[]>()
    useEffect(() => {
        userData ? setOverworkScore(userData.overworkScore) : ''
        console.log(userData)
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
        user &&
            user.uid &&
            addOverworkScore(user?.uid, countScore(selectedAnswer))
                .catch((e) => {
                    console.log(e)
                })
                .finally(() => {
                    setTableToggle(!tableToggle)
                    setSelectedAnswer([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                    setLoading(true)
                })
    }

    return (
        overworkScore && (
            <SafeAreaView className="h-full">
                <View className="flex justify-center items-center">
                    <Header title="過負荷量表" />
                    <View className="w-[90vw] flex flex-row justify-end items-center m-[20px] space-x-3">
                        <Pressable
                            className="flex justify-center items-center h-[4vh] w-[20vw] border rounded"
                            onPress={() => {
                                setChartKey(chartKey + 1)
                                setChartToggle(!chartToggle)
                            }}
                        >
                            <Text className="text-[17.5px]">走勢圖</Text>
                        </Pressable>
                        {tableToggle ? (
                            <Pressable
                                className="flex justify-center items-center h-[4vh] w-[32.5vw] border rounded"
                                onPress={() => setTableToggle(!tableToggle)}
                            >
                                <Text className="text-[17.5px]">
                                    返回歷史紀錄
                                </Text>
                            </Pressable>
                        ) : (
                            <Pressable
                                className="flex justify-center items-center h-[4vh] w-[25vw] border rounded"
                                onPress={() => setTableToggle(!tableToggle)}
                            >
                                <Text className="text-[17.5px]">新增量表</Text>
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
                            <Text className="text-lg font-medium">
                                近期紀錄（一個月內）
                            </Text>
                            {thisMonthRecords?.length === 0 ? (
                                <View className="flex justify-center items-center h-[7.5vh]">
                                    <Text className="">無近期紀錄</Text>
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
                            <Text className="text-lg font-medium">
                                歷史紀錄
                            </Text>
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
                    key={chartKey}
                />
            </SafeAreaView>
        )
    )
}

export default OverWorkTableScreen
