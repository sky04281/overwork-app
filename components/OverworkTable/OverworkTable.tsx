import { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'

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
    const questions = [
        {
            key: 1,
            question: '問題1',
            answer: ['A: aaa', 'B: bbb', 'C: ccc', 'D: ddd'],
        },
        {
            key: 2,
            question: '問題2',
            answer: ['A: aaa', 'B: bbb', 'C: ccc', 'D: ddd'],
        },
        {
            key: 3,
            question: '問題3',
            answer: ['A: aaa', 'B: bbb', 'C: ccc', 'D: ddd'],
        },
        {
            key: 4,
            question: '問題4',
            answer: ['A: aaa', 'B: bbb', 'C: ccc', 'D: ddd'],
        },
        {
            key: 5,
            question: '問題5',
            answer: ['A: aaa', 'B: bbb', 'C: ccc', 'D: ddd'],
        },
        {
            key: 6,
            question: '問題6',
            answer: ['A: aaa', 'B: bbb', 'C: ccc', 'D: ddd'],
        },
        {
            key: 7,
            question: '問題7',
            answer: ['A: aaa', 'B: bbb', 'C: ccc', 'D: ddd'],
        },
        {
            key: 8,
            question: '問題8',
            answer: ['A: aaa', 'B: bbb', 'C: ccc', 'D: ddd'],
        },
        {
            key: 9,
            question: '問題9',
            answer: ['A: aaa', 'B: bbb', 'C: ccc', 'D: ddd'],
        },
        {
            key: 10,
            question: '問題10',
            answer: ['A: aaa', 'B: bbb', 'C: ccc', 'D: ddd'],
        },
        {
            key: 11,
            question: '問題11',
            answer: ['A: aaa', 'B: bbb', 'C: ccc', 'D: ddd'],
        },
        {
            key: 12,
            question: '問題12',
            answer: ['A: aaa', 'B: bbb', 'C: ccc', 'D: ddd'],
        },
        {
            key: 13,
            question: '問題13',
            answer: ['A: aaa', 'B: bbb', 'C: ccc', 'D: ddd'],
        },
        {
            key: 14,
            question: '問題14',
            answer: ['A: aaa', 'B: bbb', 'C: ccc', 'D: ddd'],
        },
        {
            key: 15,
            question: '問題15',
            answer: ['A: aaa', 'B: bbb', 'C: ccc', 'D: ddd'],
        },
        {
            key: 16,
            question: '問題16',
            answer: ['A: aaa', 'B: bbb', 'C: ccc', 'D: ddd'],
        },
    ]
    const data = questions.filter((element) => element.key === questionIndex)[0]

    return (
        <View className="h-[45vh] w-[95vw]">
            <View className="flex m-5 h-[10vh]">
                <View className="m-5">
                    <Text className="font-bold text-lg">
                        {data && data.key + '. ' + data.question}
                    </Text>
                </View>
            </View>
            <View className="h-[30vh]">
                {data &&
                    data.answer.map((answer, index) => {
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
                                    <View className="flex flex-row items-center">
                                        <View
                                            className={
                                                'h-5 w-5 rounded-full border' +
                                                (index ===
                                                    selectedAnswer[
                                                        questionIndex
                                                    ] && ' bg-cyan-300 ')
                                            }
                                        ></View>
                                        <Text>{answer}</Text>
                                    </View>
                                </Pressable>
                            </View>
                        )
                    })}
            </View>
            <View className="flex flex-row justify-between items-center h-[5vh]">
                <Pressable onPress={() => setQuestionIndex(questionIndex - 1)}>
                    <AntDesign name="leftcircleo" size={24} color="black" />
                </Pressable>
                {questionIndex === 13 && (
                    <Pressable onPress={() => send()}>
                        <Text>送出</Text>
                    </Pressable>
                )}
                <Pressable onPress={() => setQuestionIndex(questionIndex + 1)}>
                    <AntDesign name="rightcircleo" size={24} color="black" />
                </Pressable>
            </View>
        </View>
    )
}
