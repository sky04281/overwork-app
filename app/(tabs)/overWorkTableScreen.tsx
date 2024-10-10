import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import OverworkTable from '@/components/OverworkTable/OverworkTable'
import OverworkRecordListItem from '@/components/OverworkTable/OverworkRecordListItem'
import Header from '@/components/tabs/header'
import OVERWORKSCORE from '@/types/overworkScore'
import useAuth from '@/hooks/useAuth'
import { addOverworkScore } from '@/firebase/dbService'
import { sendEmailToCarer, sendEmailToManager } from '@/services/emailService'

const OverWorkTableScreen = () => {
    const [questionToggle, setQuestionToggle] = useState(true)
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

    const recentRecords = overworkScore?.filter((record) => record.createDate)

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
                            score.working
                        )
                    }
                    if (score.working > 60) {
                        sendEmailToManager(
                            userData!.basicInfo.manager,
                            userData!.basicInfo.name,
                            score.personal,
                            score.working
                        )
                    }
                })
                .finally(() => {
                    setQuestionToggle(!questionToggle)
                    setSelectedAnswer([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                    setLoading(true)
                })
    }

    return (
        overworkScore && (
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
                                        onPress={() =>
                                            setQuestionToggle(!questionToggle)
                                        }
                                    >
                                        <Text>新增量表</Text>
                                    </Pressable>
                                </View>
                                <Text className="text-lg font-medium">
                                    近期紀錄（一個月內）
                                </Text>
                                <View className="h-[23vh] mb-[2vh] w-full">
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
                        ) : (
                            <View>
                                <View className="flex flex-row justify-end items-center mt-[2.5vh] mb-[1vh] mx-[2vw] space-x-3">
                                    <Pressable className="p-2 border rounded">
                                        <Text>走勢圖</Text>
                                    </Pressable>
                                    <Pressable
                                        className="p-2 border rounded"
                                        onPress={() =>
                                            setQuestionToggle(!questionToggle)
                                        }
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
    )
}

export default OverWorkTableScreen
