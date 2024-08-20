import { View, Text, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useRouter } from 'expo-router'
import LoginFormField from '@/components/login/LoginFormField'

const RegisterScreen = () => {
    const router = useRouter()
    const [form, setForm] = React.useState({
        userName: '',
        account: '',
        password: '',
    })
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
                        <LoginFormField
                            title={'姓名'}
                            value={form.userName}
                            placeholder="在此輸入姓名"
                            onChangeText={(e) => {
                                setForm({ ...form, userName: e })
                            }}
                        />
                        <LoginFormField
                            title={'帳號'}
                            value={form.account}
                            placeholder="在此輸入信箱"
                            keyBoardType="email-address"
                            onChangeText={(e) => {
                                setForm({ ...form, account: e })
                            }}
                        />
                        <LoginFormField
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
                                router.push('/')
                            }}
                        >
                            <Text className="text-white">註冊</Text>
                        </Pressable>
                        <View className="flex flex-row justify-center mt-2">
                            <Text className="text-black">已有帳號？</Text>
                            <Text
                                className="text-blue-500 ml-1"
                                onPress={() => {
                                    router.push('/')
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
