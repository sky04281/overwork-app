import { View, Text, Pressable, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useRouter } from 'expo-router'
import FormField from '@/components/FormField'
import { logOut, signUp } from '@/firebase/authService'
import { FirebaseError } from 'firebase/app'
import BASICINFO from '@/types/basicInfo'
import { createUserInDB } from '@/firebase/dbService'
import useAuth from '@/hooks/useAuth'

const RegisterScreen = () => {
    const router = useRouter()
    const [form, setForm] = React.useState({
        userName: '',
        account: '',
        password: '',
    })
    const handleFormSubmit = () => {
        Alert.alert('即將註冊', '請確認資料無誤！', [
            {
                text: '確定',
                onPress: () => {
                    if (
                        form.account === '' ||
                        form.password === '' ||
                        form.userName === ''
                    ) {
                        Alert.alert('註冊失敗', '任何欄位都不得為空')
                        return
                    }
                    signUp(form.account, form.password, form.userName)
                        .then((userCredential) => {
                            const basicInfo: BASICINFO = {
                                name: form.userName,
                                sex: '',
                                birthday: '',
                                height: 0,
                                weight: 0,
                                workingTime: 0,
                                manager: '',
                                familyMember: '',
                            }

                            return createUserInDB(
                                userCredential.user.uid,
                                basicInfo
                            )
                        })
                        .then(() => {
                            Alert.alert('註冊成功', '登入以使用過負荷APP')
                            return logOut()
                        })
                        .then(() => router.push('/login'))
                        .catch((e: FirebaseError) => {
                            Alert.alert('註冊失敗', e.message)
                            console.log(e)
                        })
                },
            },
            {
                text: '取消',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
        ])
    }
    return (
        <SafeAreaView className="h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full h-full flex items-center">
                    <View className="h-[25%] justify-center items-center">
                        <Text className="p-5 text-5xl font-bold dark:text-white">
                            過負荷APP
                        </Text>
                    </View>
                    <View className="w-full px-4">
                        <FormField
                            title={'姓名'}
                            value={form.userName}
                            placeholder="在此輸入姓名"
                            onChangeText={(e) => {
                                setForm({ ...form, userName: e })
                            }}
                        />
                        <FormField
                            title={'帳號'}
                            value={form.account}
                            placeholder="在此輸入信箱"
                            keyBoardType="email-address"
                            onChangeText={(e) => {
                                setForm({ ...form, account: e })
                            }}
                        />
                        <FormField
                            title={'密碼'}
                            value={form.password}
                            placeholder="在此輸入密碼"
                            isPassword
                            onChangeText={(e) => {
                                setForm({ ...form, password: e })
                            }}
                        />
                        <Pressable
                            className="bg-blue-400 h-10 w-full mt-5 mx-auto rounded-lg flex flex-row justify-center items-center"
                            onPress={() => {
                                handleFormSubmit()
                            }}
                        >
                            <Text className="text-white">註冊</Text>
                        </Pressable>
                        <View className="flex flex-row justify-center mt-2">
                            <Text className="text-black">已有帳號？</Text>
                            <Text
                                className="text-blue-500 ml-1"
                                onPress={() => {
                                    router.push('/login')
                                }}
                            >
                                登入
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen
