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
                Alert.alert('Login Failed', e.message)
                console.log(e)
            })
    }
    return (
        <SafeAreaView className="h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full h-full flex items-center">
                    <View className="h-[25%] justify-center items-center">
                        <Text className="p-5 text-5xl font-bold text-center">
                            Log In
                        </Text>
                    </View>
                    <View className="w-full px-4">
                        <FormField
                            title={'Account'}
                            value={form.account}
                            placeholder="Enter email here"
                            keyBoardType="email-address"
                            onChangeText={(e) => {
                                setForm({ ...form, account: e })
                            }}
                        />
                        <FormField
                            title={'Password'}
                            value={form.password}
                            placeholder="Enter password here"
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
                            <Text className="text-white">Log In</Text>
                        </Pressable>
                        <View className="flex flex-row justify-center mt-3">
                            <Text className="text-black">
                                Don't have an account?
                            </Text>
                            <Text
                                className="text-blue-500 ml-1"
                                onPress={() => {
                                    router.push('/register')
                                }}
                            >
                                Register
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen
