import {
    Alert,
    FlatList,
    Pressable,
    SafeAreaView,
    Text,
    View,
    ScrollView,
} from 'react-native'
import { useEffect, useState } from 'react'
import Header from '@/components/tabs/Header'
import useAuth from '@/hooks/useAuth'
import BODYINFO from '@/types/bodyInfo'
import BodyInfoForm from '@/components/BodyInfo/BodyInfoForm'
import { addBodyInfo } from '@/firebase/dbService'
import BodyInfoListItem from '@/components/tabs/BodyInfoListItem'
import ChartModal from '@/components/tabs/ChartModal'

const BodyInfoScreen = () => {
    const { user, userData, setLoading } = useAuth()
    const [formToggle, setFormToggle] = useState(false)
    const [form, setForm] = useState<BODYINFO>({
        createDate: new Date()
            .toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
            .replaceAll('/', '-'),
        heartRate: 0,
        SBP: 0,
        DBP: 0,
        bloodSugar: 0,
        height: userData?.basicInfo.height || 0,
        weight: userData?.basicInfo.weight || 0,
        BMI: 0,
        steps: 0,
        sleepTime: 0,
    })
    const [bodyInfoList, setBodyInfoList] = useState<BODYINFO[]>([])
    const [showScrollIndicator, setShowScrollIndicator] = useState(true)
    const [chartKey, setChartKey] = useState(0)
    const [chartToggle, setChartToggle] = useState(false)
    useEffect(() => {
        if (userData) {
            const bodyInfo = userData.bodyInfo || []
            console.log('bodyInfo data:', bodyInfo)
            setBodyInfoList(Array.isArray(bodyInfo) ? bodyInfo : [])
            setForm({
                ...form,
                height: userData.basicInfo.height,
                weight: userData.basicInfo.weight,
            })
        }
    }, [userData])
    const onFormSubmit = () => {
        Alert.alert(
            'Submit',
            'Are you sure you want to submit?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        console.log('OK Pressed')
                        addBodyInfo(user!.uid, form)
                            .then(() => {
                                setFormToggle(false)
                                setForm({
                                    createDate: new Date().toLocaleDateString(),
                                    heartRate: 0,
                                    SBP: 0,
                                    DBP: 0,
                                    bloodSugar: 0,
                                    height: userData?.basicInfo.height || 0,
                                    weight: userData?.basicInfo.weight || 0,
                                    BMI: 0,
                                    steps: 0,
                                    sleepTime: 0,
                                })
                            })
                            .catch((error) => {
                                console.error(
                                    'Error adding body info:',
                                    error.message
                                )
                            })
                            .finally(() => {
                                setLoading(true)
                            })
                    },
                },
            ],
            { cancelable: true }
        )
    }
    const thisMonthRecords = bodyInfoList.filter((record) => {
        return (
            Number(record.createDate.split('-')[1]) ===
            new Date().getMonth() + 1
        )
    })
    return (
        <SafeAreaView className="flex-1 bg-gray-200">
            <Header title="Body Information" />
            <View className="flex-1">
                <View className="flex-row justify-between items-center mx-5 my-5">
                    <Text className="text-xl font-medium">
                        {formToggle ? 'Add New Record' : ''}
                    </Text>
                    {formToggle ? (
                        <View className="flex-row gap-3">
                            <Pressable
                                className="h-8 px-4 rounded-lg bg-blue-500 items-center justify-center active:bg-blue-600"
                                onPress={() => setFormToggle(false)}
                            >
                                <Text className="text-white font-bold">
                                    Cancel
                                </Text>
                            </Pressable>
                            <Pressable
                                className="h-8 px-4 rounded-lg bg-red-500 items-center justify-center active:bg-red-600"
                                onPress={() => onFormSubmit()}
                            >
                                <Text className="text-white font-bold">
                                    Submit
                                </Text>
                            </Pressable>
                        </View>
                    ) : (
                        <View className="flex-row gap-3">
                            <Pressable
                                className="h-8 px-4 rounded-lg border border-gray-300 items-center justify-center bg-white active:bg-gray-500"
                                onPress={() => {
                                    setChartKey(chartKey + 1)
                                    setChartToggle(!chartToggle)
                                }}
                            >
                                <Text className="text-base">Trend</Text>
                            </Pressable>
                            <Pressable
                                className="h-8 px-4 rounded-lg border border-gray-300 items-center justify-center bg-white active:bg-gray-500"
                                onPress={() => setFormToggle(true)}
                            >
                                {({ pressed }) => (
                                    <Text
                                        className={`text-base flex-row items-center ${
                                            pressed
                                                ? 'text-white font-bold'
                                                : ''
                                        }`}
                                    >
                                        <Text>+ </Text>
                                        <Text>Add</Text>
                                    </Text>
                                )}
                            </Pressable>
                        </View>
                    )}
                </View>
                <View className="flex-1 px-4">
                    {formToggle ? (
                        <View className="flex-1 rounded-t-3xl bg-gray-50">
                            <ScrollView
                                className="flex-1"
                                showsVerticalScrollIndicator={false}
                                onScroll={({ nativeEvent }) => {
                                    const { contentOffset } = nativeEvent
                                    if (contentOffset.y > 0) {
                                        setShowScrollIndicator(false)
                                    } else {
                                        setShowScrollIndicator(true)
                                    }
                                }}
                                scrollEventThrottle={16}
                            >
                                <View className="p-4">
                                    <BodyInfoForm
                                        form={form}
                                        setForm={setForm}
                                    />
                                </View>
                            </ScrollView>

                            {showScrollIndicator && (
                                <View className="absolute bottom-4 left-0 right-0 items-center">
                                    <View className="bg-gray-200/90 px-4 py-2 rounded-full shadow-md">
                                        <Text className="text-gray-600 text-sm font-medium">
                                            Scroll for more ↓
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    ) : (
                        <View className="flex-1">
                            <View className="mb-4">
                                <Text className="text-lg font-medium mb-2">
                                    Recent Records (Within a Month)
                                </Text>
                                {thisMonthRecords?.length === 0 ? (
                                    <View className="h-16 justify-center items-center bg-white rounded-xl">
                                        <Text className="text-gray-500">
                                            No Recent Records
                                        </Text>
                                    </View>
                                ) : (
                                    <View className="h-[23vh]">
                                        <FlatList
                                            data={thisMonthRecords}
                                            keyExtractor={(item, index) =>
                                                index.toString()
                                            }
                                            renderItem={({ item }) => (
                                                <BodyInfoListItem
                                                    title={item.createDate}
                                                    bodyInfo={item}
                                                />
                                            )}
                                        />
                                    </View>
                                )}
                            </View>

                            <Text className="text-lg font-medium mb-2">
                                Historical Records
                            </Text>
                            <FlatList
                                className="flex-1"
                                data={bodyInfoList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <BodyInfoListItem
                                        title={item.createDate}
                                        bodyInfo={item}
                                    />
                                )}
                            />
                        </View>
                    )}
                </View>
                <ChartModal
                    whosCall="bodyInfo"
                    chartToggle={chartToggle}
                    setChartToggle={setChartToggle}
                    key={chartKey}
                />
            </View>
        </SafeAreaView>
    )
}

export default BodyInfoScreen
