import { View, Text, Pressable, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { router } from 'expo-router'
import FormField from '@/components/FormField'
import { logIn } from '@/firebase/authService'
import { FirebaseError } from 'firebase/app'

const LoginScreen = () => {
    const [form, setForm] = React.useState({
        account: '',
        password: '',
    })
    const handleFormSubmit = () => {
        logIn(form.account, form.password)
            .then(() => {
                router.push('/(tabs)')
            })
            .catch((e: FirebaseError) => {
                Alert.alert('登入失敗', e.message)
                console.log(e)
            })
    }
    return (
        <SafeAreaView className="h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full h-full flex items-center">
                    <View className="h-[25%] justify-center items-center">
                        <Text className="p-5 text-5xl font-bold">
                            過負荷APP
                        </Text>
                    </View>
                    <View className="w-full px-4">
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
                            <Text className="text-white">登入</Text>
                        </Pressable>
                        <View className="flex flex-row justify-center mt-2">
                            <Text className="text-black">沒有帳號？</Text>
                            <Text
                                className="text-blue-500 ml-1"
                                onPress={() => {
                                    router.push('/register')
                                }}
                            >
                                註冊
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen
