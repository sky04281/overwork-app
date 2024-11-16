import { View, Text, Pressable, ScrollView } from 'react-native'
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

    if (!overworkTable) return null

    return (
        <View className="h-full bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Progress bar */}
            <View className="px-6 pt-6">
                <View className="h-2 w-full bg-gray-100 rounded-full">
                    <View
                        className="h-2 bg-blue-500 rounded-full"
                        style={{
                            width: `${
                                ((questionIndex + 1) /
                                    overworkTable.questions.length) *
                                100
                            }%`,
                        }}
                    />
                </View>
            </View>

            {/* Question - 固定高度 */}
            <View className="px-6 py-4 min-h-[100px]">
                <Text className="text-lg font-medium text-gray-800">
                    {question}
                </Text>
                <Text className="text-sm text-gray-500 mt-2">
                    Question {questionIndex + 1} of{' '}
                    {overworkTable.questions.length}
                </Text>
            </View>

            {/* Options - 使用 ScrollView */}
            <ScrollView
                className="flex-1 px-6"
                showsVerticalScrollIndicator={false}
            >
                {overworkTable.answers.map((answer, index) => (
                    <Pressable
                        key={index}
                        onPress={() => {
                            const newAnswer = [...selectedAnswer]
                            newAnswer[questionIndex] = index
                            setSelectedAnswer(newAnswer)
                        }}
                        className={`mb-3 p-4 rounded-xl border ${
                            index === selectedAnswer[questionIndex]
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200'
                        }`}
                    >
                        <View className="flex-row items-center">
                            <View
                                className={`h-5 w-5 rounded-full border-2 mr-3 ${
                                    index === selectedAnswer[questionIndex]
                                        ? 'border-blue-500 bg-blue-500'
                                        : 'border-gray-300'
                                }`}
                            >
                                {index === selectedAnswer[questionIndex] && (
                                    <View className="h-2 w-2 bg-white rounded-full m-auto" />
                                )}
                            </View>
                            <Text
                                className={`flex-1 text-base ${
                                    index === selectedAnswer[questionIndex]
                                        ? 'text-blue-700 font-medium'
                                        : 'text-gray-700'
                                }`}
                                numberOfLines={3}
                            >
                                {answer}
                            </Text>
                        </View>
                    </Pressable>
                ))}
                <View className="h-4" />
            </ScrollView>

            {/* Navigation - 保持在底部 */}
            <View className="px-6 py-4 border-t border-gray-100 flex-row justify-between items-center">
                <Pressable
                    onPress={() => {
                        if (questionIndex > 0) {
                            setQuestionIndex(questionIndex - 1)
                        }
                    }}
                    className={`flex-row items-center ${
                        questionIndex === 0 ? 'opacity-50' : ''
                    }`}
                    disabled={questionIndex === 0}
                >
                    <AntDesign name="leftcircle" size={24} color="#3B82F6" />
                    <Text className="ml-2 text-blue-500 font-medium">
                        Previous
                    </Text>
                </Pressable>

                {questionIndex === overworkTable.questions.length - 1 ? (
                    <Pressable
                        className="px-3 py-1 bg-green-500 rounded-lg active:bg-green-600"
                        onPress={send}
                    >
                        <Text className="text-white font-bold">Submit</Text>
                    </Pressable>
                ) : (
                    <Pressable
                        onPress={() => {
                            if (
                                questionIndex <
                                overworkTable.questions.length - 1
                            ) {
                                setQuestionIndex(questionIndex + 1)
                            }
                        }}
                        className="flex-row items-center"
                    >
                        <Text className="mr-2 text-blue-500 font-medium">
                            Next
                        </Text>
                        <AntDesign
                            name="rightcircle"
                            size={24}
                            color="#3B82F6"
                        />
                    </Pressable>
                )}
            </View>
        </View>
    )
}
