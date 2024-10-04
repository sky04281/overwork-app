import {
    Alert,
    FlatList,
    Pressable,
    SafeAreaView,
    Text,
    View,
} from 'react-native'
import { useEffect, useState } from 'react'
import Header from '@/components/tabs/header'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import BodyInfoListItem from '@/components/tabs/bodyInfoListItem'
import useAuth from '@/hooks/useAuth'
import BODYINFO from '@/types/bodyInfo'
import BodyInfoForm from '@/components/BodyInfo/BodyInfoForm'
import { addBodyInfo } from '@/firebase/dbService'

const BodyInfoScreen = () => {
    const { user, userData, setLoading } = useAuth()
    const [formToggle, setFormToggle] = useState(false)
    const [form, setForm] = useState<BODYINFO>({
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
    const [bodyInfoList, setBodyInfoList] = useState<BODYINFO[]>([])
    useEffect(() => {
        if (userData) {
            const bodyInfo = userData.bodyInfo
            setBodyInfoList([...bodyInfo])
            setForm({
                ...form,
                height: userData.basicInfo.height,
                weight: userData.basicInfo.weight,
            })
        }
    }, [userData])
    const onFormSubmit = () => {
        Alert.alert(
            '送出',
            '確定要送出嗎?',
            [
                {
                    text: '取消',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: '確定',
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
    return (
        <SafeAreaView className="h-full">
            <Header title="生理資訊" />
            <View className="w-full h-full justify-center">
                <View className="flex-row justify-between items-center mt-[5vh] mx-[5vw]">
                    <Text className="text-xl font-medium">
                        個人生理資訊紀錄
                    </Text>
                    {formToggle ? (
                        <View className="flex-row gap-2">
                            <Pressable
                                className="p-2 border rounded"
                                onPress={() => setFormToggle(false)}
                            >
                                <Text>返回</Text>
                            </Pressable>
                            <Pressable
                                className="p-2 border rounded"
                                onPress={() => onFormSubmit()}
                            >
                                <Text>送出</Text>
                            </Pressable>
                        </View>
                    ) : (
                        <Pressable
                            className="p-2 border rounded"
                            onPress={() => setFormToggle(true)}
                        >
                            <Text>新增生理資訊</Text>
                        </Pressable>
                        // <FontAwesome
                        //     name="plus"
                        //     size={28}
                        //     color="black"
                        //     onPress={() => setFormToggle(!formToggle)}
                        // />
                    )}
                </View>
                <View className="flex-1 h-[80vh]  items-center justify-center">
                    {formToggle ? (
                        <BodyInfoForm form={form} setForm={setForm} />
                    ) : (
                        <FlatList
                            contentContainerStyle={{
                                flex: 1,
                                marginTop: 10,
                            }}
                            data={bodyInfoList}
                            renderItem={({ item }) => (
                                <BodyInfoListItem
                                    title={item.createDate}
                                    bodyInfo={item}
                                />
                            )}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BodyInfoScreen
