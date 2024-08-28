import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native'
import { useState } from 'react'
import OverworkTable from '@/components/OverworkTable/OverworkTable'
import OverworkRecordListItem from '@/components/OverworkTable/OverworkRecordListItem'

const OverWorkTableScreen = () => {
    const [questionToggle, setQuestionToggle] = useState(true)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
    const records = [
        { key: '2024-08-23' },
        { key: '2024-08-24' },
        { key: '2024-08-25' },
        { key: '2024-08-26' },
        { key: '2024-08-27' },
    ]
    const send = () => {
        console.log(selectedAnswer)
        setQuestionToggle(false)
    }

    return (
        <SafeAreaView className="h-full">
            <View className="flex justify-center items-center">
                <View className="flex justify-center items-center h-[10vh]">
                    <Text className="font-bold text-2xl">過負荷量表</Text>
                </View>
                <View className="">
                    {questionToggle ? (
                        <View>
                            <View className="flex flex-row justify-end items-center h-[5vh]">
                                <Pressable
                                    className="p-2 border rounded"
                                    onPress={() => setQuestionToggle(false)}
                                >
                                    <Text>新增量表</Text>
                                </Pressable>
                            </View>
                            <View className="h-[65vh]">
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
