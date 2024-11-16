import { View, Text, Pressable } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import OVERWORKTABLE from '@/types/overworkTable'
import { useEffect, useState } from 'react'
import { getOverworkTable } from '@/firebase/dbService'

export default function OverworkTable({
    questionIndex,
    setQuestionIndex,
    selectedAnswer,
    setSelectedAnswer,
    send,
}: {
    questionIndex: number
    setQuestionIndex: React.Dispatch<React.SetStateAction<number>>
    selectedAnswer: number[]
    setSelectedAnswer: React.Dispatch<React.SetStateAction<number[]>>
    send: () => void
}) {
    // 你可以拿這個 overworkTable 來渲染題目
    const [overworkTable, setOverworkTable] = useState<OVERWORKTABLE>()
    const question = overworkTable?.questions[questionIndex]

    useEffect(() => {
        getOverworkTable()
            .then((data) => {
                setOverworkTable(data)
            })
            .catch((error) => {
                console.error('Error getting overwork table:', error.message)
            })
    }, [])

    return (
        <View className="h-[45vh] w-[95vw] mt-[5vh]">
            <View className="h-[50vh]">
                <View className="flex mx-5 my-1 h-15">
                    <Text className="font-bold text-lg">
                        {questionIndex + 1 + '. ' + question}
                    </Text>
                </View>
                <View className="m-5">
                    {overworkTable &&
                        overworkTable.answers.map((answer, index) => {
                            return (
                                <View key={index}>
                                    <Pressable
                                        onPress={() => {
                                            setSelectedAnswer(
                                                selectedAnswer.with(
                                                    questionIndex,
                                                    index
                                                )
                                            )
                                        }}
                                    >
                                        <View className="flex flex-row items-center h-[7vh] w-[80vw]">
                                            <View
                                                className={
                                                    'h-3 w-3 rounded-full border border-solid' +
                                                    (index ===
                                                        selectedAnswer[
                                                            questionIndex
                                                        ] && ' bg-black ')
                                                }
                                            ></View>
                                            <View className="ml-[5vw]">
                                                <Text className="font-bold text-xl">
                                                    {answer}
                                                </Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                </View>
                            )
                        })}
                </View>
            </View>
            <View className="flex flex-row justify-between items-center mx-[10vw]">
                <Pressable
                    onPress={() => {
                        if (questionIndex > 0) {
                            setQuestionIndex(questionIndex - 1)
                        }
                    }}
                >
                    {questionIndex !== 0 && (
                        <AntDesign name="leftcircleo" size={24} color="black" />
                    )}
                </Pressable>
                {questionIndex === 12 && (
                    <Pressable
                        className="p-2 border rounded"
                        onPress={() => send()}
                    >
                        <Text>Submit</Text>
                    </Pressable>
                )}
                <Pressable
                    onPress={() => {
                        if (questionIndex < 12) {
                            setQuestionIndex(questionIndex + 1)
                        }
                    }}
                >
                    {questionIndex !== 12 && (
                        <AntDesign
                            name="rightcircleo"
                            size={24}
                            color="black"
                        />
                    )}
                </Pressable>
            </View>
        </View>
    )
}
