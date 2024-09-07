import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native'
import { useState } from 'react'
import OverworkTable from '@/components/OverworkTable/OverworkTable'
import OverworkRecordListItem from '@/components/OverworkTable/OverworkRecordListItem'
import Header from '@/components/tabs/header'

const OverWorkTableScreen = () => {
    const [questionToggle, setQuestionToggle] = useState(true)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
    const records = [
        { key: '2024-08-20' },
        { key: '2024-08-21' },
        { key: '2024-08-22' },
        { key: '2024-08-23' },
        { key: '2024-08-24' },
        { key: '2024-08-25' },
        { key: '2024-08-26' },
        { key: '2024-08-27' },
        { key: '2024-09-23' },
        { key: '2024-09-24' },
        { key: '2024-09-25' },
        { key: '2024-09-26' },
        { key: '2024-09-27' },
        { key: '2024-09-28' },
        { key: '2024-09-29' },
        { key: '2024-09-30' },
        { key: '2024-09-31' },
    ]
    const recentRecords = records.filter((record) => record)
    const send = () => {
        console.log(selectedAnswer)
        setQuestionToggle(false)
    }

    return (
        <SafeAreaView className="h-full">
            <View className="flex justify-center items-center">
                <Header title="過負荷量表" />
                <View className="">
                    {questionToggle ? (
                        <View>
                            <View className="flex flex-row justify-end items-center mt-[2.5vh] mb-[1vh] mx-[2vw] space-x-3">
                                <Pressable className="p-2 border rounded">
                                    <Text>走勢圖</Text>
                                </Pressable>
                                <Pressable
                                    className="p-2 border rounded"
                                    onPress={() => setQuestionToggle(false)}
                                >
                                    <Text>新增量表</Text>
                                </Pressable>
                            </View>
                            <Text className="text-lg font-medium">
                                近期紀錄（一個月內）
                            </Text>
                            <View className="h-[23vh] mb-[2vh] w-full">
                                <FlatList
                                    data={recentRecords}
                                    renderItem={({ item }) => (
                                        <OverworkRecordListItem
                                            title={item.key}
                                        />
                                    )}
                                />
                            </View>
                            <Text className="text-lg font-medium">
                                歷史紀錄
                            </Text>
                            <View className="h-[35vh]">
                                <FlatList
                                    data={records}
                                    renderItem={({ item }) => (
                                        <OverworkRecordListItem
                                            title={item.key}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                    ) : (
                        <View className="flex justify-center items-center w-full">
                            <View className="flex flex-row justify-end items-center h-[5vh] w-full mr-5">
                                <Pressable
                                    className="p-2 border rounded"
                                    onPress={() => setQuestionToggle(true)}
                                >
                                    <Text>歷史紀錄</Text>
                                </Pressable>
                            </View>
                            <View>
                                <OverworkTable
                                    questionIndex={questionIndex}
                                    setQuestionIndex={setQuestionIndex}
                                    selectedAnswer={selectedAnswer}
                                    setSelectedAnswer={setSelectedAnswer}
                                    send={send}
                                />
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OverWorkTableScreen
