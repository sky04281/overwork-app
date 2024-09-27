import {
    Alert,
    FlatList,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import BasicInfoField from '@/components/tabs/basicInfoField'
import FormField from '@/components/FormField'
import BirthDataPicker from '@/components/tabs/birthDataPicker'
import Header from '@/components/tabs/header'
import { logOut } from '@/firebase/authService'
import { router } from 'expo-router'
import useAuth from '@/hooks/useAuth'
import BASICINFO from '@/types/basicInfo'
import { updateBasicInfo } from '@/firebase/dbService'

const BasicInfoScreen = () => {
    const { user, userData } = useAuth()
    const [form, setForm] = useState<BASICINFO>({
        name: 'null',
        sex: 'null',
        birthday: 'null',
        height: 0,
        weight: 0,
        workingTime: 0,
    })
    const [isEditable, setIsEditable] = React.useState(false)
    useEffect(() => {
        if (userData) {
            const basicInfo = userData.basicInfo
            setForm({
                ...basicInfo,
            })
        }
    }, [userData])
    // const handleDateChange = (date: Date) => {
    //     setForm({
    //         ...form,
    //         birthday: date.toLocaleDateString(),
    //     })
    // }
    const handlePress = () => {
        if (isEditable) {
            console.log('saving', form)
            updateBasicInfo(user!.uid, form).catch((error) => {
                console.error('Error updating basic info:', error.message)
            })
        } else {
            console.log('editing')
        }
        setIsEditable(!isEditable)
    }

    return (
        <SafeAreaView className="h-full flex">
            <Header title="基本資料" />
            <View className="flex-row justify-end items-center m-5 mt-[5vh]">
                <Pressable
                    className="bg-blue-300 h-[5vh] w-[20vw] rounded-lg flex justify-center items-center"
                    onPress={() => handlePress()}
                >
                    <Text className="text-lg">
                        {isEditable ? '儲存' : '編輯'}
                    </Text>
                </Pressable>
            </View>
            <ScrollView>
                <View className="flex-1 justify-center">
                    <BasicInfoField
                        title="姓名"
                        value={form.name}
                        editable={isEditable}
                        onChangeText={(e) => setForm({ ...form, name: e })}
                    />
                    <BasicInfoField
                        title="生理性別"
                        value={form.sex}
                        editable={isEditable}
                        onChangeText={(e) => setForm({ ...form, sex: e })}
                    />
                    <BasicInfoField
                        title="生日"
                        value={form.birthday}
                        editable={isEditable}
                        onChangeText={(e) => setForm({ ...form, birthday: e })}
                    />
                    {/* <BirthDataPicker
                        value={form.birthDate}
                        editable={isEditable}
                        handleDateChange={handleDateChange}
                    /> */}
                    <BasicInfoField
                        title="身高(cm)"
                        value={form.height.toString()}
                        type="number-pad"
                        editable={isEditable}
                        onChangeText={(e) =>
                            setForm({
                                ...form,
                                height: e === '' ? 0 : parseInt(e),
                            })
                        }
                    />
                    <BasicInfoField
                        title="體重(kg)"
                        value={form.weight.toString()}
                        type="number-pad"
                        editable={isEditable}
                        onChangeText={(e) =>
                            setForm({
                                ...form,
                                weight: e === '' ? 0 : parseInt(e),
                            })
                        }
                    />
                    <BasicInfoField
                        title="工作時長(hr)"
                        value={form.workingTime.toString()}
                        type="number-pad"
                        editable={isEditable}
                        onChangeText={(e) =>
                            setForm({
                                ...form,
                                workingTime: e === '' ? 0 : parseInt(e),
                            })
                        }
                    />
                </View>
            </ScrollView>
            <View className="flex-row justify-center items-center my-[5vh]">
                <Pressable
                    className="bg-red-500 h-[5vh] w-[35vw] rounded-lg flex justify-center items-center"
                    onPress={() => {
                        Alert.alert('登出', '確定要登出嗎？', [
                            {
                                text: '取消',
                                onPress: () => {},
                                style: 'cancel',
                            },
                            {
                                text: '確定',
                                onPress: () => {
                                    logOut().then(() => {
                                        router.replace('/login')
                                    })
                                },
                            },
                        ])
                    }}
                >
                    <Text className="text-white text-lg">登出</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default BasicInfoScreen
