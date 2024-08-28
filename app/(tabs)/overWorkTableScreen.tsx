import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native'
import { useState } from 'react'
import OverworkTable from '@/components/OverworkTable/OverworkTable'
import OverworkRecordListItem from '@/components/OverworkTable/OverworkRecordListItem'

const OverWorkTableScreen = () => {
    const [questionToggle, setQuestionToggle] = useState(false)
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
        <SafeAreaView>
            <View>
                <Text className="">過負荷量表</Text>
            </View>
            {questionToggle ? (
                <View>
                    <View>
                        <Pressable onPress={() => setQuestionToggle(false)}>
                            <Text>新增量表</Text>
                        </Pressable>
                    </View>
                    <View>
                        <FlatList
                            data={records}
                            renderItem={({ item }) => (
                                <OverworkRecordListItem title={item.key} />
                            )}
                        />
                    </View>
                </View>
            ) : (
                <View>
                    <Pressable onPress={() => setQuestionToggle(true)}>
                        <Text>歷史紀錄</Text>
                    </Pressable>
                    <OverworkTable
                        questionIndex={questionIndex}
                        setQuestionIndex={setQuestionIndex}
                        selectedAnswer={selectedAnswer}
                        setSelectedAnswer={setSelectedAnswer}
                        send={send}
                    />
                </View>
            )}
        </SafeAreaView>
    )
}

export default OverWorkTableScreen
