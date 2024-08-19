import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Pressable,
    ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useRouter, Link } from 'expo-router'
import LoginFormField from '@/components/login/LoginFormField'

const LoginScreen = () => {
    const router = useRouter()
    const [form, setForm] = React.useState({
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
                            title={'帳號'}
                            value={form.account}
                            placeholder="please insert account"
                            keyBoardType="email-address"
                            onChangeText={(e) => {
                                setForm({ ...form, account: e })
                            }}
                        />
                        <LoginFormField
                            title={'密碼'}
                            value={form.password}
                            placeholder="please insert password"
                            isPassword
                            onChangeText={(e) => {
                                setForm({ ...form, password: e })
                            }}
                        />
                        <Pressable
                            className="bg-blue-400 h-10 w-full mt-5 mx-auto rounded-lg flex flex-row justify-center items-center"
                            onPress={() => {
                                router.push('/(tabs)')
                            }}
                        >
                            <Text className="text-white">登入</Text>
                        </Pressable>
                        <View className="flex flex-row justify-center mt-2">
                            <Text className="text-black">沒有帳號？</Text>
                            <Text className="text-blue-500 ml-1">註冊</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen
