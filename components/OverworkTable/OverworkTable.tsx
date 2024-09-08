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
            question: '問題問題問題問題問題問題問題問題問題問題問題1',
            answer: [
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                'B: bbb',
                'C: ccc',
                'D: ddd',
            ],
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
    ]
    const data = questions.filter(
        (element) => element.key === questionIndex + 1
    )[0]

    return (
        <View className="h-[45vh] w-[95vw] mt-[5vh]">
            <View className="flex mx-5 my-1 h-15">
                <Text className="font-bold text-lg">
                    {data.key + '. ' + data.question}
                </Text>
            </View>
            <View className="m-5">
                {data.answer.map((answer, index) => {
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
                                                selectedAnswer[questionIndex] &&
                                                ' bg-black ')
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
            <View className="flex flex-row justify-between items-center mx-[5vw]">
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
                        <Text>送出</Text>
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
